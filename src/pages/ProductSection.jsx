import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductSection({ products = [], selectedCategory = "All" }) {
  const imageURL = import.meta.env.VITE_SERVER_IMAGES_URL;

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product) => {
      if (selectedCategory === "All") {
        return true;
      }

      return product.category === selectedCategory;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  return (
    <section className="bg-sky-50 p-10">
      <div className="bg-cyan-800 rounded-3xl p-6">
        {/* =========================
            HEADING
        ========================= */}

        <div className="mb-8 text-white">
          <h2 className="text-3xl font-bold">Products</h2>

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
            <h3 className="text-2xl font-semibold">No products found</h3>

            <p className="mt-3 text-slate-500">
              There are no products available for "{selectedCategory}" right
              now.
            </p>
          </div>
        ) : (
          /* =========================
             PRODUCTS
          ========================= */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => {
              const hasOldPrice =
                item.oldPrice && Number(item.oldPrice) > Number(item.price);

              const discount = hasOldPrice
                ? Math.round(
                    ((Number(item.oldPrice) - Number(item.price)) /
                      Number(item.oldPrice)) *
                      100,
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

                      <p className="text-sm text-slate-500">{item.category}</p>

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
        )}
      </div>
    </section>
  );
}

export default ProductSection;
