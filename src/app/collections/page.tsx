import { Suspense } from "react";
import CollectionsClient from "./CollectionsClient";

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-gray-400 text-xl animate-pulse">Loading collections...</div>
      </div>
    }>
      <CollectionsClient />
    </Suspense>
  );
}
