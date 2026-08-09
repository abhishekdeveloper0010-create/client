import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");

  const navigate = useNavigate();

  useEffect(() => {
    const cartData =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartData);
  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const delivery = cart.length > 0 ? 50 : 0;
  const total = subtotal + delivery;

  const handleInput = (event) => {
    const { name, value } = event.target;
    setShipping((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    localStorage.removeItem("cart");
    setCart([]);
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Checkout
        </h1>

        {orderPlaced ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">
              Order Confirmed
            </h2>
            <p className="mt-3 text-gray-600">
              Thank you for your purchase. Your order is being processed and
              will be shipped soon.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-semibold hover:bg-sky-700"
              >
                Continue Shopping
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-sky-600 px-6 py-3 text-sky-600 font-semibold hover:bg-sky-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Shipping & Payment
              </h2>

              {cart.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-500 text-xl">
                    Your cart is empty. Add items before checking out.
                  </p>
                  <Link
                    to="/shop"
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-semibold hover:bg-sky-700"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <form onSubmit={placeOrder} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-semibold text-gray-600">
                        Full Name
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={shipping.name}
                        onChange={handleInput}
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-gray-600">
                        Email
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={shipping.email}
                        onChange={handleInput}
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-semibold text-gray-600">
                        Phone
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={shipping.phone}
                        onChange={handleInput}
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-gray-600">
                        Postal Code
                      </span>
                      <input
                        type="text"
                        name="pin"
                        value={shipping.pin}
                        onChange={handleInput}
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500"
                        required
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-semibold text-gray-600">
                      Address
                    </span>
                    <textarea
                      name="address"
                      value={shipping.address}
                      onChange={handleInput}
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500"
                      required
                    />
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-semibold text-gray-600">
                        City
                      </span>
                      <input
                        type="text"
                        name="city"
                        value={shipping.city}
                        onChange={handleInput}
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-gray-600">
                        State
                      </span>
                      <input
                        type="text"
                        name="state"
                        value={shipping.state}
                        onChange={handleInput}
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500"
                        required
                      />
                    </label>
                  </div>

                  <div className="rounded-3xl bg-slate-50 p-5">
                    <h3 className="text-xl font-semibold text-gray-700">
                      Payment Method
                    </h3>

                    <div className="mt-4 space-y-3">
                      <label className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-4 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="h-4 w-4 text-sky-600"
                        />
                        <span className="text-gray-700">Credit / Debit Card</span>
                      </label>
                      <label className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-4 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="h-4 w-4 text-sky-600"
                        />
                        <span className="text-gray-700">UPI</span>
                      </label>
                      <label className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-4 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="h-4 w-4 text-sky-600"
                        />
                        <span className="text-gray-700">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-sky-600 px-6 py-4 text-white text-lg font-semibold hover:bg-sky-700"
                  >
                    Place Order
                  </button>
                </form>
              )}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="rounded-3xl border border-gray-200 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 mt-1">Size: {item.size}</p>
                        <p className="text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-gray-700">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between pt-3 text-gray-600">
                    <span>Delivery</span>
                    <span>₹{delivery}</span>
                  </div>
                  <div className="mt-4 flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
