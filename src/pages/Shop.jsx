import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductSection from "./ProductSection";
import api from "../config/api";

function Shop() {
  // =====================================================
  // URL SEARCH PARAMS
  // =====================================================

  const [searchParams] = useSearchParams();

  // =====================================================
  // PRODUCTS
  // =====================================================

  const [products, setProducts] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const [categories, setCategories] = useState([]);

  // =====================================================
  // SELECTED CATEGORY
  // =====================================================

  const [selectedCategory, setSelectedCategory] = useState("All");

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(false);

  // =====================================================
  // ERROR
  // =====================================================

  const [error, setError] = useState("");

  // =====================================================
  // PRODUCTS PER PAGE
  // =====================================================

  const productsPerPage = 8;

  // =====================================================
  // SEARCH TERM
  // =====================================================

  const searchTerm = searchParams.get("search") || "";

  // =====================================================
  // CATEGORY IMAGE URL
  // =====================================================

  const categoryImageUrl =
    import.meta.env.VITE_SERVER_CATEGORY_IMAGE_URL;

  // =====================================================
  // GET PRODUCTS
  // =====================================================

  useEffect(() => {
    document.title = "Shop - Apple Blossom";

    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        // =================================================
        // BACKEND CATEGORY
        // =================================================

        const backendCategory =
          selectedCategory === "All"
            ? ""
            : selectedCategory;

        console.log("Getting products:", {
          page: currentPage,
          limit: productsPerPage,
          search: searchTerm,
          category: backendCategory,
        });

        // =================================================
        // API REQUEST
        // =================================================

        const response = await api.get("/products", {
          params: {
            page: currentPage,
            limit: productsPerPage,
            search: searchTerm,
            category: backendCategory,
          },
        });

        console.log(
          "Products API Response:",
          response.data
        );

        const data = response.data;

        // =================================================
        // PRODUCTS
        // =================================================

        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }

        // =================================================
        // TOTAL PRODUCTS
        // =================================================

        setTotalProducts(
          Number(data.total || 0)
        );

        // =================================================
        // TOTAL PAGES
        // =================================================

        setTotalPages(
          Math.max(
            1,
            Number(data.totalPages || 1)
          )
        );
      } catch (err) {
        console.error(
          "Product API Error:",
          err
        );

        setProducts([]);
        setTotalProducts(0);
        setTotalPages(1);

        setError(
          "Products load nahi ho pa rahe hain."
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [
    currentPage,
    selectedCategory,
    searchTerm,
  ]);

  // =====================================================
  // GET CATEGORIES FROM DATABASE
  // =====================================================

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get(
          "/categories"
        );

        console.log(
          "Categories API Response:",
          response.data
        );

        let categoryData = [];

        // ===============================================
        // RESPONSE FORMAT
        // ===============================================

        if (
          Array.isArray(response.data?.data)
        ) {
          categoryData =
            response.data.data;
        } else if (
          Array.isArray(response.data)
        ) {
          categoryData =
            response.data;
        }

        // ===============================================
        // REMOVE DUPLICATE CATEGORIES
        // ALSO REMOVE "ALL"
        // ===============================================

        const uniqueCategories = [];

        const categoryNames = new Set();

        categoryData.forEach((category) => {
          const name = String(
            category?.name || ""
          ).trim();

          if (!name) {
            return;
          }

          // ---------------------------------------------
          // ALL ko database se ignore karo
          // ---------------------------------------------

          if (
            name.toLowerCase() === "all"
          ) {
            return;
          }

          const key =
            name.toLowerCase();

          // ---------------------------------------------
          // DUPLICATE REMOVE
          // ---------------------------------------------

          if (
            categoryNames.has(key)
          ) {
            return;
          }

          categoryNames.add(key);

          uniqueCategories.push({
            ...category,
            name,
          });
        });

        setCategories(
          uniqueCategories
        );
      } catch (err) {
        console.error(
          "Category API Error:",
          err
        );

        setCategories([]);
      }
    };

    getCategories();
  }, []);

  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (
    category
  ) => {
    const newCategory =
      category || "All";

    console.log(
      "Category changed:",
      newCategory
    );

    setSelectedCategory(
      newCategory
    );

    // ===============================================
    // CATEGORY CHANGE => PAGE 1
    // ===============================================

    setCurrentPage(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePageChange = (
    page
  ) => {
    const nextPage =
      Number(page);

    if (
      !Number.isInteger(nextPage)
    ) {
      return;
    }

    if (
      nextPage < 1 ||
      nextPage > totalPages
    ) {
      return;
    }

    console.log(
      "Page changed:",
      nextPage
    );

    setCurrentPage(
      nextPage
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CATEGORY FILTER BUTTONS
  // =====================================================
  //
  // IMPORTANT:
  // "All" manually add ho raha hai.
  // Database se agar "All" aaye bhi,
  // humne upar remove kar diya hai.
  //
  // Isliye All sirf 1 baar show hoga.
  // =====================================================

  const categoryFilters = [
    "All",
    ...categories
      .map(
        (category) =>
          category.name
      )
      .filter(
        (name) =>
          name &&
          name
            .trim()
            .toLowerCase() !==
            "all"
      ),
  ];

  // =====================================================
  // REMOVE DUPLICATES FROM FILTER BUTTONS
  // =====================================================

  const uniqueCategoryFilters = [
    ...new Set(
      categoryFilters.map(
        (category) =>
          category.trim()
      )
    ),
  ];

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <section className="w-full bg-[#d9f0fb] py-6 sm:py-8 lg:py-10">

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

        {/* =================================================
            CATEGORY CARDS
        ================================================= */}

        {categories.length > 0 && (
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
            {categories.map(
              (item) => {
                const imageUrl =
                  item.image
                    ? `${categoryImageUrl}/${item.image}`
                    : "";

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        item.name
                      )
                    }
                    className={`
                      flex w-full flex-col items-center
                      rounded-3xl border p-4
                      text-center transition duration-300

                      ${
                        selectedCategory ===
                        item.name
                          ? "border-sky-500 bg-sky-100 shadow-lg"
                          : "border-transparent bg-white hover:border-sky-200 hover:shadow-md"
                      }
                    `}
                  >

                    {/* ===================================
                        IMAGE
                    =================================== */}

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
                      {imageUrl ? (
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
                        />
                      ) : (
                        <span className="text-4xl text-white">
                          🛍️
                        </span>
                      )}
                    </div>

                    {/* ===================================
                        CATEGORY NAME
                    =================================== */}

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
                        fontFamily:
                          "Georgia, serif",
                      }}
                    >
                      {item.name}
                    </h2>

                  </button>
                );
              }
            )}
          </div>
        )}

        {/* =================================================
            CATEGORY FILTER BUTTONS
        ================================================= */}

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
          {uniqueCategoryFilters.map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  handleCategoryChange(
                    category
                  )
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
                    selectedCategory ===
                    category
                      ? "bg-sky-700 text-white shadow-md"
                      : "bg-sky-100 text-slate-700 hover:bg-sky-200"
                  }
                `}
              >
                {category}
              </button>
            )
          )}
        </div>

      </div>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <div className="mt-8 w-full">

        {/* =================================================
            ERROR
        ================================================= */}

        {error ? (
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center">

            <p className="font-semibold text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                // Force API reload
                setCurrentPage(
                  (prev) => prev
                );

                // Better retry by changing
                // loading state through a reload
                window.location.reload();
              }}
              className="
                mt-5
                rounded-lg
                bg-cyan-800
                px-6
                py-3
                font-semibold
                text-white
                hover:bg-cyan-950
              "
            >
              Try Again
            </button>

          </div>
        ) : (
          <ProductSection
            products={products}
            selectedCategory={
              selectedCategory
            }
            onCategoryChange={
              handleCategoryChange
            }
            searchTerm={
              searchTerm
            }
            loading={loading}
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            totalProducts={
              totalProducts
            }
            onPageChange={
              handlePageChange
            }
          />
        )}

      </div>

    </section>
  );
}

export default Shop;