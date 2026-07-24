# DevQuest Security Rules & Guidelines

These security rules apply to all code generated, edited, or reviewed within the `quest.is-a-dev` project.

## 1. Firebase & Database Rules
- **Catch-all Default Deny**: Always maintain `match /{document=**} { allow read, write: if false; }`.
- **Validation Constraints**: Every `create` or `update` rule in Firestore must enforce strict data types, array size limits, string length limits, and numeric boundaries (e.g. scores between 0 and 100,000).
- **User Ownership**: User state, progress, and custom questions MUST verify `request.auth.uid == userId` or `authorId`.

## 2. API Routes & Endpoint Security
- **No Reflected HTML (XSS)**: Never interpolate unescaped query parameters, error strings, or external API responses directly into HTML response strings. Always sanitize HTML or use JSON responses.
- **Input Validation & Sanitization**:
  - Validate parameters against strict whitelist regex (e.g. `repoName` matching `^[a-zA-Z0-9_\-]+$`).
  - Cap array length for payload batching (e.g. max 50 items for syncing).
  - Truncate and sanitize AI prompt inputs (topic, messages) to prevent token abuse and prompt injection attacks.
- **Secrets Management**: Never log or expose API keys or access tokens (`GEMINI_API_KEY`, `GITHUB_CLIENT_SECRET`, user OAuth tokens).

## 3. Frontend & Code Execution
- **Dangerous Constructs**: Avoid using `eval()`, `new Function()`, `child_process.exec()`, or raw `innerHTML`. Use React JSX and standard sanitization tools.
- **Cross-Origin Security**: Validate origin domain on `window.postMessage` listeners and openers.
