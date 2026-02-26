"use client";

import { useState, useMemo } from "react";
import { ChevronRight, Trash2, Minus, Plus, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// 🎁 Promo Codes JSON List
const PROMO_CODES = [
  { code: "SWIFT20", type: "percentage", value: 20 }, // 20% Off
  { code: "FLAT50", type: "flat", value: 50 },        // $50 Off
  { code: "FREESHIP", type: "freeship", value: 0 },   // Free Shipping
];

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Promo States
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState({ text: "", type: "" });

  // ১. ক্যালকুলেশন লজিক (Memoized for Performance)
  const totals = useMemo(() => {
    // যদি আপনার প্রোডাক্ট ডাটাতে sellPrice এবং discountPrice থাকে, তবে এখানে সেভিংস ক্যালকুলেট করা যায়
    // আপাতত আমরা প্রোমো কোড ডিসকাউন্ট ফোকাস করছি
    let promoDiscount = 0;
    let deliveryFee = cart.length > 0 ? 15 : 0;

    if (appliedPromo) {
      if (appliedPromo.type === "percentage") {
        promoDiscount = cartTotal * (appliedPromo.value / 100);
      } else if (appliedPromo.type === "flat") {
        promoDiscount = appliedPromo.value;
      } else if (appliedPromo.type === "freeship") {
        deliveryFee = 0;
      }
    }

    // ডিসকাউন্ট যেন সাবটোটালের চেয়ে বেশি না হয়
    const finalDiscount = promoDiscount > cartTotal ? cartTotal : promoDiscount;
    const finalTotal = cartTotal - finalDiscount + deliveryFee;

    return { promoDiscount: finalDiscount, deliveryFee, finalTotal };
  }, [cart, cartTotal, appliedPromo]);

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

  return (
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
        <div className="flex-1 w-full border border-gray-200 dark:border-gray-800/90 rounded-2xl p-4 md:p-6 space-y-6 bg-white dark:bg-[#121212]">
          {cart.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <p className="p-text">Your cart is empty.</p>
              <Link href="/shop" className="btn-global inline-block">
                Continue Shopping
              </Link>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${item.color}-${item.size}`}>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-xl flex-shrink-0 p-2 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-full space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-black dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500">Size: <span className="dark:text-gray-300">{item.size}</span></p>
                        <p className="text-sm text-gray-500">Color: <span className="dark:text-gray-300">{item.color}</span></p>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.color, item.size)} className="text-red-500 hover:text-red-600 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xl md:text-2xl font-bold text-black dark:text-white">${item.price}</span>
                      <div className="flex items-center gap-4 bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-full px-4 py-2">
                        <button onClick={() => updateQuantity(item.id, item.color, item.size, "decrement")} className="text-gray-600 dark:text-gray-300"><Minus size={16} /></button>
                        <span className="font-semibold dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.color, item.size, "increment")} className="text-gray-600 dark:text-gray-300"><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
                {index !== cart.length - 1 && <hr className="my-6 border-gray-200 dark:border-gray-800/60" />}
              </div>
            ))
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-[400px] border border-gray-200 dark:border-gray-800/90 rounded-2xl p-6 space-y-6 bg-white dark:bg-[#121212]">
          <h2 className="text-xl font-bold text-black dark:text-white italic uppercase tracking-tighter">Order Summary</h2>

          <div className="space-y-4 text-base">
            <div className="flex justify-between p-text">
              <span>Subtotal</span>
              <span className="font-bold text-black dark:text-white">${cartTotal.toFixed(2)}</span>
            </div>

            {/* Discount Section (সব সময় দেখাবে, ডিসকাউন্ট থাকলে লাল হবে) */}
            <div className="flex justify-between p-text">
              <span>Discount {appliedPromo?.type === "percentage" ? `(${appliedPromo.value}%)` : ""}</span>
              <span className={`font-bold ${totals.promoDiscount > 0 ? "text-red-500" : "text-black dark:text-white"}`}>
                -${totals.promoDiscount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between p-text">
              <span>Delivery Fee</span>
              <span className="font-bold text-black dark:text-white">
                {totals.deliveryFee === 0 && cart.length > 0 ? <span className="text-green-500">Free</span> : `$${totals.deliveryFee.toFixed(2)}`}
              </span>
            </div>
            
            <hr className="border-gray-200 dark:border-gray-800/60" />
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-medium text-black dark:text-white uppercase tracking-tighter">Total</span>
              <span className="text-2xl font-black text-black dark:text-white italic">${totals.finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center bg-[#F0F0F0] dark:bg-[#1e1e1e] rounded-full px-4 py-3">
                <Tag size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Add promo code"
                  className="bg-transparent outline-none w-full text-sm text-black dark:text-white uppercase"
                />
              </div>
              <button onClick={handleApplyPromo} className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-medium rounded-full hover:opacity-80 transition-opacity">
                Apply
              </button>
            </div>
            {promoMessage.text && (
              <p className={`text-xs ml-4 ${promoMessage.type === "success" ? "text-green-500" : "text-red-500"}`}>
                {promoMessage.text}
              </p>
            )}
          </div>

          {/* Checkout Button with Query Params */}
          <Link 
            href={{
              pathname: '/checkout',
              query: { 
                subtotal: cartTotal.toFixed(2),
                discount: totals.promoDiscount.toFixed(2),
                delivery: totals.deliveryFee.toFixed(2),
                total: totals.finalTotal.toFixed(2)
              }
            }}
            className={`w-full flex justify-center items-center gap-2 bg-black text-white dark:bg-white dark:text-black py-4 rounded-full font-bold uppercase transition-all shadow-lg ${cart.length === 0 ? "opacity-50 pointer-events-none" : "hover:scale-[1.02]"}`}
          >
            Go to Checkout <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}