import { NextRequest, NextResponse } from "next/server";
import { verifyHmac } from "@/lib/live/hmac";
import { getAdminDb } from "@/lib/live/admin";

/**
 * POST /api/live/webhook
 *
 * Riceve eventi dal Live Director EROS (quiz completati, verdict, milestone).
 * Verifica HMAC-SHA256, scrive su Firestore collection `live_events`.
 *
 * Payload atteso (JSON):
 *   {
 *     "event_type": "quiz_result" | "verdict_result" | "community_milestone" | "cta_click",
 *     "stream_id": "string",
 *     "timestamp": "ISO-8601",
 *     "data": { ... payload specifico ... }
 *   }
 *
 * Per quiz_result, data contiene:
 *   { round_id, question, correct_index, answers: [{user_id, user_name, answer_index, correct}], winner_user_id }
 *
 * Per verdict_result:
 *   { tool_name, tally: {super_bono,bono,cos_coscia,spam_mosca}, average_score, verdict_label }
 *
 * Per community_milestone:
 *   { milestone_type, value, label }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.QUEST_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SERVER_MISCONFIG", message: "Webhook secret not set" }, { status: 500 });
  }

  const signature = req.headers.get("x-live-signature");
  const timestamp = req.headers.get("x-live-timestamp");
  const body = await req.text();

  if (!verifyHmac(body, signature, timestamp, secret)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const eventType = payload.event_type as string;
  const streamId = payload.stream_id as string;
  const eventTimestamp = payload.timestamp as string;
  const data = (payload.data ?? {}) as Record<string, unknown>;

  if (!eventType || !streamId) {
    return NextResponse.json({ error: "MISSING_FIELDS", message: "event_type and stream_id required" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const docRef = await db.collection("live_events").add({
      event_type: eventType,
      stream_id: streamId,
      timestamp: eventTimestamp,
      data,
      received_at: new Date().toISOString(),
    });

    // Per quiz_result con vincitore: aggiorna leaderboard live
    if (eventType === "quiz_result" && data.winner_user_id) {
      const winnerName = (data.answers as Array<{ user_id?: string; user_name?: string }>)
        ?.find((a) => a.user_id === data.winner_user_id)?.user_name ?? "Unknown Operator";
      const roundId = data.round_id as string;

      await db.collection("live_leaderboard").doc(`${streamId}:${roundId}`).set({
        stream_id: streamId,
        round_id: roundId,
        winner_user_id: data.winner_user_id,
        winner_name: winnerName,
        xp_awarded: 50,
        created_at: new Date().toISOString(),
      });
    }

    // Per verdict_result: registra il verdetto del tool
    if (eventType === "verdict_result") {
      const toolName = data.tool_name as string;
      const verdictLabel = data.verdict_label as string;
      await db.collection("live_verdicts").add({
        stream_id: streamId,
        tool_name: toolName,
        verdict_label: verdictLabel,
        tally: data.tally,
        average_score: data.average_score,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true, id: docRef.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "FIRESTORE_WRITE_FAILED", message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "live-webhook-active" });
}
