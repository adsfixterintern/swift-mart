"use client";
import { useState } from "react";
import { Menu, X, Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">SHOP.CO</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li>Shop</li>
          <li>On Sale</li>
          <li>New Arrivals</li>
          <li>Brands</li>
        </ul>

        {/* Search + Cart */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none ml-2 text-sm"
            />
          </div>
          <ShoppingCart size={20} />
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium">
          <p>Shop</p>
          <p>On Sale</p>
          <p>New Arrivals</p>
          <p>Brands</p>
        </div>
      )}
    </nav>
  );
}
