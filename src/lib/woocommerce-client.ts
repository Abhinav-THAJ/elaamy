// Client-side WooCommerce fetcher - fetches directly from WooCommerce REST API
const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL || "";
const WOO_KEY = process.env.NEXT_PUBLIC_WOO_CONSUMER_KEY || "";
const WOO_SECRET = process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET || "";

const IMAGE_MAP: Record<string, string> = {
  "1538356111053-748a48e1acb8": "/images/wedding_cards.png",
  "1517487881594-2787fef5ebf7": "/images/photo_frames.png",
  "1566125882500-87e10f726cdc": "/images/mementos_awards.png",
  "1586075010923-2dd4570fb338": "/images/business_stationery.png",
  "1572375992501-4b0892d50c69": "/images/stickers_labels.png",
  "1497215728101-856f4ea42174": "/images/corporate_gifts.png",
  "1605600659908-0ef719419d41": "/images/packaging_boxes.png",
  "1612198273689-5c9b2e3b5c65": "/images/custom_printing.png",
  "1549465220-1a8b9238cd48": "/images/personalized_gifts.png",
  "1512909006721-3d6018887383": "/images/gift_hampers.png",
  "1610541583504-f43c2c2e4e7c": "/images/mementos_awards.png", // Trophies
  "1506784983877-45594efa4cbe": "/images/calendars.png",
};

export function getCorrectImage(originalUrl: string): string {
  if (!originalUrl) return "/images/custom-wedding-card.png";
  for (const [id, localPath] of Object.entries(IMAGE_MAP)) {
    if (originalUrl.includes(id)) {
      return localPath;
    }
  }
  return originalUrl;
}

export async function fetchWooClient(endpoint: string, params: Record<string, string> = {}) {
  try {
    const queryParams = new URLSearchParams({ endpoint, ...params }).toString();
    const url = `/api/woo?${queryParams}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    
    // Fix images in products response
    if (Array.isArray(data)) {
      return data.map(item => {
        if (item.images && Array.isArray(item.images)) {
          item.images = item.images.map((img: any) => ({
            ...img,
            src: getCorrectImage(img.src)
          }));
        }
        return item;
      });
    } else if (data && data.images && Array.isArray(data.images)) {
      data.images = data.images.map((img: any) => ({
        ...img,
        src: getCorrectImage(img.src)
      }));
    }
    return data;
  } catch (e) {
    console.error(`WooCommerce fetch error for ${endpoint}:`, e);
    return [];
  }
}
