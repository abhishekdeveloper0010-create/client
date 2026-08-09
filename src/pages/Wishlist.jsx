import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

function Wishlist() {
const [wishlistItems, setWishlistItems] = useState([]);

useEffect(() => {
const stored = JSON.parse(localStorage.getItem("wishlist")) || [];

 
const items = products.filter((product) =>
  stored.includes(product.id)
);

setWishlistItems(items);
 

}, []);

const removeFromWishlist = (productId) => {
const updated = wishlistItems.filter(
(item) => item.id !== productId
);

 
setWishlistItems(updated);

localStorage.setItem(
  "wishlist",
  JSON.stringify(updated.map((item) => item.id))
);

window.dispatchEvent(new Event("wishlistChanged"));
 

};

return ( <section className="min-h-screen w-full bg-[#f5fbff] py-10 sm:py-14 lg:py-20"> <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 2xl:px-20">

 
    {/* Heading */}
    <div className="mb-8 text-center sm:mb-12">
      <h1 className="text-3xl font-bold text-[#0c4a6e] sm:text-4xl lg:text-5xl xl:text-[55px]">
        Wishlist
      </h1>

      <p className="mt-3   text-base text-slate-600 sm:text-lg lg:text-xl">
        Your saved favorites
      </p>

      <p className="mx-auto pt-3 pb-4  text-1sm leading-6 text-slate-500 sm:text-base sm:leading-7 text-center">
        Products you loved will appear here for quick access.
      </p>
    </div>

    {wishlistItems.length === 0 ? (
      /* Empty Wishlist */
      <div className="w-full rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:rounded-[32px] sm:p-10">
        <p className="text-base text-slate-600 sm:text-lg">
          No items saved yet.
        </p>

        <Link
          to="/shop"
          className="mt-4 inline-flex rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          Explore Products
        </Link>
      </div>
    ) : (
      /* Wishlist Products */
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="w-full rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-[28px]"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full rounded-[20px] object-cover sm:h-56 lg:h-64"
              />
            </Link>

            <div className="pt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {item.offer}
                </p>
              </div>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="shrink-0 rounded-full bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
 

);
}

export default Wishlist;
