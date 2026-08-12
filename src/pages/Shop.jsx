import { useState, useEffect } from "react";
import Axios from "axios";

import shirts from "../assets/categories/shirts.png";
import dresses from "../assets/categories/dresses.png";
import beauty from "../assets/categories/beauty.png";
import bangles from "../assets/categories/bangles.png";
import shoes from "../assets/categories/shoes.png";
import slippers from "../assets/categories/slippers.png";

import ProductSection from "./ProductSection";
import api from "../config/api";


const categories = [
  {
    name: "Shirts",
    image: shirts,
  },
  {
    name: "Dresses",
    image: dresses,
  },
  {
    name: "Beauty",
    image: beauty,
  },
  {
    name: "Bangles",
    image: bangles,
  },
  {
    name: "Shoes",
    image: shoes,
  },
  {
    name: "Slippers",
    image: slippers,
  },
];


function Shop() {

  // ==============================
  // PRODUCTS
  // ==============================

  const [products, setProducts] = useState([]);


  // ==============================
  // SELECTED CATEGORY
  // ==============================

  const [selectedCategory, setSelectedCategory] =
    useState("All");


  // ==============================
  // GET PRODUCTS FROM BACKEND
  // ==============================

  useEffect(() => {

    document.title = "Shop - Apple Blossom";


    api.get(
      `/products`
    )

      .then((response) => {

        console.log(
          "Products from API:",
          response.data
        );


        // Agar API directly array return karti hai
        setProducts(response.data.data);

      })

      .catch((error) => {

        console.log(
          "Error fetching products:",
          error
        );

      });

  }, []);


  // ==============================
  // FILTER PRODUCTS
  // ==============================

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );


  // ==============================
  // CATEGORY FILTERS
  // ==============================

  const categoryFilters = [
    "All",
    ...categories.map(
      (item) => item.name
    ),
  ];


  return (

    <section className="w-full bg-[#d9f0fb] py-6 sm:py-8 lg:py-10">

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">


        {/* ============================== */}
        {/* CATEGORY CARDS */}
        {/* ============================== */}

        <div
          className="
            grid w-full
            grid-cols-1
            gap-5

            sm:grid-cols-2
            sm:gap-6

            md:grid-cols-3
            md:gap-7

            lg:grid-cols-6
            lg:gap-6

            xl:grid-cols-6
            xl:gap-8

            2xl:grid-cols-6
            2xl:gap-12
          "
        >

          {categories.map((item) => (

            <button
              key={item.name}
              type="button"
              onClick={() =>
                setSelectedCategory(item.name)
              }
              className={`
                flex w-full flex-col items-center
                rounded-3xl border p-4
                text-center transition duration-300

                ${
                  selectedCategory === item.name
                    ? "border-sky-500 bg-sky-100 shadow-lg"
                    : "border-transparent bg-white hover:border-sky-200 hover:shadow-md"
                }
              `}
            >

              <div
                className="
                  flex w-full items-center justify-center
                  overflow-hidden bg-[#006b91] shadow-md

                  h-[140px]
                  rounded-[45px_15px_45px_15px]

                  sm:h-[155px]

                  md:h-[170px]

                  lg:h-[175px]
                  lg:rounded-[55px_20px_55px_20px]

                  xl:h-[190px]

                  2xl:h-[220px]
                "
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    h-auto w-auto max-w-[80%]
                    object-contain

                    max-h-[110px]

                    sm:max-h-[120px]

                    md:max-h-[135px]

                    lg:max-h-[140px]

                    xl:max-h-[150px]

                    2xl:max-h-[175px]
                  "
                />

              </div>


              <h2
                className="
                  pt-3 font-bold text-[#0c4a6e]

                  text-xl

                  sm:text-2xl

                  md:text-[26px]

                  lg:text-[26px]

                  xl:text-[28px]

                  2xl:text-[30px]
                "
                style={{
                  fontFamily: "Georgia, serif",
                }}
              >
                {item.name}
              </h2>

            </button>

          ))}

        </div>


        {/* ============================== */}
        {/* CATEGORY FILTER BUTTONS */}
        {/* ============================== */}

        <div className="pt-10 pb-8 flex w-full flex-wrap justify-center gap-3">

          {categoryFilters.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                rounded-full px-5 py-3
                text-sm font-semibold
                transition duration-300

                ${
                  selectedCategory === category
                    ? "bg-sky-700 text-white"
                    : "bg-sky-100 text-slate-700 hover:bg-sky-200"
                }
              `}
            >
              {category}
            </button>

          ))}

        </div>

      </div>


      {/* ============================== */}
      {/* PRODUCTS */}
      {/* ============================== */}

      <div className="w-full mt-8">
          
        <ProductSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
        />

      </div>

    </section>

  );
}


export default Shop;