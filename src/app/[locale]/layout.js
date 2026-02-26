import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }];
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!["en", "bn"].includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <Toaster position="top-center" reverseOrder={false} />

          <ThemeProvider>
            <CartProvider>
              <ReactQueryProvider>
                <Navbar />
                {children}
                <Footer />
              </ReactQueryProvider>
            </CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}