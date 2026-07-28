import { NextResponse } from 'next/server';
import { fetchWooData, postWooData } from '@/lib/woocommerce';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  
  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  // Convert searchParams to a normal object, excluding 'endpoint'
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== 'endpoint') {
      params[key] = value;
    }
  });

  try {
    const data = await fetchWooData(endpoint, params);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('WooCommerce API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch WooCommerce data', details: error?.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  
  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const data = await postWooData(endpoint, body);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('WooCommerce API POST Error:', error);
    return NextResponse.json({ error: 'Failed to post WooCommerce data', details: error?.message }, { status: 500 });
  }
}
