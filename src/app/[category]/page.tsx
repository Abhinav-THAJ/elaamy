import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { fetchWooData } from "@/lib/woocommerce";

const validCategories = ["flower", "cake", "cards", "toys", "events", "contact"];

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  // Fetch category by slug
  const categories = await fetchWooData("products/categories", { slug: category });
  const categoryId = categories?.[0]?.id;
  
  let products = [];
  if (categoryId) {
    products = await fetchWooData("products", { category: categoryId });
  } else {
    // Fallback if no specific category matched, just fetch recent products
    products = await fetchWooData("products", { per_page: 12 });
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 text-center max-w-6xl">
        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 capitalize">
          {category}
        </h1>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          Explore our premium selection of {category}. We have curated these beautiful items just for you.
        </p>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {products.map((product: any) => (
              <div key={product.id} className="group cursor-pointer">
                <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#F8F9FA] rounded-lg overflow-hidden mb-4 border border-gray-100">
                  {product.on_sale && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
                      Sale
                    </span>
                  )}
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:shadow-md transition-all z-10" onClick={(e) => e.preventDefault()}>
                    <Heart className="w-4 h-4" />
                  </button>
                  <Image
                    src={product.images?.[0]?.src || "/images/custom-wedding-card.png"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <div 
                    className="text-red-600 font-bold [&_del]:text-gray-400 [&_del]:text-sm [&_del]:line-through [&_del]:font-normal flex gap-2 items-center"
                    dangerouslySetInnerHTML={{ __html: product.price_html || `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">₹</span>${product.price || 0}</bdi></span>` }}
                  />
                  <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category yet. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
