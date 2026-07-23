import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "NO_API_KEY", message: "GEMINI_API_KEY non configurata." },
        { status: 400 }
      );
    }

    const { topic, difficulty = 'media', trackId = 'python', language = 'it' } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `Genera una nuova sfida di programmazione per il percorso "${trackId}" sull'argomento "${topic}" con difficoltà "${difficulty}".
Lingua richiesta per testo e spiegazione: ${language === 'it' ? 'Italiano' : language === 'es' ? 'Spagnolo' : 'Inglese'}.

La sfida deve contenere:
- Un codice sorgente emblematico (snippet) con un bug, o un comportamento particolare.
- Una domanda chiara su quale sia l'output, il bug o la soluzione corretta.
- 4 opzioni di risposta distinte.
- L'indice di risposta corretta (0-3).
- Una spiegazione dettagliata e istruttiva.
- Un suggerimento graduale.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "Sei un generatore di sfide di programmazione educative. Genera output JSON rigoroso per DevQuest.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            domanda: { type: Type.STRING, description: "Testo della domanda" },
            codice: { type: Type.STRING, description: "Snippet di codice con sintassi evidenziabile" },
            risposte: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array di esattamente 4 opzioni di risposta"
            },
            rispostaCorretta: { type: Type.INTEGER, description: "Indice 0, 1, 2 o 3 della risposta corretta" },
            spiegazione: { type: Type.STRING, description: "Spiegazione didattica approfondita" },
            suggerimento: { type: Type.STRING, description: "Suggerimento o indizio per guidare lo studente" },
            argomento: { type: Type.STRING, description: "Nome dell'argomento specifico" }
          },
          required: ["domanda", "codice", "risposte", "rispostaCorretta", "spiegazione", "suggerimento", "argomento"]
        }
      }
    });

    if (!response.text) {
      throw new Error("Nessuna risposta generata da Gemini");
    }

    const questData = JSON.parse(response.text);

    // Format into Sfida type
    const newSfida = {
      id: `ai_gen_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      capitolo: 99,
      argomento: questData.argomento || topic,
      domanda: questData.domanda,
      codice: questData.codice,
      risposte: questData.risposte,
      indice_corretto: Number(questData.rispostaCorretta),
      spiegazione: questData.spiegazione,
      suggerimento: questData.suggerimento,
      difficolta: difficulty === 'facile' ? 'facile' : difficulty === 'difficile' ? 'difficile' : 'media',
      trackId: trackId,
      isCustom: true,
      author: 'AI Quest Engine'
    };

    return NextResponse.json({ quest: newSfida });
  } catch (error: unknown) {
    console.error("Error generating quest:", error);
    const msg = error instanceof Error ? error.message : "Errore generico";
    return NextResponse.json({ error: "GENERATION_FAILED", message: msg }, { status: 500 });
  }
}
