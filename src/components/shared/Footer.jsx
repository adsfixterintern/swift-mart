import Image from "next/image";
import { Mail, Twitter, Facebook, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative  bg-[#f0f0f0] dark:bg-gray-900 pt-32 mt-20">
      {/* ================= NEWSLETTER ================= */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 z-20">
        <div className="bg-black rounded-2xl px-6 md:px-6 py-10 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text */}
          <h2 className="text-white text-2xl md:text-4xl font-extrabold text-center md:text-left leading-tight">
            STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
          </h2>

          {/* Input + Button */}
          <div className="w-full md:w-auto flex flex-col gap-4">
            <div className="flex items-center bg-white dark:text-black rounded-full px-4 py-3 w-full md:w-[350px]">
              <Mail size={18} className="text-gray-400 dark:text-black mr-2" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="outline-none text-sm w-full bg-transparent"
              />
            </div>

            <button className="bg-white text-black font-medium rounded-full py-3 text-sm hover:opacity-90 transition">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* ================= FOOTER CONTENT ================= */}
      <div className="max-w-7xl px-4 mx-auto pb-8 ">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between pt-10 md:pt-0 gap-10">
          {/* ===== 30% Brand Section ===== */}
          <div className="w-full md:w-[30%]">
            <h3 className="text-2xl font-extrabold mb-3">SwiftMart</h3>
            <p className="text-gray-600 text-sm mb-4">
              We have clothes that suits your style and which you&apos;re proud to
              wear. From women to men.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <div className="bg-white dark:bg-black p-2 rounded-full shadow-sm">
                <Twitter size={16} className="dark:text-white" />
              </div>
              <div className="bg-white dark:bg-black p-2 rounded-full shadow-sm">
                <Facebook size={16} className="dark:text-white" />
              </div>
              <div className="bg-white dark:bg-black p-2 rounded-full shadow-sm">
                <Instagram size={16} className="dark:text-white" />
              </div>
              <div className="bg-white dark:bg-black p-2 rounded-full shadow-sm">
                <Github size={16} className="dark:text-white" />
              </div>
            </div>
          </div>

          {/* ===== 70% Links Section ===== */}
          <div className="w-full md:w-[70%] grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3">COMPANY</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About</li>
                <li>Features</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">HELP</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">FAQ</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Account</li>
                <li>Manage Deliveries</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">RESOURCES</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Free eBooks</li>
                <li>Development Tutorial</li>
                <li>How to - Blog</li>
                <li>Youtube Playlist</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-8 border-gray-300"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-white">
          <p>SwiftMart © 2000-2023, All Rights Reserved</p>

          {/* Payment Icons */}

          <div className="flex items-center gap-3">
            <Image
              src="/PaymentGateway/visa.png"
              alt="visa"
              width={40}
              height={30}
            />
            <Image
              src="/PaymentGateway/Mastercard.png"
              alt="mastercard"
              width={40}
              height={30}
            />
            <Image
              src="/PaymentGateway/PayPal.svg.webp"
              alt="paypal"
              width={40}
              height={30}
            />
            <Image
              src="/PaymentGateway/apple.png"
              alt="applepay"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
