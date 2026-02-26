"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";
import AllReviewSection from "../_component/AllReviewSection";
import YouMightAlsoLIght from "../_component/YouMightAlsoLIght";

export default function ProductDetails() {
  const params = useParams();
  const productId = params?.id || params?.slug;
  const { addToCart } = useCart();

  // 🔹 Local State
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 🔹 Fetch Products
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/products.json");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
  });

  // 🔹 Find Product
  const product = products?.find(
    (p) => p.id.toString() === productId?.toString()
  );

  // 🔹 Sync state when product loads/changes
  useEffect(() => {
    if (!product) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMainImage(product.images?.[0] || "");
    setSelectedColor(product.color?.[0] || "");
    setSelectedSize(product.size?.[0] || "");
    setQuantity(1);
  }, [product?.id]);

  // 🔹 Loading UI
  if (isLoading) {
    return (
      <div className="text-center py-20 font-bold p-text">
        Loading...
      </div>
    );
  }

  // 🔹 Product Not Found
  if (!product) {
    return (
      <div className="text-center py-20 font-bold p-text">
        Product not found! (ID: {productId})
      </div>
    );
  }

  const discountPercentage = Math.round(
    ((product.sellPrice - product.discountPrice) /
      product.sellPrice) *
      100
  );

  return (
    <div
      key={product.id}
      className="max-w-[1240px] mx-auto px-4 py-10"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE - IMAGES */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 w-full lg:w-1/2">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {product.images?.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`min-w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] bg-[#F0EEED] rounded-[20px] cursor-pointer border-2 transition-all overflow-hidden flex items-center justify-center ${
                  mainImage === img
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt="thumbnail"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex-1 bg-[#F0EEED] rounded-[20px] overflow-hidden flex items-center justify-center p-6 h-[400px] lg:h-[530px]">
            <Image
              src={mainImage}
              alt={product.productName}
              width={500}
              height={500}
              className="object-contain h-full w-full"
            />
          </div>
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="section-title !text-[32px] md:!text-[40px] uppercase leading-tight">
            {product.productName}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <div className="flex text-[#FFC633] text-xl">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.ratings)
                    ? "★"
                    : "☆"}
                </span>
              ))}
            </div>
            <span className="p-text !text-black">
              {product.ratings}/5
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="price-title !text-[32px]">
              ${product.discountPrice}
            </span>
            <span className="price-title !text-[32px] !text-black/30 line-through">
              ${product.sellPrice}
            </span>
            <span className="bg-[#FF3333]/10 text-[#FF3333] px-4 py-1 rounded-full text-sm font-medium">
              -{discountPercentage}%
            </span>
          </div>

          <p className="p-text border-b border-black/10 pb-6">
            {product.productDetails}
          </p>

          {/* COLOR */}
          <div className="border-b border-black/10 pb-4">
            <p className="p-text mb-3 !text-black font-medium">
              Select Colors
            </p>
            <div className="flex gap-3">
              {product.color?.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: c.toLowerCase() }}
                  className={`w-9 h-9 rounded-full cursor-pointer flex items-center justify-center border border-black/10 transition-all ${
                    selectedColor === c
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }`}
                >
                  {selectedColor === c && (
                    <span
                      className={
                        c.toLowerCase() === "white"
                          ? "text-black"
                          : "text-white"
                      }
                    >
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="border-b border-black/10 pb-4">
            <p className="p-text mb-3 !text-black font-medium">
              Choose Size
            </p>
            <div className="flex gap-3">
              {product.size?.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(s)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedSize === s
                      ? "bg-black text-white"
                      : "bg-[#F0EEED] text-black/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY + CART */}
          <div className="flex gap-4 mt-6">
            <div className="flex items-center justify-between bg-[#F0EEED] px-5 py-3 rounded-full w-1/3">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="text-2xl font-bold"
              >
                -
              </button>
              <span className="font-medium text-lg">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="text-2xl font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() =>
                addToCart(
                  product,
                  quantity,
                  selectedColor,
                  selectedSize
                )
              }
              className="btn-global flex-1 !rounded-full !py-4 hover:opacity-80 transition-all font-bold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <AllReviewSection />
      <YouMightAlsoLIght />
    </div>
  );
}
