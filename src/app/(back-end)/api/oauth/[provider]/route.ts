import { NextRequest, NextResponse } from 'next/server';

async function getOAuth(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> }
) {
  const { provider } = await context.params;
  const code = request.nextUrl.searchParams.get('code');

  const { access_token } = await (
    await fetch(`https://discord.com/api/oauth2/token`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code,
      }),
    })
  ).json();

  const user = await fetch(`https://discord.com/api/users/@me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const userData = await user.json();
  return NextResponse.json({ provider, code });
}

export { getOAuth as GET };
