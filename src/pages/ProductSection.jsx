import { Link } from "react-router-dom";
import products from "../data/products";

function ProductSection() {
  return (
    <section className="bg-sky-50 p-10">
      <div className="bg-cyan-800 rounded-3xl p-6">
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
      </div>
    </section>
  );
}

export default ProductSection;