"use client";

import { Search, ShoppingCart, User, Menu, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "On Sale", href: "/on-sale" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Brands", href: "/brands" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 dark:text-gray-200 transition-transform duration-200"
          >
       
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tight dark:text-white cursor-pointer">
              SwiftMart
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
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
          
          {/* Search Desktop */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full w-62.5">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent outline-none ml-2 text-sm w-full dark:text-white"
            />
          </div>

          {/* Icons */}
          <Search 
            className="md:hidden cursor-pointer" 
            size={20} 
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          />
         <Link href={'/cart'}> <ShoppingCart className="cursor-pointer" size={20} /></Link>
          <Link href={'/profile'}><User className="cursor-pointer" size={20} /></Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Search Box */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full w-full">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search for products..."
              className="bg-transparent outline-none ml-2 text-sm w-full dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu (With Slide-Down Animation) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out origin-top ${
          open ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-1 text-sm font-medium flex flex-col">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {item.name}
                {isActive && <ChevronDown size={18} />}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}