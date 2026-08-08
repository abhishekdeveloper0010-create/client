import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";

function Cart() {
  const [cart, setCart] = useState([]);

  // =========================
  // LOAD CART
  // =========================

  useEffect(() => {
    const cartData =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartData);
  }, []);

  // =========================
  // REMOVE PRODUCT
  // =========================

  const removeItem = (cartItemId) => {
    const updatedCart = cart.filter(
      (item) => item.cartItemId !== cartItemId
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQty = (cartItemId) => {
    const updatedCart = cart.map((item) => {
      if (item.cartItemId === cartItemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQty = (cartItemId) => {
    const updatedCart = cart.map((item) => {
      if (item.cartItemId === cartItemId) {
        return {
          ...item,
          quantity:
            item.quantity > 1
              ? item.quantity - 1
              : 1,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // SUBTOTAL
  // =========================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  // =========================
  // DELIVERY
  // =========================

  const delivery = cart.length > 0 ? 50 : 0;

  // =========================
  // TOTAL
  // =========================

  const total = subtotal + delivery;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ========================= */}
        {/* CART SECTION */}
        {/* ========================= */}

        <div
          className={`
            bg-white
            text-left
            p-6
            rounded-3xl

            ${
              cart.length === 0
                ? "w-full"
                : "w-full lg:w-[70%]"
            }
          `}
        >

          <h1
            className="
              text-3xl
              font-bold
              text-gray-700
              pb-5
            "
          >
            My Shopping Cart
          </h1>

          <hr className="border-gray-300" />

          {/* ========================= */}
          {/* EMPTY CART */}
          {/* ========================= */}

          {cart.length === 0 ? (

            <div className="py-24 text-center">

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-gray-500
                "
              >
                Your Cart is Empty
              </h2>

              <p
                className="
                  text-gray-400
                  mt-3
                "
              >
                Add some products to continue
                shopping.
              </p>

            </div>

          ) : (

            /* ========================= */
            /* PRODUCTS */
            /* ========================= */

            <div className="mt-6 space-y-5">

              {cart.map((item) => (

                <CartItem
                  key={item.cartItemId}
                  item={item}
                  removeItem={removeItem}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                />

              ))}

            </div>

          )}

        </div>

        {/* ========================= */}
        {/* ORDER SUMMARY */}
        {/* ========================= */}

        {cart.length > 0 && (

          <div
            className="
              w-full
              lg:w-[30%]
              bg-white
              rounded-3xl
              p-6
              h-fit
            "
          >

            <h2
              className="
                text-[25px]
                font-bold
                text-gray-700
                pb-4
              "
            >
              Order Summary
            </h2>

            <hr className="mt-4 border-gray-300" />

            <div className="mt-6 space-y-4">

              {/* SUBTOTAL */}

              <div className="flex justify-between  text-2xl pt-4">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{subtotal}
                </span>

              </div>

              {/* SHIPPING */}

              <div className="flex justify-between text-2xl pt-4">

                <span>
                  Shipping
                </span>

                <span className="text-green-600">
                  Free
                </span>

              </div>

              {/* DELIVERY */}

              <div className="flex justify-between text-2xl pt-4">

                <span>
                  Delivery
                </span>

                <span>
                  ₹{delivery}
                </span>

              </div>

              <hr />

              {/* TOTAL */}

              <div
                className="
                  flex
                  justify-between
                 
                  font-bold
                  text-2xl pt-4  pb-5
                "
              >

                <span>
                  Total
                </span>

                <span>
                  ₹{total}
                </span>

              </div>

              {/* CHECKOUT */}

              <button
                className="
                  w-full
                  mt-5
                  bg-sky-600
                  hover:bg-sky-700
                  text-white
                  py-3
                  rounded-xl
                  cursor-pointer
                  text-2xl  
                "
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;