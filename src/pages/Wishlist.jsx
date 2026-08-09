import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    const items = products.filter((product) => stored.includes(product.id));
    setWishlistItems(items);
  }, []);

  const removeFromWishlist = (productId) => {
    const updated = wishlistItems.filter((item) => item.id !== productId);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated.map((item) => item.id)));
    window.dispatchEvent(new Event("wishlistChanged"));
  };

  return (
    <section className="min-h-screen bg-[linear-gradient(135deg,#f5fbff_0%,#eef9ff_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Wishlist</p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Your saved favorites</h1>
          </div>
          <p className="text-sm text-slate-600">Products you loved will appear here for quick access.</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-10">
            <p className="text-lg text-slate-600">No items saved yet.</p>
            <Link to="/shop" className="mt-4 inline-flex rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {wishlistItems.map((item) => (
              <div key={item.id} className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.title} className="h-56 w-full rounded-[24px] object-cover sm:h-64" />
                </Link>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                    <p className="mt-2 text-sm text-slate-500">{item.offer}</p>
                  </div>
                  <button onClick={() => removeFromWishlist(item.id)} className="rounded-full bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100">
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
