import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import products from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(product?.image || "");

  const [selectedSize, setSelectedSize] = useState("M");

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-700">Product Not Found</h1>
      </div>
    );
  }

  // =========================
  // ADD TO CART
  // =========================

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.includes(product.id)) {
      wishlist.push(product.id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistChanged"));
    }
  };

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];
  
    // Har cart item ke liye unique ID
    const cartItemId =
      `${product.id}-${selectedSize}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;
  
    // Same product + same size already cart me hai?
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize
    );
  
    if (existingItem) {
      // Same product + same size hai
      existingItem.quantity += 1;
    } else {
      // Product alag hai ya size alag hai
      cart.push({
        cartItemId: cartItemId,
  
        id: product.id,
        title: product.title,
        description: product.description,
  
        image: selectedImage,
  
        price: product.price,
        oldPrice: product.oldPrice,
        offer: product.offer,
  
        size: selectedSize,
  
        quantity: 1,
      });
    }
  
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* ========================= */}
          {/* LEFT IMAGE SECTION */}
          {/* ========================= */}

          <div>
            {/* Main Image */}

            <div className="bg-gray-100 rounded-2xl p-4 sm:p-6 lg:p-10">
              <img
                src={selectedImage}
                alt={product.title}
                className="
                  w-full
                  h-72
                  sm:h-96
                  lg:h-[550px]
                  object-contain
                "
              />
            </div>

            {/* Thumbnails */}

            <div className="flex gap-3 sm:gap-4 mt-5 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.title}
                  onClick={() => setSelectedImage(img)}
                  className={`
                    flex-shrink-0
                    w-16 h-16
                    sm:w-20 sm:h-20
                    lg:w-24 lg:h-24
                    rounded-xl
                    border-2
                    cursor-pointer
                    object-cover

                    ${
                      selectedImage === img
                        ? "border-sky-600"
                        : "border-gray-200"
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* ========================= */}
          {/* RIGHT DETAILS SECTION */}
          {/* ========================= */}

          <div>
            {/* Product Name */}

            <h1
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                text-gray-800
                font-bold
              "
            >
              {product.title}
            </h1>

            {/* Description */}

            <p
              className="
                text-lg
                sm:text-2xl
                lg:text-3xl
                text-gray-500
                pt-3
              "
            >
              {product.description}
            </p>

            {/* Offer */}

            <div className="flex items-center gap-3 pt-5">
              <span
                className="
                  text-green-600
                  font-bold
                  text-xl
                  sm:text-2xl
                "
              >
                {product.offer}
              </span>

              <span
                className="
                  line-through
                  text-gray-400
                  text-lg
                "
              >
                ₹{product.oldPrice}
              </span>
            </div>

            {/* Price */}

            <h2
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                pt-4
              "
            >
              ₹{product.price}
            </h2>

            {/* ========================= */}
            {/* SIZE */}
            {/* ========================= */}

            <h3
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-semibold
                pt-8
              "
            >
              Select Size
            </h3>

            <div
              className="
                flex
                gap-3
                pt-4
                pb-8
                flex-wrap
              "
            >
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                      w-12 h-12
                      sm:w-14 sm:h-14
                      lg:w-16 lg:h-16
                      rounded-xl
                      border
                      text-lg
                      font-semibold
                      cursor-pointer

                      ${
                        selectedSize === size
                          ? "bg-sky-600 text-white"
                          : "bg-white hover:bg-gray-100"
                      }
                    `}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* ========================= */}
            {/* DELIVERY */}
            {/* ========================= */}

            <div
              className="
                mt-6
                bg-gray-100
                rounded-xl
                p-4
                sm:p-5
              "
            >
              <h3 className="font-bold text-lg sm:text-xl">Delivery Details</h3>

              <p className="text-gray-600 mt-2">Free Delivery Available</p>

              <p className="text-gray-600">Estimated Delivery: 3-5 Days</p>
            </div>

            {/* ========================= */}
            {/* BUTTONS */}
            {/* ========================= */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-4
                pt-8
              "
            >
              <button
                onClick={addToWishlist}
                className="
                  w-full
                  sm:w-1/2
                  border-2
                  border-rose-400
                  text-rose-500
                  py-3
                  sm:py-4
                  cursor-pointer
                  rounded-xl
                  text-lg
                  font-bold
                  hover:bg-rose-50
                "
              >
                Add to Wishlist
              </button>

              <button
                onClick={addToCart}
                className="
                  w-full
                  sm:w-1/2
                  border-2
                  border-sky-600
                  text-sky-600
                  py-3
                  sm:py-4
                  cursor-pointer
                  rounded-xl
                  text-lg
                  font-bold
                  hover:bg-sky-50
                "
              >
                Add to Cart
              </button>

              <button
                className="
                  w-full
                  sm:w-1/2
                  bg-sky-600
                  text-white
                  py-3
                  sm:py-4
                  rounded-xl
                  cursor-pointer
                  text-lg
                  font-bold
                  hover:bg-sky-700
                "
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
