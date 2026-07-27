"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, Heart, ShieldCheck, Truck, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { fetchWooClient } from "@/lib/woocommerce-client";
import { useCart } from "@/components/CartContext";

export default function ProductClient() {
  const params = useParams();
  const productId = params?.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetchWooClient(`products/${productId}`)
      .then((data) => {
        if (data && data.id) {
          setProduct(data);
          
          try {
            // Track recently viewed products in localStorage
            const viewed = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
            const filtered = viewed.filter((p: any) => p.id !== data.id);
            filtered.unshift({
              id: data.id,
              name: data.name,
              images: data.images
            });
            // Keep up to 5 items max, oldest disappears
            localStorage.setItem("recently_viewed", JSON.stringify(filtered.slice(0, 5)));
          } catch (e) {
            console.error("Failed to save recently viewed", e);
          }
        } else {
          setProduct(null); // Product not found / deleted
        }
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen py-24 flex items-center justify-center">
        <div className="text-gray-400 text-xl animate-pulse">Loading product...</div>
      </div>
    );
  }

  if (!product) return (
    <div className="bg-white min-h-screen py-24 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-serif text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">This product may have been removed or is no longer available.</p>
        <a href="/collections" className="inline-block px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all">
          Browse All Products
        </a>
      </div>
    </div>
  );

  const price = parseFloat(product.price || product.regular_price || "0");
  const imageUrl = product.images?.[0]?.src || "/images/custom-wedding-card.png";
  const rating = parseFloat(product.average_rating || "5.0");
  const reviewCount = product.rating_count || 12;

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F8F9FA] shadow-sm">
              <Image src={imageUrl} alt={product.name} fill className="object-cover" priority />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img: any, i: number) => (
                  <div key={img.id || i} className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F8F9FA] border border-gray-100 flex-shrink-0 cursor-pointer hover:border-pink-400 transition-colors">
                    <Image src={img.src} alt={`${product.name} ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-pink-500">
              {product.categories?.[0]?.name || "Premium Gift"}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-yellow-500" />
                <span className="font-medium text-gray-900 ml-1">{rating}</span>
                <span className="text-gray-500 text-sm ml-1">({reviewCount} reviews)</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-8" dangerouslySetInnerHTML={{ __html: product.price_html || `<span>₹${price.toFixed(2)}</span>` }} />
            <div className="prose prose-sm text-gray-600 mb-8 max-w-none" dangerouslySetInnerHTML={{ __html: product.description || product.short_description || "" }} />
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
              <button 
                onClick={() => addToCart({
                  id: String(product.id),
                  name: product.name,
                  price: price,
                  image: imageUrl,
                  quantity: 1
                })}
                className="flex-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white h-14 rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-all font-medium text-lg"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button className="w-14 h-14 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center hover:bg-pink-100 transition-colors flex-shrink-0">
                <Heart className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-gray-400" />
                <span>Free delivery on orders over ₹500</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span>1 Year Warranty &amp; Genuine Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
