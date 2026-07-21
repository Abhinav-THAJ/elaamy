import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  try {
    const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL || "";
    const WOO_KEY = process.env.NEXT_PUBLIC_WOO_CONSUMER_KEY || "";
    const WOO_SECRET = process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET || "";
    const url = `${WOO_URL.replace(/\/$/, "")}/wp-json/wc/v3/products?per_page=100&consumer_key=${WOO_KEY}&consumer_secret=${WOO_SECRET}`;
    const res = await fetch(url);
    const products = await res.json();
    if (Array.isArray(products)) {
      return products.map((p: any) => ({ id: String(p.id) }));
    }
  } catch (e) {
    console.error("generateStaticParams error:", e);
  }
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function ProductPage() {
  return <ProductClient />;
}
