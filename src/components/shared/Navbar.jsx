"use client";

import { Search, ShoppingCart, User, Menu, ChevronDown, X, Languages } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import { useCart } from "@/context/CartContext";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  
  const { cart } = useCart();

  // Navigation Items gulo ke 't' function diye wrap kora hoyeche
  const navItems = [
    { name: t("shop"), href: "/shop" },
    { name: t("onSale"), href: "/on-sale" },
    { name: t("newArrivals"), href: "/new-arrivals" },
    { name: t("brands"), href: "/brands" },
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "bn" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50 dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-6 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 dark:text-gray-200 transition-transform duration-200"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href={`/${locale}`}>
            <h1 className="text-2xl font-bold tracking-tight dark:text-white cursor-pointer">
              {t("title")}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const fullHref = `/${locale}${item.href}`;
              const isActive = pathname === fullHref;

              return (
                <li key={item.name}>
                  <Link
                    href={fullHref}
                    className={`flex items-center gap-1 transition-colors hover:text-black dark:hover:text-white ${
                      isActive
                        ? "text-black dark:text-white font-semibold"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {item.name}
                    {isActive && <ChevronDown size={16} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
          
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full w-62.5">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent outline-none ml-2 text-sm w-full dark:text-white"
            />
          </div>

          <Search 
            className="md:hidden cursor-pointer" 
            size={20} 
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          />

          <Link 
            href={`/${locale}/cart`} 
            className="relative flex items-center p-1 transition-colors hover:text-black dark:hover:text-white text-gray-700 dark:text-gray-200"
          >
            <ShoppingCart className="cursor-pointer" size={24} />
            {cart && cart.length > 0 && (
              <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white dark:border-gray-900 shadow-sm">
                {cart.length}
              </span>
            )}
          </Link>

          <Link href={`/${locale}/profile`}>
            <User className="cursor-pointer" size={20} />
          </Link>

          {/* Language Switch Icon */}
          <div 
            onClick={toggleLanguage}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors flex items-center gap-1"
          >
            <Languages size={20} />
            <span className="text-[10px] font-bold uppercase">{locale === 'en' ? 'BN' : 'EN'}</span>
          </div>

          <ThemeToggle />
        </div>
      </div>


    </nav>
  );
}