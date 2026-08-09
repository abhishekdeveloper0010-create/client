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
const [paymentMessage, setPaymentMessage] = useState("");

const [paymentDetails, setPaymentDetails] = useState({
cardNumber: "",
cardName: "",
expiry: "",
cvv: "",
upiId: "",
codNote: "",
});

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

const handlePaymentDetail = (event) => {
const { name, value } = event.target;

 
setPaymentDetails((prev) => ({
  ...prev,
  [name]: value,
}));
 

};

const placeOrder = (event) => {
event.preventDefault();

 
if (cart.length === 0) {
  return;
}

const methodLabel =
  paymentMethod === "card"
    ? "Credit / Debit Card"
    : paymentMethod === "upi"
    ? "UPI"
    : "Cash on Delivery";

if (
  paymentMethod === "card" &&
  (
    !paymentDetails.cardNumber ||
    !paymentDetails.cardName ||
    !paymentDetails.expiry ||
    !paymentDetails.cvv
  )
) {
  setPaymentMessage(
    "Please complete your card details before placing the order."
  );
  return;
}

if (
  paymentMethod === "upi" &&
  !paymentDetails.upiId
) {
  setPaymentMessage(
    "Please enter your UPI ID before placing the order."
  );
  return;
}

const paymentInfo =
  paymentMethod === "card"
    ? {
        cardNumber: paymentDetails.cardNumber.replace(
          /\d(?=\d{4})/g,
          "*"
        ),
        cardName: paymentDetails.cardName,
        expiry: paymentDetails.expiry,
      }
    : paymentMethod === "upi"
    ? {
        upiId: paymentDetails.upiId,
      }
    : {
        codNote:
          paymentDetails.codNote || "Pay at delivery",
      };

setPaymentMessage(
  `Payment selected: ${methodLabel}`
);

const orderData = {
  id: `ORD-${Date.now()}`,
  status: "Packed",
  placedAt: new Date().toLocaleDateString(),
  total: total,
  paymentMethod: methodLabel,
  paymentDetails: paymentInfo,
  address: shipping.address,
  city: shipping.city,
  state: shipping.state,
  pin: shipping.pin,
  customerName: shipping.name,
  phone: shipping.phone,
  email: shipping.email,
};

const existingOrders =
  JSON.parse(localStorage.getItem("orders")) || [];

existingOrders.unshift(orderData);

localStorage.setItem(
  "orders",
  JSON.stringify(existingOrders)
);

localStorage.removeItem("cart");

setCart([]);
setOrderPlaced(true);
 

};

return ( <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16"> <div className="w-full">

 
    <h1 className="mb-6 text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
      Checkout
    </h1>

    {orderPlaced ? (
      <div className="w-full rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Order Confirmed
        </h2>

        <p className="mt-3 text-gray-600">
          Thank you for your purchase. Your order is being processed and
          will be shipped soon.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
          >
            Continue Shopping
          </button>

          <button
            type="button"
            onClick={() => navigate("/order-tracking")}
            className="inline-flex items-center justify-center rounded-xl border border-sky-600 px-6 py-3 font-semibold text-sky-600 hover:bg-sky-50"
          >
            View Order Track
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-sky-600 px-6 py-3 font-semibold text-sky-600 hover:bg-sky-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    ) : (
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Shipping and Payment */}
        <div className="w-full rounded-3xl bg-white p-4 shadow-sm sm:p-6 lg:col-span-2 lg:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-700">
            Shipping & Payment
          </h2>

          {cart.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 p-6 text-center sm:p-8">
              <p className="text-lg text-gray-500 sm:text-xl">
                Your cart is empty. Add items before checking out.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <form
              onSubmit={placeOrder}
              className="space-y-6"
            >
              {/* Name and Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

              {/* Phone and PIN */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

              {/* Address */}
              <label className="block">
                <span className="text-sm font-semibold text-gray-600">
                  Address
                </span>

                <textarea
                  name="address"
                  value={shipping.address}
                  onChange={handleInput}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-sky-500"
                  required
                />
              </label>

              {/* City and State */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

              {/* Payment Method */}
              <div className="rounded-3xl bg-slate-50 p-4 sm:p-5">
                <h3 className="text-xl font-semibold text-gray-700">
                  Payment Method
                </h3>

                <div className="mt-4 space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-300 bg-white p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="h-4 w-4 text-sky-600"
                    />
                    <span className="text-gray-700">
                      Credit / Debit Card
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-300 bg-white p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="h-4 w-4 text-sky-600"
                    />
                    <span className="text-gray-700">
                      UPI
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-300 bg-white p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="h-4 w-4 text-sky-600"
                    />
                    <span className="text-gray-700">
                      Cash on Delivery
                    </span>
                  </label>
                </div>

                {/* Card Payment */}
                {paymentMethod === "card" && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-gray-600">
                      <span className="mb-2 block font-semibold">
                        Cardholder Name
                      </span>

                      <input
                        type="text"
                        name="cardName"
                        value={paymentDetails.cardName}
                        onChange={handlePaymentDetail}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                        placeholder="Ayesha Khan"
                        required
                      />
                    </label>

                    <label className="block text-sm text-gray-600">
                      <span className="mb-2 block font-semibold">
                        Card Number
                      </span>

                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentDetail}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                        placeholder="4242 4242 4242 4242"
                        maxLength="19"
                        required
                      />
                    </label>

                    <label className="block text-sm text-gray-600">
                      <span className="mb-2 block font-semibold">
                        Expiry
                      </span>

                      <input
                        type="text"
                        name="expiry"
                        value={paymentDetails.expiry}
                        onChange={handlePaymentDetail}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                        placeholder="MM/YY"
                        required
                      />
                    </label>

                    <label className="block text-sm text-gray-600">
                      <span className="mb-2 block font-semibold">
                        CVV
                      </span>

                      <input
                        type="password"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentDetail}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                        placeholder="***"
                        maxLength="4"
                        required
                      />
                    </label>
                  </div>
                )}

                {/* UPI Payment */}
                {paymentMethod === "upi" && (
                  <label className="mt-4 block text-sm text-gray-600">
                    <span className="mb-2 block font-semibold">
                      UPI ID
                    </span>

                    <input
                      type="text"
                      name="upiId"
                      value={paymentDetails.upiId}
                      onChange={handlePaymentDetail}
                      className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                      placeholder="yourname@upi"
                      required
                    />
                  </label>
                )}

                {/* Cash on Delivery */}
                {paymentMethod === "cod" && (
                  <label className="mt-4 block text-sm text-gray-600">
                    <span className="mb-2 block font-semibold">
                      Delivery Note
                    </span>

                    <textarea
                      name="codNote"
                      value={paymentDetails.codNote}
                      onChange={handlePaymentDetail}
                      rows={3}
                      className="w-full resize-none rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                      placeholder="Leave at reception or call before delivery"
                    />
                  </label>
                )}
              </div>

              {paymentMessage && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {paymentMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-600 px-6 py-4 text-lg font-semibold text-white hover:bg-sky-700"
              >
                Place Order
              </button>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full rounded-3xl bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-700">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="rounded-3xl border border-gray-200 p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-gray-500">
                      Size: {item.size}
                    </p>

                    <p className="mt-1 text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-lg font-semibold text-gray-700">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

            {/* Price Summary */}
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
