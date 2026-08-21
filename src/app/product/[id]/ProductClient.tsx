"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, ShieldCheck, Truck, Star, ChevronLeft, ChevronRight, Plus, Minus, Package, Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchWooClient } from "@/lib/woocommerce-client";
import { useCart } from "@/components/CartContext";

export default function ProductClient() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setSelectedImageIdx(0);
    setQuantity(1);

    fetchWooClient(`products/${productId}`)
      .then(async (data) => {
        if (data && data.id) {
          setProduct(data);

          // Fetch related products
          if (data.related_ids && data.related_ids.length > 0) {
            const relatedData = await fetchWooClient("products", {
              include: data.related_ids.slice(0, 4).join(","),
              per_page: "4"
            });
            if (Array.isArray(relatedData)) setRelatedProducts(relatedData);
          }

          // Track recently viewed products in localStorage
          try {
            const viewed = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
            const filtered = viewed.filter((p: any) => p.id !== data.id);
            filtered.unshift({
              id: data.id,
              name: data.name,
              price: data.price,
              price_html: data.price_html,
              images: data.images
            });
            localStorage.setItem("recently_viewed", JSON.stringify(filtered.slice(0, 10)));
          } catch (e) {
            console.error("Failed to save recently viewed", e);
          }
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  const updateQty = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl" />
              <div className="flex gap-3">
                {[1,2,3].map(i => <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />)}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-10 bg-gray-200 rounded w-3/4" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return (
    <div className="bg-white min-h-screen flex items-center justify-center py-24">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">This product may have been removed or is no longer available.</p>
        <Link href="/collections" className="inline-block px-8 py-3 bg-[#e21b22] text-white rounded-full font-semibold hover:bg-red-700 transition-colors">
          Browse All Products
        </Link>
      </div>
    </div>
  );

  const price = parseFloat(product.price || product.regular_price || "0");
  const regularPrice = parseFloat(product.regular_price || "0");
  const salePrice = parseFloat(product.sale_price || "0");
  const images = product.images && product.images.length > 0 ? product.images : [{ src: "/images/custom-wedding-card.png" }];
  const currentImage = images[selectedImageIdx]?.src || images[0]?.src;
  const rating = parseFloat(product.average_rating || "0");
  const reviewCount = product.rating_count || 0;
  const minOrderQty = product.min_order_quantity || 1;
  const stockStatus = product.stock_status || "instock";
  const attributes = product.attributes || [];

  // Discount percentage
  const discountPercent = salePrice > 0 && regularPrice > 0
    ? Math.round((1 - salePrice / regularPrice) * 100)
    : 0;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#e21b22] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-[#e21b22] transition-colors">Products</Link>
            {product.categories?.[0] && (
              <>
                <span>/</span>
                <Link href={`/collections?category=${product.categories[0].id}`} className="hover:text-[#e21b22] transition-colors">
                  {product.categories[0].name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F8F9FA] border border-gray-100 shadow-sm group">
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 z-10 bg-[#e21b22] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  -{discountPercent}% OFF
                </span>
              )}

              <button
                onClick={async () => {
                  if (navigator.share) {
                    await navigator.share({ title: product.name, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 shadow-md transition-all"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIdx(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-[#e21b22] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIdx(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-[#e21b22] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img: any, i: number) => (
                  <button
                    key={img.id || i}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#F8F9FA] border-2 transition-all duration-200 ${i === selectedImageIdx ? "border-[#e21b22] shadow-sm" : "border-gray-100 hover:border-gray-300"}`}
                  >
                    <Image src={img.src} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category & Name */}
            <div className="mb-2 flex items-center gap-2">
              {product.categories?.[0] && (
                <Link
                  href={`/collections?category=${product.categories[0].id}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#e21b22] hover:underline"
                >
                  {product.categories[0].name}
                </Link>
              )}
              {stockStatus === "outofstock" && (
                <span className="text-xs font-bold text-white bg-gray-500 px-2 py-0.5 rounded-full">Out of Stock</span>
              )}
              {stockStatus === "instock" && (
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">In Stock</span>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                </div>
                <span className="font-semibold text-gray-900 text-sm">{rating}</span>
                <span className="text-gray-400 text-sm">({reviewCount} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 p-4 bg-gray-50 rounded-xl">
              {salePrice > 0 ? (
                <>
                  <span className="text-3xl font-bold text-[#e21b22]">₹{salePrice.toFixed(0)}</span>
                  <span className="text-lg text-gray-400 line-through font-medium">₹{regularPrice.toFixed(0)}</span>
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Save {discountPercent}%</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">₹{price.toFixed(0)}</span>
              )}
            </div>

            {/* Short Description */}
            {(product.short_description || product.description) && (
              <div
                className="prose prose-sm text-gray-600 mb-5 max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-2"
                dangerouslySetInnerHTML={{ __html: product.short_description || product.description || "" }}
              />
            )}

            {/* Product Attributes */}
            {attributes.length > 0 && (
              <div className="mb-5 space-y-3">
                {attributes.map((attr: any) => (
                  <div key={attr.id}>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{attr.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {attr.options?.map((option: string) => (
                        <span key={option} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 cursor-pointer transition-colors">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Min Quantity Notice */}
            {minOrderQty > 1 && (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
                <Package className="w-4 h-4 flex-shrink-0" />
                <span>Minimum order quantity: <strong>{minOrderQty} units</strong></span>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => updateQty(-1)}
                  disabled={quantity <= minOrderQty}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r border-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => updateQty(1)}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors border-l border-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart({
                  id: String(product.id),
                  name: product.name,
                  price: price,
                  image: currentImage,
                  quantity: quantity
                })}
                disabled={stockStatus === "outofstock"}
                className="flex-1 bg-[#e21b22] text-white h-11 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition-colors font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <ShoppingBag className="w-5 h-5" />
                {stockStatus === "outofstock" ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>

            {/* Total for selected qty */}
            {quantity > 1 && (
              <div className="text-sm text-gray-500 -mt-3 mb-5 px-1">
                Total for {quantity} items: <strong className="text-gray-900">₹{(price * quantity).toFixed(0)}</strong>
              </div>
            )}

            {/* Buy Now */}
            <button
              onClick={() => {
                addToCart({ id: String(product.id), name: product.name, price, image: currentImage, quantity });
                router.push("/checkout");
              }}
              disabled={stockStatus === "outofstock"}
              className="w-full py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-900 hover:text-white transition-all duration-300 mb-6 disabled:opacity-50"
            >
              Buy Now →
            </button>

            {/* Trust Badges */}
            <div className="border-t border-gray-100 pt-5 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-xs">Free Delivery</div>
                  <div className="text-xs text-gray-500">Orders above ₹500</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-xs">Quality Guarantee</div>
                  <div className="text-xs text-gray-500">100% Authentic</div>
                </div>
              </div>
            </div>

            {/* SKU / Product Info */}
            {product.sku && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                SKU: <span className="font-medium text-gray-600">{product.sku}</span>
              </div>
            )}
          </div>
        </div>

        {/* Full Description */}
        {product.description && (
          <div className="mt-12 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Product Description</h2>
            <div
              className="prose prose-sm text-gray-600 max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-3 [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mt-4 [&_h3]:mb-2"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rp: any) => {
                const rpPrice = parseFloat(rp.price || rp.regular_price || "0");
                const rpImage = rp.images?.[0]?.src || "/images/custom-wedding-card.png";
                return (
                  <Link key={rp.id} href={`/product/${rp.id}`} className="group bg-white border border-gray-100 rounded-xl hover:border-pink-200 hover:shadow-md transition-all overflow-hidden">
                    <div className="relative aspect-square bg-[#F8F9FA]">
                      <Image src={rpImage} alt={rp.name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="25vw" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-pink-600 transition-colors">{rp.name}</h3>
                      <div className="font-bold text-sm text-gray-900">₹{rpPrice.toFixed(0)}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
