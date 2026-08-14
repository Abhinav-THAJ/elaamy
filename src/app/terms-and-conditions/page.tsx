export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose prose-sm max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Agreement to Terms</h2>
        <p className="mb-4">By accessing or using our website and services, you agree to be bound by these Terms and Conditions.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">2. Use of Services</h2>
        <p className="mb-4">You agree to use our services only for lawful purposes and in accordance with these Terms.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">3. Product Information</h2>
        <p className="mb-4">We strive to display our products as accurately as possible, but we cannot guarantee that the colors and details will match exactly what you see on your screen.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">4. Changes to Terms</h2>
        <p className="mb-4">We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.</p>
      </div>
    </div>
  );
}
