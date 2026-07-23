import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  // Determine origin for redirect_uri
  const origin = req.nextUrl.origin || process.env.APP_URL || 'http://localhost:3000';
  const redirectUri = `${origin}/api/auth/github/callback`;

  if (!clientId) {
    return NextResponse.json({
      error: 'GITHUB_CLIENT_ID_MISSING',
      message: 'GITHUB_CLIENT_ID environment variable is not configured on the server.',
      redirectUri
    }, { status: 400 });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo user',
    allow_signup: 'true',
  });

  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;

  return NextResponse.json({ url, redirectUri });
}
