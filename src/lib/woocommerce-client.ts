// Client-side WooCommerce fetcher - fetches directly from WooCommerce REST API
const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL || "";
const WOO_KEY = process.env.NEXT_PUBLIC_WOO_CONSUMER_KEY || "";
const WOO_SECRET = process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET || "";

export async function fetchWooClient(endpoint: string, params: Record<string, string> = {}) {
  try {
    const url = new URL(`${WOO_URL.replace(/\/$/, "")}/wp-json/wc/v3/${endpoint}`);
    url.searchParams.set("consumer_key", WOO_KEY);
    url.searchParams.set("consumer_secret", WOO_SECRET);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(`WooCommerce fetch error for ${endpoint}:`, e);
    return [];
  }
}
