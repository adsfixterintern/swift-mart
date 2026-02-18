import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Check,
  Settings2,
  ChevronDown,
  MoreHorizontal,
  Star,
} from "lucide-react";

const AllReviewSection = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [visibleCount, setVisibleCount] = useState(6);

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch("/reviews.json");
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  const renderStars = (rating) => (
    <div className="flex gap-[2px] mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          className={
            i < rating ? "fill-[#FFC633] text-[#FFC633]" : "text-gray-200"
          }
        />
      ))}
    </div>
  );

  const visibleReviews = reviews?.slice(0, visibleCount) || [];

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-10">
      {/* Tabs */}
      <div className="flex border-b border-black/10 mb-8">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex-1 py-4 text-center transition-all ${
            activeTab === "details"
              ? "font-bold border-b-2 border-black text-black"
              : "p-text hover:text-black"
          }`}
        >
          Product Details
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 py-4 text-center transition-all ${
            activeTab === "reviews"
              ? "font-bold border-b-2 border-black text-black"
              : "p-text hover:text-black"
          }`}
        >
          Rating & Reviews
        </button>

        <button
          onClick={() => setActiveTab("faq")}
          className={`flex-1 py-4 text-center transition-all ${
            activeTab === "faq"
              ? "font-bold border-b-2 border-black text-black"
              : "p-text hover:text-black"
          }`}
        >
          FAQs
        </button>
      </div>

      {/* PRODUCT DETAILS */}
      {activeTab === "details" && (
        <div className="p-text leading-relaxed max-w-3xl">
          <p>
            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance. This product is made
            with premium quality materials and designed for everyday comfort and
            durability. It goes through strict quality control to ensure
            long-lasting performance. This product is made with premium quality
            materials and designed for everyday comfort and durability. It goes
            through strict quality control to ensure long-lasting performance.
            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.
          </p>
          <p className="mt-4">
            Suitable for casual and regular use. Easy to maintain and perfect
            for modern lifestyle needs.
                        This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.            This product is made with premium quality materials and designed for
            everyday comfort and durability. It goes through strict quality
            control to ensure long-lasting performance.
          </p>
        </div>
      )}

      {/* FAQ */}
      {activeTab === "faq" && (
        <div className="space-y-4 max-w-3xl">
          <div>
            <p className="font-bold">Is this product original?</p>
            <p className="p-text">
              Yes, all our products are 100% authentic and verified.
            </p>
          </div>

          <div>
            <p className="font-bold">How long does delivery take?</p>
            <p className="p-text">Delivery usually takes 3–5 working days.</p>
          </div>

          <div>
            <p className="font-bold">Can I return this product?</p>
            <p className="p-text">
              Yes, returns are accepted within 7 days of delivery.
            </p>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      {activeTab === "reviews" && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="subtitle flex items-center gap-2">
              All Reviews{" "}
              <span className="p-text font-normal">
                ({reviews?.length || 0})
              </span>
            </h3>

            <div className="flex items-center gap-2">
              <button className="p-3 bg-[#F0F0F0] rounded-full md:block hidden">
                <Settings2 size={20} />
              </button>
              <button className="md:flex hidden items-center gap-2 px-5 py-3 bg-[#F0F0F0] rounded-full font-medium">
                Latest <ChevronDown size={18} />
              </button>
              <button className="btn-global !px-6 !py-3">Write a Review</button>
            </div>
          </div>

          {/* Reviews Grid */}
          {isLoading ? (
            <div className="text-center py-20">Loading Reviews...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {visibleReviews.map((review, index) => (
                <div
                  key={index}
                  className="border border-black/10 rounded-[20px] p-6 lg:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      {renderStars(review.rating)}
                      <button className="text-black/40">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <span className="font-bold text-lg">
                        {review.personName}
                      </span>
                      {review.cmd === "verified" && (
                        <div className="bg-[#01AB31] rounded-full p-[2px]">
                          <Check size={10} className="text-white" />
                        </div>
                      )}
                    </div>

                    <p className="p-text">"{review.review}"</p>
                  </div>

                  <p className="p-text mt-6 font-medium text-black/60">
                    Posted on {review.postDate}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {visibleCount < (reviews?.length || 0) && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((p) => p + 6)}
                className="px-10 py-3 border border-black/10 rounded-full font-medium hover:bg-gray-50 transition-all"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllReviewSection;
