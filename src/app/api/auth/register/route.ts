import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, first_name, last_name, username, password } = body;

    if (!email || !username || !password) {
      return NextResponse.json({ error: 'Email, username, and password are required' }, { status: 400 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WOO_URL || "whitesmoke-eel-783988.hostingersite.com";
    const protocol = wpUrl.includes('http') ? '' : 'https://';
    const apiUrl = `${protocol}${wpUrl}/wp-json/wp/v2/users`;

    const wpUser = process.env.WP_USERNAME;
    const wpPassword = process.env.WP_APPLICATION_PASSWORD;

    if (!wpUser || !wpPassword) {
      return NextResponse.json({ error: 'WordPress credentials not configured' }, { status: 500 });
    }

    const credentials = Buffer.from(`${wpUser}:${wpPassword}`).toString('base64');

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify({
        username,
        email,
        password,
        first_name,
        last_name,
        roles: ['customer']
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Registration failed' }, { status: res.status });
    }

    return NextResponse.json({ success: true, message: 'Registration successful', user: data });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
