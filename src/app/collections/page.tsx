import { Suspense } from "react";
import CollectionsClient from "./CollectionsClient";

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#F8F9FA] min-h-screen pb-20">
        <div className="bg-white border-b border-gray-100 py-8">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse">
                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <CollectionsClient />
    </Suspense>
  );
}
