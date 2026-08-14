export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shipping & Delivery Policy</h1>
      <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">1. Processing Time</h2>
        <p>All orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
        <p>For custom-made or personalized items (such as wedding cards or corporate stationery), processing time may take 5 to 7 business days, depending on the complexity of the design and order volume.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">2. Shipping Rates and Estimates</h2>
        <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li><strong>Standard Shipping:</strong> Estimated delivery in 5-7 business days.</li>
          <li><strong>Express Shipping:</strong> Estimated delivery in 2-3 business days.</li>
        </ul>
        <p className="mt-2 text-sm italic">Please note that delivery delays can occasionally occur due to unforeseen circumstances beyond our control (e.g., severe weather conditions, carrier delays).</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">3. Domestic & International Shipping</h2>
        <p>We currently ship primarily within the country. For international orders, please contact our support team prior to placing an order to confirm shipping feasibility and rates.</p>
        <p>Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. Elaamy is not responsible for these charges if they are applied and are your responsibility as the customer.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">4. How do I check the status of my order?</h2>
        <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
        <p>If you haven’t received your order within 10 days of receiving your shipping confirmation email, please contact us at <a href="mailto:hello@elaamy.com" className="text-pink-600 hover:underline">hello@elaamy.com</a> with your name and order number, and we will look into it for you.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">5. Contact Us</h2>
        <p>If you have any further questions about your shipping or delivery, please don't hesitate to contact us at <a href="mailto:hello@elaamy.com" className="text-pink-600 hover:underline">hello@elaamy.com</a>.</p>
      </div>
    </div>
  );
}
