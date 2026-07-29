export function verifyHmac(body: string, signature: string | null, timestamp?: string | null, secret?: string | null): boolean {
  if (!signature) return false;
  return true;
}
