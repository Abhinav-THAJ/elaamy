import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize WooCommerce REST API Client
export const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOO_URL || "https://example.com",
  consumerKey: process.env.WOO_CONSUMER_KEY || "ck_example",
  consumerSecret: process.env.WOO_CONSUMER_SECRET || "cs_example",
  version: "wc/v3",
});

export async function fetchWooData(endpoint: string, params: any = {}) {
  try {
    const response = await api.get(endpoint, params);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

export async function postWooData(endpoint: string, data: any = {}) {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}
