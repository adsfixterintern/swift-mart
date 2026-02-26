import React from 'react';
import Link from 'next/link'; // Import Link

const ProductCard = ({ product }) => {
  
  const discountPercentage = Math.round(
    ((product.sellPrice - product.discountPrice) / product.sellPrice) * 100
  );

  return (
    // Link tag diye wrap kora hoyeche dynamic id pass kore
    <Link href={`/products/${product.id}`}>
      <div className="flex flex-col gap-2 group cursor-pointer">
        <div className="bg-[#F0EEED] rounded-[20px] aspect-square overflow-hidden flex items-center justify-center p-4">
          <img
            src={product.images[0]}
            alt={product.productName}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h3 className="subtitle mt-2 truncate leading-tight">{product.productName}</h3>

        <div className="flex items-center gap-1 my-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(product.ratings) ? "text-[#FFC633]" : "text-gray-200"}>
              ★
            </span>
          ))}
          <span className="p-text ml-1 !text-black text-sm">{product.ratings}/5</span>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <span className="price-title">${product.discountPrice}</span>
          {product.sellPrice > product.discountPrice && (
            <>
              <span className="price-title !text-black/30 line-through">${product.sellPrice}</span>
              <span className="bg-[#FF3333]/10 text-[#FF3333] px-2 py-1 rounded-full text-[10px] md:text-xs font-medium">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;