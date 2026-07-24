import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');

  if (error || !code) {
    return new Response(
      `<html>
        <body style="font-family: sans-serif; background: #1e1e2e; color: #f38ba8; display: flex; align-items: center; justify-content: center; height: 100vh;">
          <div style="text-align: center;">
            <h2>GitHub Authentication Cancelled or Failed</h2>
            <p>${error || 'Missing authorization code.'}</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'GITHUB_AUTH_ERROR', error: '${error || 'Mancante'}' }, '*');
                setTimeout(() => window.close(), 2000);
              }
            </script>
          </div>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const origin = req.nextUrl.origin || process.env.APP_URL || 'http://localhost:3000';
  const redirectUri = `${origin}/api/auth/github/callback`;

  try {
    // Exchange code for token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to retrieve access token from GitHub');
    }

    const accessToken = tokenData.access_token;

    // Fetch GitHub User profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'DevQuest-App',
      },
    });

    const userData = await userRes.json();

    const payload = JSON.stringify({
      token: accessToken,
      username: userData.login,
      name: userData.name || userData.login,
      avatarUrl: userData.avatar_url,
      profileUrl: userData.html_url,
    });

    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>GitHub Auth Success</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              background-color: #11111b;
              color: #cdd6f4;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .card {
              background: #1e1e2e;
              border: 1px solid #313244;
              padding: 24px 32px;
              border-radius: 16px;
              text-align: center;
              box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            }
            .avatar {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              border: 2px solid #cba6f7;
              margin-bottom: 12px;
            }
            h3 { margin: 0 0 8px 0; color: #a6e3a1; }
            p { margin: 0; color: #a6adc8; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${userData.avatar_url}" class="avatar" alt="Avatar" />
            <h3>GitHub Authentication Successful!</h3>
            <p>Connected as @${userData.login}</p>
            <p style="margin-top: 12px; font-size: 12px; color: #cba6f7;">Closing window...</p>
          </div>
          <script>
            try {
              if (window.opener) {
                window.opener.postMessage({
                  type: 'GITHUB_AUTH_SUCCESS',
                  payload: ${payload}
                }, '*');
                setTimeout(function() {
                  window.close();
                }, 1000);
              } else {
                window.location.href = '/';
              }
            } catch (err) {
              console.error(err);
            }
          </script>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (err: any) {
    return new Response(
      `<html>
        <body style="font-family: sans-serif; background: #1e1e2e; color: #f38ba8; padding: 30px;">
          <h2>GitHub Authentication Error</h2>
          <p>${err.message || String(err)}</p>
          <p>Please ensure GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are configured.</p>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}
