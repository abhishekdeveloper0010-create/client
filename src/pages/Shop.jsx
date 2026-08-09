import shirts from "../assets/categories/shirts.png";
import dresses from "../assets/categories/dresses.png";
import beauty from "../assets/categories/beauty.png";
import bangles from "../assets/categories/bangles.png";
import shoes from "../assets/categories/shoes.png";
import slippers from "../assets/categories/slippers.png";
import ProductSection from "./ProductSection";

const categories = [
  { name: "Shirts", image: shirts },
  { name: "Dresses", image: dresses },
  { name: "Beauty", image: beauty },
  { name: "Bangles", image: bangles },
  { name: "Shoes", image: shoes },
  { name: "Slippers", image: slippers },
];

function CategorySection() {
  return (
    <section
      className="py-5"
      style={{
        background: "#eef9ff",
        
      }}
    >
      <div className="container-fluid px-5">
        <div
          className="flex justify-content-between align-items-center  gap-20 flex-wrap  "
          style={{
            margin: "0 auto",
            paddingLeft: "35px",
            paddingRight: "35px",
          }}
        >
          {categories.map((item, index) => (
            <div
              key={index}
              className="text-center raounded-2xl "
              style={{
                width: "150px",
              }}
            >
              <div
                className="shadow-sm"
                style={{
                  width: "200px",
                  height: "170px",
                  background: "#006b91",
                  borderRadius: "60px 20px 60px 20px",
                  overflow: "hidden",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    maxWidth: "160px",
                    maxHeight: "160px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <h2
                className="fw-bold mt-4"
                style={{
                  fontFamily: "Georgia",
                  fontSize: "28px",
                }}
              >
                {item.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <ProductSection />
    </section>
  );
}

export default CategorySection;
