import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-10">

        {/* Left Content */}
        <div>
          <h1 className="section-title h1 leading-tight mb-6">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>

          <p className="p-text mb-6 max-w-md">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality.
          </p>

          <button className="btn-global mb-10">
            Shop Now
          </button>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            <div>
              <h3 className="text-3xl font-bold">200+</h3>
              <p className="p-text text-sm">International Brands</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">2,000+</h3>
              <p className="p-text text-sm">High-Quality Products</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">30,000+</h3>
              <p className="p-text text-sm">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src="/hero.png"
            alt="Fashion Models"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
