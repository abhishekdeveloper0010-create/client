import kurta from "../assets/ShopProducts/kurta.png";
import saree from "../assets/ShopProducts/saree.png";
import tasrika from "../assets/ShopProducts/tasrika.png";
import campus from "../assets/ShopProducts/campus.png";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    image: kurta,
    title: "Cotton Kurta",
    offer: "Min. 40% off",
    description: "Women's Pure Cotton Printed Kurta",
  },
  {
    id: 2,
    image: saree,
    title: "Sarees",
    offer: "Min. 35% off",
    description: "Women's Elegant Silk Saree",
  },
  {
    id: 3,
    image: tasrika,
    title: "Tasrika",
    offer: "Min. 50% off",
    description: "Women's Elegant Designer Kurta Set",
  },
  {
    id: 4,
    image: campus,
    title: "shirt",
    offer: "Min. 70% off",
    description: "Men's Long Sleeve Cotton Shirt",
  },
];

function ProductSection() {
  return (
    <section className="bg-sky-50 p-10">
      <div className="bg-cyan-800 rounded-3xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`}>
              <div className="rounded-lg overflow-hidden hover:scale-105 duration-300 cursor-pointer text-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full  object-cover"
                />

                <div className="p-4">
                  <h2 className="text-white text-xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="text-white mt-2">{item.offer}</p>
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