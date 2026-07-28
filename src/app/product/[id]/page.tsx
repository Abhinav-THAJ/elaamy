// Force dynamic rendering to avoid build-time WooCommerce fetch failures
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // Return empty — product pages will be rendered on-demand
  return [];
}


export default function ProductPage() {
  return <ProductClient />;
}
