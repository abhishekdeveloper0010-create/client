import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductSection({ products = [], selectedCategory = "All" }) {
  const imageURL = import.meta.env.VITE_SERVER_IMAGES_URL;

  const [filteredProducts, setFilteredProducts] = useState(products);

  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const filtered = products.filter((product) => {
      if (selectedCategory === "All") {
        return true;
      }

      return product.category === selectedCategory;
    });

    setFilteredProducts(filtered);

    // Category change hone par first page
    setCurrentPage(1);
  }, [products, selectedCategory]);

  // =========================
  // PAGINATION CALCULATION
  // =========================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const lastProductIndex = currentPage * productsPerPage;

  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex
  );

  // =========================
  // PAGE CHANGE
  // =========================

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Product change hone par top par chale jaye
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-sky-50 p-10">
      <div className="bg-cyan-800 rounded-3xl p-6">

        {/* =========================
            HEADING
        ========================= */}

        <div className="mb-8 text-white">
          <h2 className="text-3xl font-bold">
            Products
          </h2>

          <p className="pt-2 pb-4 text-[18px] text-slate-100">
            {selectedCategory === "All"
              ? "Browse all products available in the store."
              : `Showing ${selectedCategory} products.`}
          </p>
        </div>

        {/* =========================
            NO PRODUCTS
        ========================= */}

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-14 text-center text-slate-800">
            <h3 className="text-2xl font-semibold">
              No products found
            </h3>

            <p className="mt-3 text-slate-500">
              There are no products available for "{selectedCategory}"
              right now.
            </p>
          </div>
        ) : (
          <>
            {/* =========================
                PRODUCTS
            ========================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((item) => {
                const hasOldPrice =
                  item.oldPrice &&
                  Number(item.oldPrice) > Number(item.price);

                const discount = hasOldPrice
                  ? Math.round(
                      ((Number(item.oldPrice) -
                        Number(item.price)) /
                        Number(item.oldPrice)) *
                        100
                    )
                  : 0;

                return (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="block"
                  >
                    <div className="rounded-lg overflow-hidden hover:scale-105 duration-300 cursor-pointer text-center bg-white h-full flex flex-col justify-between">

                      {/* IMAGE */}

                      <img
                        src={`${imageURL}/${item.image}`}
                        alt={item.name}
                        className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                      />

                      {/* PRODUCT INFO */}

                      <div className="p-4">

                        {/* CATEGORY */}

                        <p className="text-sm text-slate-500">
                          {item.category}
                        </p>

                        {/* NAME */}

                        <h2 className="text-slate-900 text-xl font-semibold mt-1">
                          {item.name}
                        </h2>

                        {/* PRICE */}

                        <div className="flex items-center justify-center gap-3 mt-3">
                          <span className="text-lg font-bold text-slate-900">
                            ₹{item.price}
                          </span>

                          {hasOldPrice && (
                            <span className="text-slate-400 line-through">
                              ₹{item.oldPrice}
                            </span>
                          )}
                        </div>

                        {/* OFFER */}

                        {hasOldPrice && (
                          <p className="text-green-600 font-semibold mt-2">
                            {item.offer || `${discount}% OFF`}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
<br/><br/>
            {/* =========================
                PAGINATION
            ========================= */}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">

                {/* PREVIOUS */}

                <button
                  onClick={() =>
                    handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    currentPage === 1
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-white text-cyan-800 hover:bg-cyan-100"
                  }`}
                >
                  Previous
                </button>

                {/* PAGE NUMBERS */}

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() =>
                      handlePageChange(pageNumber)
                    }
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      currentPage === pageNumber
                        ? "bg-cyan-950 text-white"
                        : "bg-white text-cyan-800 hover:bg-cyan-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                {/* NEXT */}

                <button
                  onClick={() =>
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    currentPage === totalPages
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-white text-cyan-800 hover:bg-cyan-100"
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            {/* =========================
                PAGE INFO
            ========================= */}

            <p className="text-center text-white pt-4">
              Page {currentPage} of {totalPages}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductSection;