"use client"; 
import React, { useState } from "react";

const ShopPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter content - Jeta Mobile o Desktop dui jaygay thakbe
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
      <hr className="border-gray-200 dark:border-gray-400 " />
      <div className="space-y-3 text-gray-600">
        {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
          <div
            key={item}
            className="flex dark:text-white dark:hover:text-gray-300 justify-between cursor-pointer hover:text-black "
          >
            {item} <span>&gt;</span>
          </div>
        ))}
      </div>
      <hr className="border-gray-200 dark:border-gray-600 " />
      <div>
        <h3 className="font-bold mb-4">Price</h3>
        <input type="range" className="w-full accent-black" />
        <div className="flex justify-between text-sm mt-2">
          <span>$50</span>
          <span>$200</span>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-600 " />
      <div>
        <h3 className="font-bold mb-4">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "bg-green-500",
            "bg-red-500",
            "bg-yellow-400",
            "bg-blue-700",
            "bg-black",
          ].map((color, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full border ${color} cursor-pointer`}
            ></div>
          ))}
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-600 " />
      {/* size  */}
      <div className="mt-4">
        <span className="font-bold">Size:</span>
        <div className="flex gap-2 mt-2">
          {["S", "M", "L", "XL"].map((size) => (
            <div
              key={size}
              className="border  border-gray-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:text-white"
            >
              {size}
            </div>
          ))}
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-600 " />
      {/* Dress style  */}
      <div className="mt-4">
        <span className="font-bold">Size:</span>
        <div className="space-y-3 text-gray-600 mt-4">
          {["Casual", "Formal", "Party", "Gym"].map((item) => (
            <div
              key={item}
              className="flex justify-between dark:text-white dark:hover:text-gray-300  cursor-pointer hover:text-black"
            >
              {item} <span>&gt;</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full bg-black text-white py-3 rounded-full mt-4 text-sm">
        Apply Filter
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Mobile-er Header jekhane Filter Button thakbe */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Casual</h1>

        {/* MOBILE FILTER TOGGLE BUTTON */}
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:block w-64 border border-gray-200 dark:border-gray-600  p-5 rounded-2xl h-fit">
          <FilterContent />
        </aside>

        {/* MOBILE DRAWER (Filter click korle side theke asbe) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className="relative w-72 bg-white h-full p-6 shadow-xl overflow-y-auto">
              <FilterContent />
            </div>
          </div>
        )}

        {/* PRODUCT GRID */}
        <main className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19].map(
              (item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="bg-[#F0EEED] rounded-2xl aspect-square mb-3 overflow-hidden">
                    <img
                      src={`https://via.placeholder.com/300?text=Item+${item}`}
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="subtitle dark:text-white! ">
                    Product Name {item}
                  </h3>
                  <div className="text-yellow-400 text-xs">★★★★☆</div>
                  <div className="price-title dark:text-white!">$145</div>
                </div>
              ),
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
