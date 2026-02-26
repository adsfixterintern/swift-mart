"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
<<<<<<< HEAD:src/app/shop/page.jsx
import ProductCard from "../products/_component/ProductCard";
import toast from "react-hot-toast";
=======

import Link from "next/link";
import ProductCard from "../products/_component/ProductCard";

>>>>>>> development:src/app/[locale]/shop/page.jsx

const ShopPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
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

  const uniqueCategories = useMemo(() => {
    return products ? [...new Set(products.map((item) => item.category))] : [];
  }, [products]);

  const handleApplyFilter = () => {
    let tempProducts = [...products];
    if (selectedCategory)
      tempProducts = tempProducts.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    if (selectedColor)
      tempProducts = tempProducts.filter((p) =>
        p.color.some((c) => c.toLowerCase() === selectedColor.toLowerCase()),
      );
    if (selectedSize)
      tempProducts = tempProducts.filter((p) => p.size.includes(selectedSize));
    tempProducts = tempProducts.filter((p) => p.discountPrice <= maxPrice);
    setFilteredProducts(tempProducts);
    setIsSidebarOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedColor("");
    setSelectedSize("");
    setMaxPrice(2000);
    setFilteredProducts(null);
  };

  const toggleCompare = (product) => {
    if (compareList.find((p) => p.id === product.id)) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, product]);
    } else {
      toast.error("Maximum 3 products!");
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20 font-bold dark:text-white">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error loading data.
      </div>
    );

  const displayProducts = filteredProducts || products;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-black dark:text-white">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden text-2xl"
        >
          &times;
        </button>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <div className="space-y-3 text-gray-600 dark:text-gray-400">
        {uniqueCategories.map((item) => (
          <div
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={`flex justify-between cursor-pointer hover:text-black dark:hover:text-white capitalize ${selectedCategory === item ? "font-bold text-black dark:text-white" : ""}`}
          >
            {item} <span>&gt;</span>
          </div>
        ))}
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <div className="text-black dark:text-white">
        <h3 className="font-bold mb-4 italic">Max Price: ${maxPrice}</h3>
        <input
          type="range"
          min="500"
          max="3000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full accent-black dark:accent-white cursor-pointer"
        />
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <div>
        <h3 className="font-bold mb-4 text-black dark:text-white">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {["White", "Black", "Red", "Blue", "Green"].map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-blue-500 scale-110" : "border-gray-300 dark:border-gray-600"}`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      <div>
        <span className="font-bold text-black dark:text-white">Size:</span>
        <div className="flex gap-2 mt-2">
          {["S", "M", "L", "XL"].map((size) => (
            <div
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border px-3 py-1 rounded-full text-sm cursor-pointer transition ${selectedSize === size ? "bg-black text-white dark:bg-white dark:text-black" : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <button
          onClick={handleApplyFilter}
          className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-full text-sm font-bold active:scale-95 transition"
        >
          Apply Filter
        </button>
        <button
          onClick={resetFilters}
          className="w-full border border-gray-300 dark:border-gray-700 py-2 rounded-full text-xs text-gray-500 dark:text-gray-400"
        >
          Reset All
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative bg-white dark:bg-black transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold capitalize text-black dark:text-white">
          {selectedCategory || "All Products"} ({displayProducts.length})
        </h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white dark:bg-gray-800 text-black dark:text-white shadow-md" : "text-gray-400"}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white dark:bg-gray-800 text-black dark:text-white shadow-md" : "text-gray-400"}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden bg-gray-100 dark:bg-gray-900 p-2 rounded-full px-4 text-black dark:text-white font-bold flex items-center gap-2 border border-gray-200 dark:border-gray-800"
          >
            <span>Filter</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

<<<<<<< HEAD:src/app/shop/page.jsx
      <div className="flex flex-col md:flex-row gap-8 mb-20">
=======
      <div className="flex flex-col md:flex-row gap-8 mb-15">
        {/* DESKTOP SIDEBAR - Fixed/Sticky on scroll */}
>>>>>>> development:src/app/[locale]/shop/page.jsx
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl bg-white dark:bg-gray-950 shadow-sm">
            <FilterContent />
          </div>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className="relative w-72 bg-white dark:bg-gray-950 h-full p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300">
              <FilterContent />
            </div>
          </div>
        )}

        <main className="flex-1">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
                : "flex flex-col gap-6"
            }
          >
            {displayProducts?.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} viewMode={viewMode} />
                <button
                  onClick={() => toggleCompare(product)}
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-[10px] font-bold z-10 transition ${compareList.find((p) => p.id === product.id) ? "bg-gray-900 dark:bg-gray-400 text-white" : "bg-white/90 dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-black hover:text-white"}`}
                >
                  {compareList.find((p) => p.id === product.id)
                    ? "In Compare"
                    : "+ Compare"}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Comparison Drawer */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] md:w-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl p-4 z-50 animate-in slide-in-from-bottom duration-300">
          {/* Main Close Button for the whole Drawer (Optional but good for UX) */}
          <button
            onClick={() => setCompareList([])}
            className="absolute -top-2 -right-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition-colors border border-white dark:border-gray-700"
          >
            &times;
          </button>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Product Images with individual Remove Icon */}
            <div className="flex -space-x-3 md:-space-x-4">
              {compareList.map((p) => (
                <div key={p.id} className="relative group">
                  <img
                    src={p.images[0]}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white dark:border-gray-800 object-cover shadow-sm"
                    alt={p.productName}
                  />
                  {/* Small Red Close Icon on each image */}
                  <button
                    onClick={() => toggleCompare(p)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold border-2 border-white dark:border-gray-900 hover:bg-red-600 transition-all shadow-md"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="flex-1">
              <p className="text-black dark:text-white font-bold text-xs md:text-sm leading-none">
                {compareList.length} Selected
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 hidden md:block">
                Select at least 2 to compare
              </p>
            </div>

            {compareList.length >= 2 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="bg-black dark:bg-white text-white dark:text-black px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-black hover:opacity-90 transition-opacity shadow-lg shadow-black/10 dark:shadow-white/5"
              >
                Compare Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-950 w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex flex-col text-black dark:text-white animate-in zoom-in duration-300">
            {/* Header */}
            <div className="flex justify-between items-center p-5 md:p-6 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-xl md:text-2xl font-black italic">
                  Compare Products
                </h2>
                <p className="text-[10px] md:text-xs text-gray-500">
                  {compareList.length} items
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="overflow-auto custom-scrollbar">
              {/* min-w-full  */}
              <div className="min-w-[600px] md:min-w-full">
                <table className="w-full border-collapse text-xs md:text-sm table-fixed">
                  <thead>
                    <tr>
                      
                      <th className="w-32 md:w-48 p-4 md:p-6 bg-gray-50/50 dark:bg-gray-900/50"></th>

                      {/* dynamic call*/}
                      {compareList.map((p) => (
                        <th
                          key={p.id}
                          className="p-4 md:p-6 border-l border-gray-100 dark:border-gray-800 text-center"
                        >
                          <img
                            src={p.images[0]}
                            className="w-20 h-20 md:w-32 md:h-32 object-contain mx-auto mb-4 mix-blend-multiply dark:mix-blend-normal"
                            alt={p.productName}
                          />
                          <h3 className="font-bold line-clamp-2 leading-tight h-10">
                            {p.productName}
                          </h3>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {/* Price Row */}
                    <tr className="border-t border-gray-100 dark:border-gray-800">
                      <td className="p-4 md:p-6 font-bold text-gray-400 text-[10px] uppercase bg-gray-50/30 dark:bg-gray-900/30">
                        Price
                      </td>
                      {compareList.map((p) => (
                        <td
                          key={p.id}
                          className="p-4 md:p-6 border-l border-gray-100 dark:border-gray-800 text-center font-black text-base md:text-lg text-green-600"
                        >
                          ৳{p.discountPrice}
                        </td>
                      ))}
                    </tr>

                    {/* Rating Row */}
                    <tr className="border-t border-gray-100 dark:border-gray-800">
                      <td className="p-4 md:p-6 font-bold text-gray-400 text-[10px] uppercase bg-gray-50/30 dark:bg-gray-900/30">
                        Rating
                      </td>
                      {compareList.map((p) => (
                        <td
                          key={p.id}
                          className="p-4 md:p-6 border-l border-gray-100 dark:border-gray-800 text-center text-yellow-500 font-bold"
                        >
                          ★ {p.ratings}
                        </td>
                      ))}
                    </tr>

                    {/* Sizes Row */}
                    <tr className="border-t border-gray-100 dark:border-gray-800">
                      <td className="p-4 md:p-6 font-bold text-gray-400 text-[10px] uppercase bg-gray-50/30 dark:bg-gray-900/30">
                        Sizes
                      </td>
                      {compareList.map((p) => (
                        <td
                          key={p.id}
                          className="p-4 md:p-6 border-l border-gray-100 dark:border-gray-800 text-center font-medium"
                        >
                          {p.size.join(", ")}
                        </td>
                      ))}
                    </tr>

                    {/* Colors Row */}
                    <tr className="border-t border-gray-100 dark:border-gray-800">
                      <td className="p-4 md:p-6 font-bold text-gray-400 text-[10px] uppercase bg-gray-50/30 dark:bg-gray-900/30">
                        Colors
                      </td>
                      {compareList.map((p) => (
                        <td
                          key={p.id}
                          className="p-4 md:p-6 border-l border-gray-100 dark:border-gray-800 text-center capitalize"
                        >
                          {p.color.join(", ")}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 text-center text-[10px] text-gray-400 border-t border-gray-100 dark:border-gray-800 italic">
              * Specifications based on official data.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
