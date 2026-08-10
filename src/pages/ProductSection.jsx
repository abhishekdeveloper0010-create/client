import { Link } from "react-router-dom";

function ProductSection({ products, selectedCategory = "All" }) {
  return (
    <section className="bg-sky-50 p-10">
      <div className="bg-cyan-800 rounded-3xl p-6">
        <div className="mb-8 text-white">
          <h2 className="text-3xl font-bold">Products</h2>
          <p className="pt-2 pb-4 text-[18px] text-slate-100">
            {selectedCategory === "All"
              ? "Browse all products available in the store."
              : `Showing ${selectedCategory} products.`}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-14 text-center text-slate-800">
            <h3 className="text-2xl font-semibold">No products found</h3>
            <p className="mt-3 text-slate-500">
              There are no products available for "{selectedCategory}" right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`}>
                <div className="rounded-lg overflow-hidden hover:scale-105 duration-300 cursor-pointer text-center bg-white h-full flex flex-col justify-between">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                  />

                  <div className="p-4">
                    <h2 className="text-slate-900 text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-slate-500 mt-2">{item.offer}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductSection;
