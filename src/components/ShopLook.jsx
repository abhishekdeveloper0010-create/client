import { Link } from "react-router-dom";

import women from "../assets/ShopLook/women.png";
import hat from "../assets/ShopLook/hat.png";
import glasses from "../assets/ShopLook/glasses.png";
import bag from "../assets/ShopLook/bag.png";

import man from "../assets/ShopLook/man.png";
import wallet from "../assets/ShopLook/wallet.png";
import shoes from "../assets/ShopLook/shoes.png";
import neekchan from "../assets/ShopLook/neekchan.png";

import facewash from "../assets/ShopLook/facewash.png";
import tea from "../assets/ShopLook/tea.png";
import cream from "../assets/ShopLook/cream.png";

function ShopTheLook() {
  return (
    <>
      <div className="bg-white py-2 "></div>

      <section className="bg-[#d9f0fb]  pb-12">
        <div className="max-w-[1800px] mx-auto px-8">

          {/* Heading */}
          <h2 className="text-[50px] font-bold text-[#0c4a6e] mb-12 pb-6">
            Shop the Look
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ================= CARD 1 ================= */}

            <div className="bg-white rounded-2xl p-4 shadow-md">

              <div className="grid grid-cols-2 gap-3">

                <img
                  src={women}
                  alt=""
                  className="rounded-xl w-full h-[420px] object-cover"
                />

                <div className="flex flex-col gap-3">

                  <img
                    src={hat}
                    alt=""
                    className="rounded-xl h-[130px] object-cover"
                  />

                  <img
                    src={glasses}
                    alt=""
                    className="rounded-xl h-[130px] object-cover"
                  />

                  <img
                    src={bag}
                    alt=""
                    className="rounded-xl h-[145px] object-cover"
                  />

                </div>

              </div>

              <h3 className="text-4xl font-bold text-[#0c4a6e] mt-6 text-center uppercase pt-8">
                Summer Brunch
              </h3>

              <p className="text-center text-xl text-[#0c4a6e] mt-2  ">
                Everything you need for a stylish day out
              </p>
              <div className="pt-6"></div>
              <div className="flex justify-center mt-8">
             
              <Link
  to="/shop"
  className="inline-flex items-center justify-center bg-[#E59C74] text-white text-base sm:text-lg md:text-xl lg:text-2xl px-5 py-3 sm:px-7 sm:py-3 md:px-8 md:py-4 lg:px-10 rounded-xl md:rounded-2xl hover:bg-[#d8875e] duration-300"
>
  Shop the Look <span className="ml-2">➜</span>
</Link>

              </div>

            </div>

            {/* ================= CARD 2 ================= */}

            <div className="bg-white rounded-2xl p-4 shadow-md">

              <div className="grid grid-cols-2 gap-3">

                <img
                  src={man}
                  alt=""
                  className="rounded-xl w-full h-[420px] object-cover"
                />

                <div className="flex flex-col gap-3">

                  <img
                    src={wallet}
                    alt=""
                    className="rounded-xl h-[95px] object-cover"
                  />

                  <img
                    src={shoes}
                    alt=""
                    className="rounded-xl h-[160px] object-cover"
                  />

                  <img
                    src={neekchan}
                    alt=""
                    className="rounded-xl h-[145px] object-cover"
                  />

                </div>

              </div>

              <h3 className="text-4xl font-bold text-[#0c4a6e] mt-6 text-center uppercase pt-8">
                Business Casual
              </h3>

              <p className="text-center text-xl text-[#0c4a6e] mt-2">
                Reimagined comfort for the modern workplace
              </p>
              <div className="pt-6"></div>
              <div className="flex justify-center mt-8">

              <Link
  to="/shop"
  className="inline-flex items-center justify-center bg-[#E59C74] text-white text-base sm:text-lg md:text-xl lg:text-2xl px-5 py-3 sm:px-7 sm:py-3 md:px-8 md:py-4 lg:px-10 rounded-xl md:rounded-2xl hover:bg-[#d8875e] duration-300"
>
  Shop the Look
  <span className="ml-2">➜</span>
</Link>

              </div>

            </div>

            {/* ================= CARD 3 ================= */}

            <div className="bg-white rounded-2xl p-4 shadow-md">

              <div className="grid grid-cols-2 gap-3">

                <img
                  src={facewash}
                  alt=""
                  className="rounded-xl w-full h-[420px] object-cover"
                />

                <div className="flex flex-col gap-3">

                  <img
                    src={tea}
                    alt=""
                    className="rounded-xl h-[200px] object-cover"
                  />

                  <img
                    src={cream}
                    alt=""
                    className="rounded-xl h-[205px] object-cover"
                  />

                </div>

              </div>

              <h3 className="text-4xl font-bold text-[#0c4a6e] mt-6 text-center pt-8">
                Face Wash Oily Skin
              </h3>

              <p className="text-center text-xl text-[#0c4a6e] mt-2">
                Vitamue Tea Tree Face Wash
              </p>
              <div className="pt-6"></div>
              <div className="flex justify-center mt-8">

              <Link
  to="/shop"
  className="inline-flex items-center justify-center bg-[#E59C74] text-white
             text-sm sm:text-base md:text-xl lg:text-2xl
             px-4 sm:px-6 md:px-8 lg:px-10
             py-2 sm:py-3 md:py-4
             rounded-xl md:rounded-2xl
             hover:bg-[#d8875e] duration-300"
>
  Shop the Look
  <span className="ml-2">➜</span>
</Link>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default ShopTheLook;