# syntax=docker/dockerfile:1
# ─────────────────────────────────────────────
# Stage 1: deps — installa le dipendenze
# ─────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

# Installa bun per la velocità
RUN npm install -g bun@1.3

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ─────────────────────────────────────────────
# Stage 2: builder — compila Next.js standalone
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variabili build-time (override a deploy)
ARG GEMINI_API_KEY=""
ARG GITHUB_CLIENT_ID=""
ARG GITHUB_CLIENT_SECRET=""
ARG NEXT_PUBLIC_APP_VERSION="1.0.0"

ENV GEMINI_API_KEY=$GEMINI_API_KEY \
    GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID \
    GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET \
    NEXT_PUBLIC_APP_VERSION=$NEXT_PUBLIC_APP_VERSION \
    NEXT_TELEMETRY_DISABLED=1

RUN npx --no-install next build

# ─────────────────────────────────────────────
# Stage 3: runner — immagine finale minimale
# ─────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Utente non-root per sicurezza
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copia solo l'output standalone + public + static
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health 2>/dev/null || wget -qO- http://localhost:3000 > /dev/null

CMD ["node", "server.js"]
