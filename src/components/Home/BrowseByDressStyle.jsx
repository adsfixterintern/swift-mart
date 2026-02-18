import Image from "next/image";

export default function BrowseByDressStyle() {
  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-primary rounded-[40px] p-10 md:p-14">
          <h2 className="section-title font-extrabold text-center mb-14">
            BROWSE BY DRESS STYLE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Casual (smaller) */}

            <div className="relative md:col-span-5 h-[260px] rounded-3xl overflow-hidden bg-white">
              {/* Image */}
              <Image
                src="/BrowseStyle/casual.png"
                alt="Casual"
                fill
                className="object-cover object-right scale-[1.7] translate-x-52"
              />

              {/* Text */}
              <h3 className="absolute top-6 left-6 text-xl font-semibold z-10">
                Casual
              </h3>
            </div>

            {/* Formal (bigger) */}
            <div className="relative md:col-span-7 h-[260px] rounded-3xl overflow-hidden bg-white">
              <Image
                src="/BrowseStyle/formal.png"
                alt="Formal"
                fill
                className="object-cover object-right scale-[1.6] translate-x-65 translate-y-16"
              />
              <h3 className="absolute top-6 left-6 text-xl font-semibold">
                Formal
              </h3>
            </div>

            {/* Party (bigger) */}
            <div className="relative md:col-span-7 h-[260px] rounded-3xl overflow-hidden bg-white">
              <Image
                src="/BrowseStyle/party.png"
                alt="Party"
                fill
                className="object-cover object-right scale-[1.3] translate-x-12"
              />
              <h3 className="absolute top-6 left-6 text-xl font-semibold">
                Party
              </h3>
            </div>

            {/* Gym (smaller) */}
            <div className="relative md:col-span-5 h-[260px] rounded-3xl overflow-hidden bg-white">
              <Image
                src="/BrowseStyle/gym.png"
                alt="Gym"
                fill
                className="object-cover object-right scale-[1.0] translate-x-12 "
              />
              <h3 className="absolute top-6 left-6 text-xl font-semibold">
                Gym
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
