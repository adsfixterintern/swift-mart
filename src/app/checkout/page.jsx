"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { CreditCard, Truck, ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  
  // Cart Page থেকে আসা ডাটা
  const subtotal = searchParams.get("subtotal") || "0.00";
  const discount = searchParams.get("discount") || "0.00";
  const delivery = searchParams.get("delivery") || "0.00";
  const total = searchParams.get("total") || "0.00";

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { paymentMethod: "cod" }
  });

  const selectedPayment = watch("paymentMethod");

  const onSubmit = (data) => {
    console.log("Order Data:", { ...data, amount: total });
    alert("Order placed successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 bg-white dark:bg-[#050505]">
      <h1 className="section-title h1 mb-10 uppercase tracking-tighter">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-12">
        
        {/* Left Side */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-6 text-black dark:text-white">
              <Truck size={22} />
              <h2 className="text-xl font-bold uppercase italic">Shipping Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input {...register("firstName", { required: true })} placeholder="First Name" className="bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-full px-6 py-3 outline-none dark:text-white" />
              <input {...register("lastName", { required: true })} placeholder="Last Name" className="bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-full px-6 py-3 outline-none dark:text-white" />
              <input {...register("address", { required: true })} placeholder="Full Address" className="md:col-span-2 bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-full px-6 py-3 outline-none dark:text-white" />
              <input {...register("phone", { required: true })} placeholder="Phone Number" className="md:col-span-2 bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-full px-6 py-3 outline-none dark:text-white" />
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-6 text-black dark:text-white">
              <CreditCard size={22} />
              <h2 className="text-xl font-bold uppercase italic">Payment Method</h2>
            </div>
            
            <div className="space-y-3">
              {/* Cash on Delivery */}
              <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${selectedPayment === 'cod' ? 'border-black dark:border-white bg-gray-50 dark:bg-white/5' : 'border-gray-200 dark:border-gray-800'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" {...register("paymentMethod")} value="cod" className="w-4 h-4 accent-black" />
                  <span className="font-medium dark:text-white">Cash on Delivery</span>
                </div>
              </label>

              {/* Online Payment */}
              <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${selectedPayment === 'online' ? 'border-black dark:border-white bg-gray-50 dark:bg-white/5' : 'border-gray-200 dark:border-gray-800'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" {...register("paymentMethod")} value="online" className="w-4 h-4 accent-black" />
                  <span className="font-medium dark:text-white">Online Payment (Instant)</span>
                </div>
              </label>

              {/* Bkash/Nagad Options - Only shows when 'online' is selected */}
              {selectedPayment === 'online' && (
                <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-2xl animate-in fade-in slide-in-from-top-2">
                  <label className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-pink-500 transition-colors">
                    <input type="radio" {...register("gateway")} value="bkash" className="hidden peer" />
                   <Image src="/PaymentGateway/bkash.png" alt="bkash" width={100} height={60} className="object-contain" />
                  </label>
                  <label className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-orange-500 transition-colors">
                    <input type="radio" {...register("gateway")} value="nagad" className="hidden peer" />
                    <Image src="/PaymentGateway/nagad.png" alt="nagad" width={100} height={60} className="object-contain" />
                  </label>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Side: Summary */}
        <div className="lg:col-span-5">
          <div className="border border-gray-200 dark:border-gray-800 rounded-[20px] p-6 sticky top-24 bg-white dark:bg-[#121212]">
            <h2 className="text-xl font-bold mb-6 uppercase text-black dark:text-white">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between p-text"><span className="text-sm">Subtotal</span><span className="font-bold text-black dark:text-white">৳{subtotal}</span></div>
              <div className="flex justify-between p-text"><span className="text-sm">Discount</span><span className="font-bold text-red-500">-৳{discount}</span></div>
              <div className="flex justify-between p-text"><span className="text-sm">Delivery Fee</span><span className="font-bold text-black dark:text-white">৳{delivery}</span></div>
              <hr className="border-gray-200 dark:border-gray-800" />
              <div className="flex justify-between items-center text-xl text-black dark:text-white">
                <span className="font-bold">Total</span>
                <span className="font-black">৳{total}</span>
              </div>
            </div>

            <button type="submit" className="w-full btn-global py-4 text-lg shadow-lg">
              Confirm Order
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-green-600 text-xs font-medium">
              <CheckCircle2 size={14} /> Secure Checkout
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}