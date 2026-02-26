

import React from "react";

function Hero() {
  return (
    <div
      className="
        relative
        w-full
        /* Mobile: Full height, Desktop: Fixed height */
        h-screen
        lg:h-[663px]
        max-w-7xl
        mx-auto
        bg-[#F2F0F1]
        /* Background Logic */
        bg-[url('https://i.ibb.co/gbfRkrWw/Rectangle-2-2.png')]
        lg:bg-[url('https://i.ibb.co/WvsQdXS9/Rectangle-2.png')]
        bg-no-repeat
        bg-bottom
        lg:bg-right-bottom
        /* Mobile: Image width 100%, Desktop: Cover */
        bg-[length:100%_auto]
        lg:bg-cover
        flex
        flex-col
        lg:flex-row
        items-start
        lg:items-center
        px-4
        lg:px-16
        pt-10
        lg:pt-0
        overflow-hidden
      "
    >
      {/* Content Section */}
      <div className="max-w-xl z-10">
        <h1 className="text-[36px] sm:text-5xl lg:text-7xl font-black leading-[1.1] mb-4 tracking-tighter">
          FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
        </h1>

        <p className="text-black/60 text-sm sm:text-base mb-6 max-w-[500px]">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>

        <button className="bg-black text-white px-14 py-4 rounded-full mb-8 w-full sm:w-auto font-medium hover:bg-black/80 transition-all">
          Shop Now
        </button>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:flex gap-4 lg:gap-8 pb-10 lg:pb-0">
          <div className="border-r border-black/10 lg:border-none pr-4">
            <h3 className="text-2xl lg:text-4xl font-bold">200+</h3>
            <p className="text-[10px] lg:text-sm text-black/60 uppercase">
              International Brands
            </p>
          </div>
          <div className="lg:border-none">
            <h3 className="text-2xl lg:text-4xl font-bold">2,000+</h3>
            <p className="text-[10px] lg:text-sm text-black/60 uppercase">
              High-Quality Products
            </p>
          </div>
          <div className="col-span-2 lg:col-auto text-center lg:text-left pt-2 lg:pt-0">
            <h3 className="text-2xl lg:text-4xl font-bold">30,000+</h3>
            <p className="text-[10px] lg:text-sm text-black/60 uppercase">
              Happy Customers
            </p>
          </div>
        </div>
      </div>

      {/* --- Vector Icons --- */}

      {/* Boro Star  */}
      <img
        className="absolute 
          right-6 top-[55%] w-14
          md:top-20 md:right-10 md:w-24 
          lg:top-14 lg:right-16"
        src="https://i.ibb.co/tMHgfdFG/Vector-1.png"
        alt="star-large"
      />

      {/* Choto Star */}
      <img
        className="absolute 
          left-6 top-[68%] w-8
          md:top-1/2 md:left-[55%] md:w-12
          lg:top-[45%] lg:left-[50%]"
        src="https://i.ibb.co/LDh4WbVD/Vector.png"
        alt="star-small"
      />
    </div>
  );
}

export default Hero;
