"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './_component/ProductCard';
import Link from 'next/link';

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
      <h2 className="section-title text-center mb-10 md:mb-14 uppercase tracking-tighter">
        New Arrivals
      </h2>

      {/* Mobile-e scroll korar jonno: 
          'flex overflow-x-auto' use kora hoyeche. 
          Desktop-e (md breakpoint theke) 'grid' hoye jabe.
      */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-12 pb-4 md:pb-0 scrollbar-hide">
        {products?.slice(0, 4).map((product) => (
          <div key={product.id} className="min-w-[200px] md:min-w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/shop" className="w-full md:w-auto">
        <button className="btn-global !bg-transparent !text-black border border-black/10 px-16 py-4 hover:!bg-black hover:!text-white w-full md:w-auto transition-all">
          View All
        </button>
        </Link>
      </div>
    </section>
  );
}