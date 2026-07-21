import { notFound } from "next/navigation";

const validCategories = ["flower", "cake", "cards", "toys", "events", "contact"];

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  // Basic check so we don't catch EVERY root route like /_next or something (though App router handles that usually)
  // Let's just render a nice placeholder for any valid category we have in the header.
  if (!validCategories.includes(category)) {
    // We can just show the placeholder for anything right now to avoid 404s, or strict check.
    // Let's allow any category string to render the generic page for now so the user sees something working.
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 capitalize">
          {category}
        </h1>
        <p className="text-gray-500 mb-12">
          Explore our premium selection of {category}. We are currently curating this collection. Please check back later.
        </p>
        
        {/* Placeholder Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-100 opacity-70">
              <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
