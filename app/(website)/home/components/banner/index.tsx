import React from 'react';
import Image from "next/image";
import banner1 from "@/assets/images/banner1.png";

function Banner() {
  return (
    <div className="px-2 pt-10 pb-8">
      <div className="flex flex-wrap">

        <div className="md:basis-1/2 flex
        flex-col justify-center px-4 mb-8 md:mb-0">
          <h1 className="text-6xl/15 font-bold">
            Buy & Sell Digital Assets in The Cryptic
          </h1>
          <p className="text-lg text-gray-500 py-8">
            Coin Cryptic is the easiest, safest, and fastest way to buy & sell crypto asset exchange.
          </p>
          <button
            type="button"
            className="rounded-3xl bg-blue-500
              text-white font-bold py-3 px-6 max-w-max cursor-pointer">
            Get Started Now
          </button>
        </div>

        <div className="md:basis-1/2 px-4">
          <Image src={banner1} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;