"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";

import Link from "next/link";
import ProductCard from "../products/_component/ProductCard";


const ShopPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Filter States ---
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000); // Default max price
  const [filteredProducts, setFilteredProducts] = useState(null);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/products.json");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  // Unique Categories generate kora
  const uniqueCategories = useMemo(() => {
    return products ? [...new Set(products.map((item) => item.category))] : [];
  }, [products]);

  // --- Filter Logic ---
  const handleApplyFilter = () => {
    let tempProducts = [...products];

    if (selectedCategory) {
      tempProducts = tempProducts.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }
    if (selectedColor) {
      // JSON data-te color array/string check kora
      tempProducts = tempProducts.filter((p) =>
        p.color.some((c) => c.toLowerCase() === selectedColor.toLowerCase()),
      );
    }
    if (selectedSize) {
      tempProducts = tempProducts.filter((p) => p.size.includes(selectedSize));
    }
    tempProducts = tempProducts.filter((p) => p.discountPrice <= maxPrice);

    setFilteredProducts(tempProducts);
    setIsSidebarOpen(false); // Mobile view-te sidebar bondho korbe
  };

  // Reset filter function
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedColor("");
    setSelectedSize("");
    setMaxPrice(2000);
    setFilteredProducts(null);
  };

  if (isLoading)
    return <div className="text-center py-20 font-bold">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">Error loading data.</div>
    );

  // Display data (filtered hole filter kora data, na hole shob data)
  const displayProducts = filteredProducts || products;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden text-2xl"
        >
          &times;
        </button>
      </div>
      <hr className="border-gray-200 dark:border-gray-400" />

      {/* Category List */}
      <div className="space-y-3 text-gray-600">
        {uniqueCategories.map((item) => (
          <div
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={`flex justify-between cursor-pointer hover:text-black capitalize ${selectedCategory === item ? "font-bold text-black" : "dark:text-white"}`}
          >
            {item} <span>&gt;</span>
          </div>
        ))}
      </div>

      <hr className="border-gray-200 dark:border-gray-600" />

      {/* Price Range */}
      <div>
        <h3 className="font-bold mb-4">Max Price: ${maxPrice}</h3>
        <input
          type="range"
          min="500"
          max="3000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full accent-black cursor-pointer"
        />
      </div>

      <hr className="border-gray-200 dark:border-gray-600" />

      {/* Colors Section */}
      <div>
        <h3 className="font-bold mb-4">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {["White", "Black", "Red", "Blue", "Green"].map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              title={color}
              className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-blue-500 scale-110" : "border-transparent"}`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-600" />

      {/* Size Section */}
      <div className="mt-4">
        <span className="font-bold">Size:</span>
        <div className="flex gap-2 mt-2">
          {["S", "M", "L", "XL"].map((size) => (
            <div
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border px-3 py-1 rounded-full text-sm cursor-pointer transition ${selectedSize === size ? "bg-black text-white" : "border-gray-300 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4">
        <button
          onClick={handleApplyFilter}
          className="w-full bg-black text-white py-3 rounded-full text-sm font-bold active:scale-95 transition"
        >
          Apply Filter
        </button>
        <button
          onClick={resetFilters}
          className="w-full border border-gray-300 py-2 rounded-full text-xs"
        >
          Reset All
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold capitalize">
          {selectedCategory || "All Products"} ({displayProducts.length})
        </h1>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden bg-gray-100 p-2 rounded-full px-4 flex items-center gap-2"
        >
          <span className="text-sm font-medium">Filter</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-15">
        {/* DESKTOP SIDEBAR - Fixed/Sticky on scroll */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 border border-gray-200 dark:border-gray-600 p-5 rounded-2xl max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            <FilterContent />
          </div>
        </aside>

        {/* MOBILE DRAWER */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className="relative w-72 bg-white h-full p-6 shadow-xl overflow-y-auto">
              <FilterContent />
            </div>
          </div>
        )}

        <main className="flex-1">
          <div className="grid grid-cols-2 pb-20 lg:grid-cols-3 gap-4 md:gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
