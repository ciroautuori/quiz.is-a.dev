// Rate limiter in-memory per le API routes.
// Nessuna dipendenza esterna: usa una Map con cleanup automatico.
// Su Soliso (single container) e' sufficiente; per multi-istanza usare Redis.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitEntry>();

// Cleanup periodico per evitare memory leak
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Verifica il rate limit per un dato identificatore.
 * @param identifier - IP o userId
 * @param maxRequests - numero massimo di richieste nella finestra
 * @param windowMs - durata della finestra in millisecondi
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    const entry: RateLimitEntry = { count: 1, resetAt: now + windowMs };
    buckets.set(identifier, entry);
    return { allowed: true, remaining: maxRequests - 1, resetAt: entry.resetAt };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: maxRequests - existing.count, resetAt: existing.resetAt };
}

/**
 * Estrae l'IP del client dai header di Next.js.
 * Gestisce proxy e load balancer.
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP.trim();
  return "unknown";
}

/**
 * Verifica che il client sia autenticato Firebase.
 * Controllo soft: verifica la presenza di un Authorization header Bearer.
 * Per validazione completa usare Firebase Admin SDK lato server.
 */
export function isAuthenticated(req: Request): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  return auth.startsWith("Bearer ");
}
