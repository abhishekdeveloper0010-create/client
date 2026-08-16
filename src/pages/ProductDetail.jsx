import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  // =========================
  // URL PARAMETER
  // =========================

  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // ENV VARIABLES
  // =========================

  const API_URL = import.meta.env.VITE_SERVER_API_URL;
  const IMAGE_URL = import.meta.env.VITE_SERVER_IMAGES_URL;

  // =========================
  // STATES
  // =========================

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // =========================
  // GET PRODUCT FROM SERVER
  // =========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        console.log("Product from server:", data);
        console.log("Stock:", data.stock);

        setProduct(data);

        // =========================
        // MAIN IMAGE
        // =========================

        if (data.image) {
          setSelectedImage(data.image);
        }

        // =========================
        // SIZE
        // =========================

        if (data.sizes) {
          let sizes = data.sizes;

          if (typeof sizes === "string") {
            try {
              sizes = JSON.parse(sizes);
            } catch {
              sizes = sizes
                .split(",")
                .map((size) => size.trim())
                .filter(Boolean);
            }
          }

          if (Array.isArray(sizes) && sizes.length > 0) {
            setSelectedSize(
              typeof sizes[0] === "object" ? sizes[0].size : sizes[0],
            );
          }
        }
      } catch (error) {
        console.error("Product fetch error:", error);

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  // =========================
  // IMAGE URL
  // =========================

  const getImageURL = (image) => {
    if (!image) {
      return "";
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${IMAGE_URL}/${image}`;
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <h2 className="text-2xl font-bold text-gray-700">Loading product...</h2>
      </div>
    );
  }

  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50">
        <h1 className="text-3xl font-bold text-gray-700">Product Not Found</h1>

        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="
            mt-6
            bg-sky-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:bg-sky-700
          "
        >
          Back to Shop
        </button>
      </div>
    );
  }

  // =========================
  // PRODUCT NAME
  // =========================

  const productName = product.title || product.name || "Product";

  // =========================
  // OLD PRICE
  // =========================

  const oldPrice = product.oldPrice || product.old_price;

  // =========================
  // PRODUCT IMAGES
  // =========================

  let productImages = [];

  if (product.images) {
    if (Array.isArray(product.images)) {
      productImages = product.images;
    } else {
      try {
        productImages = JSON.parse(product.images);
      } catch {
        productImages = product.images
          .split(",")
          .map((image) => image.trim())
          .filter(Boolean);
      }
    }
  }

  // Agar database me sirf image field hai
  if (product.image && productImages.length === 0) {
    productImages = [product.image];
  }

  // =========================
  // PRODUCT SIZES
  // =========================

  let productSizes = [];

  if (product.sizes) {
    if (Array.isArray(product.sizes)) {
      productSizes = product.sizes;
    } else {
      try {
        productSizes = JSON.parse(product.sizes);
      } catch {
        productSizes = product.sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean);
      }
    }
  }

  // =========================
  // USER
  // =========================

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  // =========================
  // LOGIN
  // =========================

  const askLogin = () => {
    alert("Please login or register first.");

    navigate("/login");
  };

  // =========================
  // WISHLIST
  // =========================

  const addToWishlist = () => {
    const user = getCurrentUser();

    if (!user) {
      askLogin();
      return;
    }

    let wishlist = [];

    try {
      wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      wishlist = [];
    }

    // Old wishlist format agar IDs me hai
    // to unko safely remove/ignore karenge
    wishlist = wishlist.filter(
      (item) => item && typeof item === "object" && item.id !== undefined,
    );

    // Check duplicate
    const alreadyExists = wishlist.some(
      (item) => Number(item.id) === Number(product.id),
    );

    if (alreadyExists) {
      alert("Product already in wishlist.");
      return;
    }

    // Complete product object save hoga
    const wishlistProduct = {
      id: product.id,
      title: productName,
      name: productName,
      description: product.description || "",
      image: selectedImage || product.image || "",
      images: productImages,
      price: product.price || 0,
      oldPrice: oldPrice || 0,
      offer: product.offer || "",
      category: product.category || "",
      brand: product.brand || "",
      rating: product.rating || "",
    };

    wishlist.push(wishlistProduct);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Header / Wishlist page ko update signal
    window.dispatchEvent(new Event("wishlistChanged"));

    alert("Product added to wishlist!");
  };

  // =========================
  // SIZE CHECK
  // =========================

  const checkSize = () => {
    if (productSizes.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return false;
    }

    return true;
  };

  // =========================
  // STOCK CHECK
  // =========================

  const checkStock = () => {
    if (Number(product.stock) <= 0) {
      alert("Product is out of stock.");
      return false;
    }

    return true;
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = () => {
    const user = getCurrentUser();

    if (!user) {
      askLogin();
      return;
    }

    // Size check
    if (!checkSize()) {
      return;
    }

    // Stock check
    if (!checkStock()) {
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) =>
        Number(item.id) === Number(product.id) && item.size === selectedSize,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        cartItemId: `${product.id}-${selectedSize}-${Date.now()}`,

        id: product.id,

        title: productName,

        name: productName,

        description: product.description,

        image: selectedImage,

        price: product.price,

        oldPrice: oldPrice,

        offer: product.offer,

        category: product.category,

        size: selectedSize,

        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartChanged"));

    navigate("/cart");
  };

  // =========================
  // BUY NOW
  // =========================

  const buyNow = () => {
    const user = getCurrentUser();

    if (!user) {
      askLogin();
      return;
    }

    // Size check
    if (!checkSize()) {
      return;
    }

    // Stock check
    if (!checkStock()) {
      return;
    }

    const checkoutProduct = {
      id: product.id,
      title: productName,
      name: productName,
      description: product.description,
      image: selectedImage,
      price: product.price,
      oldPrice: oldPrice,
      offer: product.offer,
      category: product.category,
      size: selectedSize,
      quantity: 1,
    };

    localStorage.setItem("buyNowProduct", JSON.stringify(checkoutProduct));

    navigate("/checkout");
  };

  // =========================
  // DISABLE BUTTON
  // =========================

  const outOfStock = Number(product.stock) <= 0;

  // =========================
  // JSX
  // =========================

  return (
    <div className="min-h-screen bg-sky-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-5 sm:p-7 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* =========================
                LEFT SIDE
            ========================= */}

            <div>
              {/* MAIN IMAGE */}

              <div className="bg-gray-100 rounded-3xl p-4 sm:p-6">
                {selectedImage ? (
                  <img
                    src={getImageURL(selectedImage)}
                    alt={productName}
                    className="
                      w-full
                      h-72
                      sm:h-96
                      lg:h-[550px]
                      object-contain
                      rounded-2xl
                    "
                  />
                ) : (
                  <div
                    className="
                      h-72
                      sm:h-96
                      lg:h-[550px]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}

              {productImages.length > 0 && (
                <div
                  className="
                    flex
                    gap-3
                    pt-5
                    overflow-x-auto
                    pb-2
                  "
                >
                  {productImages.map((image, index) => (
                    <img
                      key={index}
                      src={getImageURL(image)}
                      alt={`${productName} ${index + 1}`}
                      onClick={() => setSelectedImage(image)}
                      className={`
                          flex-shrink-0
                          w-20
                          h-20
                          sm:w-24
                          sm:h-24
                          object-cover
                          rounded-xl
                          border-2
                          cursor-pointer
                          ${
                            selectedImage === image
                              ? "border-sky-600"
                              : "border-gray-200"
                          }
                        `}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* =========================
                RIGHT SIDE
            ========================= */}

            <div>
              {/* CATEGORY */}

              {product.category && (
                <p className="text-gray-500 text-lg">
                  Category:{" "}
                  <span className="font-semibold">{product.category}</span>
                </p>
              )}

              {/* TITLE */}

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-gray-800
                  pt-2
                "
              >
                {productName}
              </h1>

              {/* DESCRIPTION */}

              {product.description && (
                <p
                  className="
                    pt-4
                    text-gray-600
                    text-lg
                    leading-7
                  "
                >
                  {product.description}
                </p>
              )}

              {/* BRAND */}

              {product.brand && (
                <p className="text-gray-500 pt-3">
                  Brand: <span className="font-semibold">{product.brand}</span>
                </p>
              )}

              {/* RATING */}

              {product.rating && (
                <p
                  className="
                    mt-3
                    text-gray-700
                    font-semibold
                  "
                >
                  ⭐ {product.rating}
                </p>
              )}

              {/* PRICE */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  pt-6
                  pb-4
                "
              >
                <span
                  className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    text-gray-900
                  "
                >
                  ₹{product.price}
                </span>

                {oldPrice && (
                  <span
                    className="
                      text-xl
                      text-gray-400
                      line-through
                    "
                  >
                    ₹{oldPrice}
                  </span>
                )}
              </div>

              {/* OFFER */}

              {product.offer && (
                <div
                  className="
                    mt-3
                    inline-block
                    bg-green-100
                    text-green-700
                    px-4
                    py-2
                    rounded-lg
                    font-bold
                  "
                >
                  {product.offer}
                </div>
              )}

              {/* SIZE */}

              {productSizes.length > 0 && (
                <div className="pt-8">
                  <h3
                    className="
                      text-xl
                      font-bold
                      text-gray-800
                    "
                  >
                    Select Size
                  </h3>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-3
                      pt-2
                    "
                  >
                    {productSizes.map((size, index) => {
                      const sizeValue =
                        typeof size === "object" ? size.size : size;

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedSize(sizeValue)}
                          className={`
                              w-14
                              h-14
                              rounded-xl
                              border-2
                              font-semibold
                              cursor-pointer
                              ${
                                selectedSize === sizeValue
                                  ? "bg-sky-600 text-white border-sky-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-sky-500"
                              }
                            `}
                        >
                          {sizeValue}
                        </button>
                      );
                    })}
                  </div>

                  {selectedSize && (
                    <p className="mt-3 text-gray-600">
                      Selected Size:{" "}
                      <span className="font-bold text-sky-600">
                        {selectedSize}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {/* STOCK */}

              <div className="pt-7">
                {Number(product.stock) > 0 ? (
                  <p className="text-green-600 font-semibold">
                    ✓ In Stock ({product.stock})
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">✕ Out of Stock</p>
                )}
              </div>

              {/* DELIVERY */}

              <div
                className="
                  mt-7
                  bg-gray-100
                  rounded-2xl
                  p-5
                "
              >
                <h3 className="font-bold text-lg">Delivery Details</h3>

                <p className="text-gray-600 mt-2">Free Delivery Available</p>

                <p className="text-gray-600 mt-1">
                  Estimated Delivery: 3-5 Days
                </p>
              </div>

              {/* BUTTONS */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-3
                  pt-8
                "
              >
                {/* WISHLIST */}

                <button
                  type="button"
                  onClick={addToWishlist}
                  className="
                    border-2
                    border-rose-400
                    text-rose-500
                    py-3
                    rounded-xl
                    font-bold
                    hover:bg-rose-50
                    cursor-pointer
                  "
                >
                  ♡ Wishlist
                </button>

                {/* ADD TO CART */}

                <button
                  type="button"
                  onClick={addToCart}
                  disabled={outOfStock}
                  className="
                    border-2
                    border-sky-600
                    text-sky-600
                    py-3
                    rounded-xl
                    font-bold
                    hover:bg-sky-50
                    cursor-pointer
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  Add to Cart
                </button>

                {/* BUY NOW */}

                <button
                  type="button"
                  onClick={buyNow}
                  disabled={outOfStock}
                  className="
                    bg-sky-600
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    hover:bg-sky-700
                    cursor-pointer
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
