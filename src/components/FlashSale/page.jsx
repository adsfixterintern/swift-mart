
"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/app/products/_component/ProductCard";
import Link from "next/link";

const FlashSale = ({ lang = "en", currency = "BDT", exchangeRate = 120 }) => {
  // Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // API Call
  const { data: products, isLoading } = useQuery({
    queryKey: ["flash-sale-products"],
    queryFn: async () => {
      const res = await fetch("/products.json");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.filter((p) => p.discountPrice < 1500).slice(0, 4);
    },
  });

  // Timer Logic
  useEffect(() => {
    const targetDate = new Date("2026-12-31T23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    if (currency === "BDT")
      return `৳${price.toLocaleString(lang === "bn" ? "bn-BD" : "en-BD")}`;
    const usdPrice = (price / exchangeRate).toFixed(2);
    return `$${usdPrice}`;
  };

  const labels = {
    en: {
      title: "Flash Sale",
      sub: "Limited Time Offers",
      btn: "View All",
      days: "Days",
      hrs: "Hrs",
      min: "Min",
      sec: "Sec",
    },
    bn: {
      title: "ফ্ল্যাশ সেল",
      sub: "সীমিত সময়ের অফার",
      btn: "সবগুলো দেখুন",
      days: "দিন",
      hrs: "ঘণ্টা",
      min: "মিনিট",
      sec: "সেকেন্ড",
    },
  };

  // Updated TimerBox with Halka Gray & Black Number
  const TimerBox = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center min-w-[60px] md:min-w-[80px] h-20 md:h-24 bg-gray-100/80 dark:bg-zinc-800/50 rounded-2xl border border-gray-200/50 dark:border-white/5 transition-all">
      <span className="text-2xl md:text-3xl font-black text-black dark:text-white tabular-nums tracking-tighter">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] md:text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-black border-y border-gray-100 dark:border-zinc-900 py-12 my-10 relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Glow (Gray instead of Red) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 p-8 rounded-[2.5rem] bg-gray-50/50 dark:bg-zinc-900/40 border border-gray-200/50 dark:border-white/5 backdrop-blur-sm">
          {/* Left: Title Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              {/* Black/White Bar */}
              <div className="bg-black dark:bg-white w-1 h-14 rounded-full shadow-sm"></div>
            </div>
            <div>
              <h2 className="section-title text-3xl md:text-4xl font-black !mb-0 text-black dark:text-white uppercase tracking-tight">
                {labels[lang].title}
              </h2>
              <p className="text-[10px] md:text-xs text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-[0.4em] mt-2">
                {labels[lang].sub}
              </p>
            </div>
          </div>

          {/* Center: Timer Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <TimerBox value={timeLeft.days} label={labels[lang].days} />
            <span className="text-xl font-light text-gray-300 dark:text-zinc-700 self-center mb-6">
              :
            </span>
            <TimerBox value={timeLeft.hours} label={labels[lang].hrs} />
            <span className="text-xl font-light text-gray-300 dark:text-zinc-700 self-center mb-6">
              :
            </span>
            <TimerBox value={timeLeft.minutes} label={labels[lang].min} />
            <span className="text-xl font-light text-gray-300 dark:text-zinc-700 self-center mb-6">
              :
            </span>
            <TimerBox value={timeLeft.seconds} label={labels[lang].sec} />
          </div>

          {/* Right: View All Button */}
          <div className="flex items-center">
            <Link
              href="/shop"
              className="btn-global !bg-black dark:!bg-white !text-white dark:!text-black group flex items-center gap-3 px-10 py-5! rounded-2xl transition-all hover:opacity-90 active:scale-95 shadow-xl shadow-black/5"
            >
              <span className="font-black text-xs uppercase tracking-widest leading-none">
                {labels[lang]?.btn}
              </span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 dark:bg-zinc-900 animate-pulse h-80 rounded-[2rem]"
                ></div>
              ))
            : products?.map((product) => (
                <div key={product.id} className="group relative">
                  <ProductCard
                    product={product}
                    viewMode="grid"
                    currencyFormatter={formatPrice}
                  />
                  {/* Updated Badge to Gray/Black */}
                  <div className="absolute top-3 left-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black px-3 py-1.5 rounded-lg uppercase shadow-sm tracking-tighter">
                    Flash Offer
                  </div>
                </div>
              ))}
        </div>

        {/* Mobile View All Button */}
        <Link
          href="/shop"
          className="w-full mt-8 md:hidden bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex justify-center items-center shadow-lg"
        >
          {labels[lang].btn}
        </Link>
      </div>
    </div>
  );
};

export default FlashSale;
