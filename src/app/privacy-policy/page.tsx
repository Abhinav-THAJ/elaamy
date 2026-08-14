export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-sm max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
        <p className="mb-4">We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you about orders and promotional offers.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">3. Information Sharing</h2>
        <p className="mb-4">We do not share your personal information with third parties except as necessary to fulfill your orders or comply with the law.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">4. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at hello@elaamy.com.</p>
      </div>
    </div>
  );
}
