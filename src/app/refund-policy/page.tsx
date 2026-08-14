export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
      <div className="prose prose-sm max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Returns</h2>
        <p className="mb-4">We accept returns within 30 days of purchase for most items in their original condition and packaging. Custom-made or personalized items are generally non-refundable unless they arrive damaged or defective.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">2. Refunds</h2>
        <p className="mb-4">Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 5-7 business days.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">3. Exchanges</h2>
        <p className="mb-4">We only replace items if they are defective or damaged. If you need an exchange, please contact our support team.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">4. Shipping Costs</h2>
        <p className="mb-4">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>
      </div>
    </div>
  );
}
