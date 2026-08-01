// Server-side WooCommerce fetcher using native fetch + Basic Auth
// This is more reliable than the @woocommerce/woocommerce-rest-api package on Vercel
import { getCorrectImage } from "./woocommerce-client";

let envUrl = (process.env.NEXT_PUBLIC_WOO_URL || "").replace(/\/$/, "");
if (envUrl && !envUrl.startsWith("http")) {
  envUrl = `https://${envUrl}`;
}
const WOO_URL = envUrl;
const WOO_KEY = process.env.WOO_CONSUMER_KEY || process.env.NEXT_PUBLIC_WOO_CONSUMER_KEY || "";
const WOO_SECRET = process.env.WOO_CONSUMER_SECRET || process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET || "";

export async function fetchWooData(endpoint: string, params: Record<string, any> = {}): Promise<any[]> {
  try {
    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) {
      console.warn("WooCommerce env vars not set");
      return [];
    }

    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    ).toString();

    const url = `${WOO_URL}/wp-json/wc/v3/${endpoint}${queryString ? `?${queryString}` : ""}`;
    console.log("Fetching WooCommerce URL:", url);
    const credentials = btoa(`${WOO_KEY}:${WOO_SECRET}`);

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
      cache: "no-store", // Disable caching to always get fresh products
    });

    if (!res.ok) {
      console.error(`WooCommerce fetch failed: ${res.status} ${res.statusText} for ${url}`);
      return [];
    }

    const data = await res.json();
    
    // Fix images in products response
    if (Array.isArray(data)) {
      return data.map((item: any) => {
        if (item.images && Array.isArray(item.images)) {
          item.images = item.images.map((img: any) => ({
            ...img,
            src: getCorrectImage(img.src)
          }));
        }
        return item;
      });
    } else if (data && typeof data === 'object') {
      if (data.images && Array.isArray(data.images)) {
        data.images = data.images.map((img: any) => ({
          ...img,
          src: getCorrectImage(img.src)
        }));
      }
      return data;
    }
    return data;
  } catch (error) {
    console.error(`Error fetching WooCommerce ${endpoint}:`, error);
    return [];
  }
}

export async function postWooData(endpoint: string, data: any = {}): Promise<any> {
  if (!WOO_URL || !WOO_KEY || !WOO_SECRET) {
    throw new Error("WooCommerce env vars not set");
  }

  const url = `${WOO_URL}/wp-json/wc/v3/${endpoint}`;
  const credentials = btoa(`${WOO_KEY}:${WOO_SECRET}`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error(`WooCommerce POST failed: ${res.status}`, errBody);
    throw new Error(`WooCommerce POST failed: ${res.status}`);
  }

  return res.json();
}
