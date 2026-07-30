import { Playfair_Display, Inter, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata = {
  title: "Elaamy | Premium Custom Gifts & Printing",
  description: "Personalized gifts, wedding cards, corporate gifts, photo frames & custom printing. Find something you love for someone you love. ❤️",
  keywords: "custom gifts, wedding cards, photo frames, mementos, corporate gifts, personalized printing",
  openGraph: {
    title: "Elaamy | Premium Custom Gifts & Printing",
    description: "Personalized gifts, wedding cards, photo frames & custom printing",
    type: "website",
  },
};

import { CartSidebar } from "@/components/CartSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${script.variable} h-full antialiased bg-background text-foreground selection:bg-pink-100 selection:text-pink-900`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white">
        <Providers>
          <Header />
          <CartSidebar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
