import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          About Elaamy
        </h1>
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed text-lg">
          <p>
            Welcome to Elaamy, where we believe in the power of meaningful connections. We specialize in providing premium customized gifts, elegant wedding cards, and professional business stationery tailored to your unique needs. Our mission is to help you celebrate life's most precious moments and elevate your brand's presence with high-quality, thoughtfully designed products.
          </p>
          <p>
            Whether you are looking for the perfect personalized gift to show someone you care, beautifully crafted invitations to set the tone for your special day, or sophisticated corporate gifts and stationery to leave a lasting impression, Elaamy is here to bring your vision to life. We take pride in our attention to detail and our commitment to excellence in every piece we create.
          </p>
          <p>
            At Elaamy, customer satisfaction is at the heart of everything we do. Our team works tirelessly to source the finest materials and employ the best printing techniques to ensure that our products not only meet but exceed your expectations. Thank you for choosing us to be a part of your journey, and we look forward to continuing to serve you with creativity, passion, and care.
          </p>
        </div>
      </div>
    </div>
  );
}
