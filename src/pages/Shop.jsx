import { useState, useEffect } from "react";

import ProductSection from "./ProductSection";
import api from "../config/api";

function Shop() {
  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] = useState([]);

  // ==========================================
  // CATEGORIES
  // ==========================================

  const [categories, setCategories] = useState([]);

  // ==========================================
  // SELECTED CATEGORY
  // ==========================================

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // ==========================================
  // CATEGORY IMAGE URL
  // ==========================================

  const categoryImageUrl =
    import.meta.env.VITE_SERVER_CATEGORY_IMAGE_URL;

  // ==========================================
  // DEBUG
  // ==========================================

  console.log(
    "Category Image Base URL:",
    categoryImageUrl
  );

  // ==========================================
  // GET PRODUCTS + CATEGORIES
  // ==========================================

  useEffect(() => {
    document.title = "Shop - Apple Blossom";

    // ========================================
    // GET PRODUCTS
    // ========================================

    api
      .get("/products")
      .then((response) => {
        console.log(
          "Products from API:",
          response.data
        );

        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error(
          "Product API Error:",
          error
        );

        setProducts([]);
      });

    // ========================================
    // GET CATEGORIES
    // ========================================

    api
      .get("/categories")
      .then((response) => {
        console.log(
          "Categories from API:",
          response.data
        );

        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error(
          "Category API Error:",
          error
        );

        setCategories([]);
      });
  }, []);

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  // ==========================================
  // CATEGORY FILTER BUTTONS
  // ==========================================

  const categoryFilters = [
    "All",
    ...categories.map(
      (category) => category.name
    ),
  ];

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <section className="w-full bg-[#d9f0fb] py-6 sm:py-8 lg:py-10">

      {/* ======================================
          MAIN CONTAINER
      ====================================== */}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

        {/* ====================================
            CATEGORY CARDS
        ==================================== */}

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

          {categories.map((item) => {

            // ==================================
            // IMAGE URL
            // ==================================

            const imageUrl =
              `${categoryImageUrl}/${item.image}`;

            console.log(
              "Category:",
              item.name
            );

            console.log(
              "Category Image:",
              imageUrl
            );

            return (
              <button
                key={item.id}
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

                {/* ==================================
                    CATEGORY IMAGE
                ================================== */}

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
                    src={imageUrl}
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
                    onError={(event) => {
                      console.error(
                        "IMAGE LOAD ERROR:",
                        imageUrl
                      );
                    }}
                  />

                </div>

                {/* ==================================
                    CATEGORY NAME
                ================================== */}

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
            );
          })}

        </div>

        {/* ====================================
            CATEGORY FILTER BUTTONS
        ==================================== */}

        <div
          className="
            flex w-full
            flex-wrap
            justify-center
            gap-3
            pt-10
            pb-8
          "
        >

          {categoryFilters.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                rounded-full
                px-5
                py-3
                text-sm
                font-semibold
                transition
                duration-300

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

      {/* ======================================
          PRODUCTS
      ====================================== */}

      <div className="mt-8 w-full">

        <ProductSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
        />

      </div>

    </section>
  );
}

export default Shop;