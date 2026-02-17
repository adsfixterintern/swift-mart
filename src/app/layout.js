import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
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
        <ReactQueryProvider>
          <ThemeProvider>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
