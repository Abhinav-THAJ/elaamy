import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get customer ID and metadata
    const wpUser = process.env.WP_USERNAME;
    const wpPassword = process.env.WP_APPLICATION_PASSWORD;
    const auth = Buffer.from(`${wpUser}:${wpPassword}`).toString("base64");

    const custRes = await fetch(`https://whitesmoke-eel-783988.hostingersite.com/wp-json/wc/v3/customers?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: `Basic ${auth}` }
    });

    if (!custRes.ok) throw new Error("Failed to fetch customer");
    const customers = await custRes.json();
    
    if (!customers || customers.length === 0) {
      return NextResponse.json({ wishlist: [] });
    }

    const customer = customers[0];
    const wishlistMeta = customer.meta_data?.find((m: any) => m.key === "_elaamy_wishlist");
    
    return NextResponse.json({ wishlist: wishlistMeta ? wishlistMeta.value : [] });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, wishlist } = body;

    if (!email || !Array.isArray(wishlist)) {
      return NextResponse.json({ error: "Email and wishlist array are required" }, { status: 400 });
    }

    const wpUser = process.env.WP_USERNAME;
    const wpPassword = process.env.WP_APPLICATION_PASSWORD;
    const auth = Buffer.from(`${wpUser}:${wpPassword}`).toString("base64");

    // Get customer ID
    const custRes = await fetch(`https://whitesmoke-eel-783988.hostingersite.com/wp-json/wc/v3/customers?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: `Basic ${auth}` }
    });

    if (!custRes.ok) throw new Error("Failed to fetch customer");
    const customers = await custRes.json();
    
    if (!customers || customers.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const customerId = customers[0].id;

    // Update customer metadata
    const updateRes = await fetch(`https://whitesmoke-eel-783988.hostingersite.com/wp-json/wc/v3/customers/${customerId}`, {
      method: "PUT",
      headers: { 
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        meta_data: [
          {
            key: "_elaamy_wishlist",
            value: wishlist
          }
        ]
      })
    });

    if (!updateRes.ok) throw new Error("Failed to update wishlist");
    
    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
