import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

import women from "../assets/BestSeller/women.png";
import men from "../assets/BestSeller/men.png";
import hoodie from "../assets/BestSeller/hoodie.png";
import offer from "../assets/BestSeller/offer.png";

function BestSeller() {
  const [liked, setLiked] = useState([false, false, false]);
  return (
    <>
      <div className="bg-[white] py-2 "></div>
      <section className="bg-[#d9f0fb] pb-10">
        <div className="max-w-8xl mx-auto px-8">
          {/* Heading */}
          <h2 className=" text-[50px] font-bold text-[#0c4a6e] mb-12">
            Best Sellers
          </h2>

          <div className="flex flex-col xl:flex-row gap-10">
            {/* Products */}
            <div className="xl:w-[65%]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product 1 */}
                <div className="bg-white rounded-2xl p-4 shadow-md relative text-center">
                  <button
                    onClick={() =>
                      setLiked((prev) => {
                        const updated = [...prev];
                        updated[0] = !updated[0];
                        return updated;
                      })
                    }
                    className="absolute top-6 right-6 text-3xl transition-all duration-300"
                  >
                    <FaHeart
                      className={liked[0] ? "text-red-500" : "text-white"}
                    />
                  </button>

                  <img
                    src={women}
                    alt="Dress"
                    className="w-full h-[380px] object-cover rounded-xl"
                  />

                  <h3 className="text-2xl  font-semibold text-[#0c4a6e] mt-5 pt-5">
                    Elegant Floral Dress
                  </h3>

                  <p className="text-4xl font-bold mt-3">₹2,499</p>
                </div>

                {/* Product 2 */}
                <div className="bg-white rounded-2xl p-4 shadow-md relative text-center">
                  <button
                    onClick={() =>
                      setLiked((prev) => {
                        const updated = [...prev];
                        updated[1] = !updated[1];
                        return updated;
                      })
                    }
                    className="absolute top-6 right-6 text-3xl transition-all duration-300"
                  >
                    <FaHeart
                      className={liked[1] ? "text-red-500" : "text-white"}
                    />
                  </button>

                  <img
                    src={men}
                    alt="Jacket"
                    className="w-full h-[380px] object-cover rounded-xl"
                  />

                  <h3 className="text-2xl font-semibold text-[#0c4a6e] mt-5 pt-5">
                    Casual Denim Jacket
                  </h3>

                  <p className="text-4xl font-bold mt-3">₹1,999</p>
                </div>

                {/* Product 3 */}
                <div className="bg-white rounded-2xl p-4 shadow-md relative text-center">
                  <button
                    onClick={() =>
                      setLiked((prev) => {
                        const updated = [...prev];
                        updated[2] = !updated[2];
                        return updated;
                      })
                    }
                    className="absolute top-6 right-6 text-3xl transition-all duration-300"
                  >
                    <FaHeart
                      className={liked[2] ? "text-red-500" : "text-white"}
                    />
                  </button>

                  <img
                    src={hoodie}
                    alt="Hoodie"
                    className="w-full h-[380px] object-cover rounded-xl"
                  />

                  <h3 className="text-2xl font-semibold text-[#0c4a6e] mt-5 pt-5">
                    Black Hoodie
                  </h3>

                  <p className="text-4xl font-bold mt-3">₹1,499</p>
                </div>
              </div>
              <div className="pt-16"></div>
              {/* View All */}
              <div className="flex justify-center mt-12">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center bg-[#82c2df] border-2 md:border-4 border-white text-white text-base sm:text-xl md:text-3xl px-6 py-3 sm:px-10 sm:py-3 md:px-16 md:py-4 rounded-full hover:bg-white hover:text-sky-700 duration-300"
                >
                  View All <span className="ml-2">➜</span>
                </Link>
              </div>
            </div>

            {/* Offer Banner */}
            <div className="xl:w-[35%]">
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={offer}
                  alt="Offer"
                  className="w-full h-[620px] object-cover"
                />

                <div className="absolute inset-0 bg-[#b97d5b]/35 flex flex-col justify-center items-center text-white text-center px-6 pt-[190px]">
                  <h3 className="text-5xl font-light mb-6">Special Offer</h3>
                  <hr className="w-full  border-t-2 border-white-400  mt-[14px]"></hr>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight pt-2">
                    GET 40% OFF
                  </h2>

                  <p className="text-3xl mt-6 tracking-wide pt-1">
                    YOUR FIRST ORDER
                  </p>
                  <div className="pt-16"></div>
                  <Link
                    to="/shop"
                    className="mt-6 sm:mt-10 md:mt-20 bg-white text-[#8d4b2f] text-base sm:text-xl md:text-2xl lg:text-3xl px-6 py-3 sm:px-8 md:px-10 lg:px-12 md:py-4 rounded-lg md:rounded-xl hover:bg-[#F2E1D8] duration-300 inline-flex items-center justify-center"
                  >
                    Shop Now <span className="pl-2"> ➜</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BestSeller;
