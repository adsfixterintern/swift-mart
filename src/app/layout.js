import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { CartProvider } from "@/context/CartContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Swift Mart",
    template: "%s | Swift Mart",
  },
  description: "Super Powerful E-commerce Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
