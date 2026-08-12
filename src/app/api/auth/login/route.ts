import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WOO_URL || "whitesmoke-eel-783988.hostingersite.com";
    const protocol = wpUrl.includes('http') ? '' : 'https://';
    const wpLoginUrl = `${protocol}${wpUrl}/wp-login.php`;

    const params = new URLSearchParams();
    params.append('log', username);
    params.append('pwd', password);
    params.append('wp-submit', 'Log In');

    // Attempt to log in to WordPress
    const response = await fetch(wpLoginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
      redirect: 'manual' // Prevents following redirect so we can read the cookies
    });

    const setCookieHeader = response.headers.get('set-cookie');
    
    // WordPress sets `wordpress_logged_in_...` cookie upon successful login
    if (setCookieHeader && setCookieHeader.includes('wordpress_logged_in_')) {
      // Login successful!
      let email = "";
      try {
        const wpUser = process.env.WP_USERNAME;
        const wpPassword = process.env.WP_APPLICATION_PASSWORD;
        if (wpUser && wpPassword) {
          const credentials = Buffer.from(`${wpUser}:${wpPassword}`).toString('base64');
          const usersRes = await fetch(`${protocol}${wpUrl}/wp-json/wp/v2/users?search=${username}`, {
            headers: { 'Authorization': `Basic ${credentials}` }
          });
          const usersData = await usersRes.json();
          if (Array.isArray(usersData) && usersData.length > 0) {
            // Find exact match just in case
            const match = usersData.find((u: any) => u.username === username || u.slug === username);
            if (match && match.email) email = match.email;
          }
        }
      } catch (e) {
        console.error("Failed to fetch user email:", e);
      }
      return NextResponse.json({ success: true, message: 'Login successful', username, email });
    } else {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
