"use client";

import { useState } from "react";
import { ChevronRight, Trash2, Minus, Plus, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

// 🎁 Promo Codes JSON List
const PROMO_CODES = [
  { code: "SWIFT20", type: "percentage", value: 20 }, // 20% Off
  { code: "FLAT50", type: "flat", value: 50 },        // $50 Off
  { code: "FREESHIP", type: "freeship", value: 0 },   // Free Shipping
];

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
const {theme}=useTheme();
console.log(theme)
  // Promo States
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState({ text: "", type: "" });

  // Promo Apply Logic
  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setPromoMessage({ text: "Please enter a promo code.", type: "error" });
      return;
    }

    const validPromo = PROMO_CODES.find(
      (p) => p.code.toUpperCase() === promoInput.toUpperCase().trim()
    );

    if (validPromo) {
      setAppliedPromo(validPromo);
      setPromoMessage({ text: `'${validPromo.code}' applied successfully!`, type: "success" });
    } else {
      setAppliedPromo(null);
      setPromoMessage({ text: "Invalid or expired promo code.", type: "error" });
    }
  };

  let discountAmount = 0;
  let deliveryFee = cart.length > 0 ? 15 : 0;

  if (appliedPromo) {
    if (appliedPromo.type === "percentage") {
      discountAmount = cartTotal * (appliedPromo.value / 100);
    } else if (appliedPromo.type === "flat") {
      discountAmount = appliedPromo.value;
    } else if (appliedPromo.type === "freeship") {
      deliveryFee = 0;
    }
  }


  if (discountAmount > cartTotal) {
    discountAmount = cartTotal; 
  }

  const finalTotal = cartTotal - discountAmount + deliveryFee;

  return (
    // Main Background (Darker in dark mode for contrast)
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-[#050505] min-h-screen transition-colors duration-300">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm mb-6 text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
        <ChevronRight size={16} />
        <span className="text-black dark:text-white font-medium">Cart</span>
      </div>

      <h1 className="section-title uppercase mb-8 text-black dark:text-white">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Side: Cart Items List */}
        {/* Card Background (Slightly lighter dark:bg-[#121212] for separation) */}
        <div className="flex-1 w-full border border-gray-200 dark:border-gray-800/90 rounded-2xl p-4 md:p-6 space-y-6 bg-white dark:bg-[#121212] shadow-sm dark:shadow-none">
          {cart.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <p className="p-text text-gray-500 dark:text-gray-400">Your cart is empty.</p>
              <Link href="/shop" className="btn-global inline-block">
                Continue Shopping
              </Link>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${item.color}-${item.size}`}>
                <div className="flex gap-4 items-center">
                  
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-xl flex-shrink-0 p-2 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between h-full space-y-2 md:space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className=" text-lg md:text-xl leading-tight text-black dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                          Size: <span className="text-gray-700 dark:text-gray-300">{item.size}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Color: <span className="text-gray-700 dark:text-gray-300">{item.color}</span>
                        </p>
                      </div>
                      
                      {/* Delete Button */}
                      <button 
                        onClick={() => removeFromCart(item.id, item.color, item.size)} 
                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xl md:text-2xl text-black dark:text-white">
                        ${item.price}
                      </span>
                      
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-4 bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-full px-4 py-2 border border-transparent dark:border-gray-800">
                        <button 
                          onClick={() => updateQuantity(item.id, item.color, item.size, "decrement")} 
                          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-sm w-4 text-center text-black dark:text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.color, item.size, "increment")} 
                          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index !== cart.length - 1 && (
                  <hr className="my-6 border-gray-200 dark:border-gray-800/60" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-100 border border-gray-200 dark:border-gray-800/90 rounded-2xl p-4 md:p-6 space-y-6 bg-white dark:bg-[#121212] shadow-sm dark:shadow-none">
          <h2 className="text-xl text-black dark:text-white">Order Summary</h2>

          <div className="space-y-4 text-base text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-black dark:text-white">${cartTotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between">
                <span>
                  Discount 
                  {appliedPromo?.type === "percentage" ? ` (${appliedPromo.value}%)` : ""}
                </span>
                <span className="font-bold text-red-500">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-black dark:text-white">
                {deliveryFee === 0 && appliedPromo?.type === "freeship" ? (
                  <span className="text-green-500">Free</span>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>
            
            <hr className="border-gray-200 dark:border-gray-800/60" />
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg text-black dark:text-white">Total</span>
              <span className=" text-2xl  dark:text-white">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Input */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-full px-4 py-3 border border-transparent dark:border-gray-800 focus-within:border-gray-400 dark:focus-within:border-gray-600 transition-colors">
                <Tag size={20} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Add promo code"
                  className="bg-transparent outline-none w-full text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 uppercase"
                />
              </div>
              <button 
                onClick={handleApplyPromo}
                disabled={cart.length === 0}
                className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-medium rounded-full hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                Apply
              </button>
            </div>
            {/* Message Display (Success/Error) */}
            {promoMessage.text && (
              <p className={`mt-2 text-sm ml-2 ${promoMessage.type === "success" ? "text-green-500" : "text-red-500"}`}>
                {promoMessage.text}
              </p>
            )}
          </div>

          {/* Checkout Button */}
          <button 
            disabled={cart.length === 0}
            className="w-full flex justify-center items-center gap-2 bg-black text-white dark:bg-white dark:text-black py-4 rounded-full font-medium hover:opacity-90 transition-opacity mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Go to Checkout <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}