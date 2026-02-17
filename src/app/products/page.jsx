"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './_component/ProductCard';

export default function Products() {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/products.json');
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    }
  });

  if (isLoading) return <div className="text-center py-20 font-bold">Loading...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">Error loading data.</div>;

  return (
    <section className="max-w-[1240px] mx-auto px-4 py-12 md:py-20 border-b border-black/10">
      {/* section-title class use kora hoyeche */}
      <h2 className="section-title text-center mb-10 md:mb-14 uppercase tracking-tighter">
        New Arrivals
      </h2>

      {/* Grid layout for 4 items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-12">
        {/* Prothom 4-ti data slice kore map kora hoyeche */}
        {products?.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button with global classes */}
      <div className="flex justify-center mt-12">
        <button className="btn-global !bg-transparent !text-black border border-black/10 px-16 py-4 hover:!bg-black hover:!text-white w-full md:w-auto transition-all">
          View All
        </button>
      </div>
    </section>
  );
}