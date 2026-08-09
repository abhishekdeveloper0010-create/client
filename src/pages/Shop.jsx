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
    <section className="bg-[#eef9ff] py-8 sm:py-10 md:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-[1850px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Categories Grid */}
        <div
          className="
            grid grid-cols-2
            gap-x-4 gap-y-8
            sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10
            md:grid-cols-3 md:gap-x-8
            lg:grid-cols-4 lg:gap-x-10
            xl:grid-cols-6 xl:gap-x-8
            2xl:grid-cols-6 2xl:gap-x-10
          "
        >
          {categories.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center text-center"
            >
              {/* Category Image Box */}
              <div
                className="
                  flex w-full items-center justify-center
                  overflow-hidden bg-[#006b91]
                  shadow-md transition duration-300
                  hover:-translate-y-2 hover:shadow-xl

                  h-[140px]
                  rounded-[45px_15px_45px_15px]

                  sm:h-[155px]

                  md:h-[170px]
                  md:rounded-[55px_20px_55px_20px]

                  lg:h-[175px]

                  xl:h-[170px]

                  2xl:h-[185px]
                "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    h-auto max-h-[120px]
                    w-auto max-w-[85%]
                    object-contain

                    sm:max-h-[135px]

                    md:max-h-[145px]

                    lg:max-h-[150px]

                    xl:max-h-[150px]

                    2xl:max-h-[160px]
                  "
                />
              </div>

              {/* Category Name */}
              <h2
                className="
                  mt-3 font-bold text-[#0c4a6e]

                  text-xl

                  sm:mt-4 sm:text-2xl

                  md:text-[26px]

                  lg:text-[28px]

                  xl:text-[27px]

                  2xl:text-[30px]
                "
                style={{
                  fontFamily: "Georgia, serif",
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