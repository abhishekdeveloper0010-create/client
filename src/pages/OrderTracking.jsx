import { useEffect, useState } from "react";

function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const [cancelReason, setCancelReason] = useState("Changed my mind");
  const [cancelMessage, setCancelMessage] = useState("");
  const [rmaReason, setRmaReason] = useState("Product damaged");
  const [rmaMessage, setRmaMessage] = useState("");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const latestOrder = orders[0];

  const cancelOrder = () => {
    if (!latestOrder || latestOrder.status === "Cancelled") {
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === latestOrder.id
        ? {
            ...order,
            status: "Cancelled",
            cancelledAt: new Date().toLocaleDateString(),
            cancellationReason: cancelReason,
            refundInfo: "Refund will be initiated within 3-5 business days.",
          }
        : order,
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setCancelMessage("Your order has been cancelled successfully.");
  };

  const isCancelable =
    latestOrder &&
    latestOrder.status !== "Cancelled" &&
    latestOrder.status !== "Delivered" &&
    latestOrder.status !== "Return Requested";

  const canMarkDelivered = latestOrder && latestOrder.status === "Packed";

  const isRmaAllowed =
    latestOrder &&
    latestOrder.status === "Delivered" &&
    !latestOrder.rmaRequested;

  const markDelivered = () => {
    if (!latestOrder || latestOrder.status !== "Packed") {
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === latestOrder.id
        ? {
            ...order,
            status: "Delivered",
            deliveredAt: new Date().toLocaleDateString(),
          }
        : order,
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const requestRma = () => {
    if (!latestOrder || !isRmaAllowed) {
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === latestOrder.id
        ? {
            ...order,
            status: "Return Requested",
            rmaRequested: true,
            rmaRequestedAt: new Date().toLocaleDateString(),
            rmaReason,
            rmaStatus: "Pending",
          }
        : order,
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setRmaMessage(
      "Your return request has been submitted. We will contact you with return instructions.",
    );
  };

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-20">
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[55px] font-bold text-[#0c4a6e]">
            Order Tracking
          </h1>

          <p className="pt-4 pb-4 text-base sm:text-lg lg:text-xl text-slate-600">
            Track your latest order
          </p>
        </div>

        {!latestOrder ? (
          /* No Orders */
          <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 sm:p-10">
            No orders placed yet. Complete your first purchase to see tracking
            details here.
          </div>
        ) : (
          /* Order Details */
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:p-8">
            {/* Order ID + Status */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-1sm font-semibold uppercase tracking-[0.2em] text-sky-600 pb-5">
                  Order ID
                </p>

                <p className="mt-2 break-all text-lg sm:text-xl font-semibold text-slate-900 pb-4">
                  {latestOrder.id}
                </p>
              </div>

              <div className="self-start rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 sm:self-auto">
                {latestOrder.status || "Order Placed"}
              </div>
            </div>

            {/* Placed Date + Total */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-white p-4 sm:p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Placed On
                </p>

                <p className="mt-2 text-base sm:text-lg text-slate-900">
                  {latestOrder.placedAt || "Not available"}
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-4 sm:p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Total Amount
                </p>

                <p className="mt-2 text-base sm:text-lg font-semibold text-slate-900">
                  ₹{latestOrder.total || 0}
                </p>
              </div>
            </div>
            <br />
            {/* Payment + Address */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-[24px] border border-sky-600 bg-sky-50 p-4 sm:p-5">
                <p className="font-semibold text-slate-900">Payment Method</p>

                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  {latestOrder.paymentMethod || "Card Payment"}
                </p>

                {latestOrder.paymentDetails && (
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    {latestOrder.paymentDetails.cardNumber && (
                      <p>Card: {latestOrder.paymentDetails.cardNumber}</p>
                    )}
                    {latestOrder.paymentDetails.upiId && (
                      <p>UPI: {latestOrder.paymentDetails.upiId}</p>
                    )}
                    {latestOrder.paymentDetails.codNote && (
                      <p>Note: {latestOrder.paymentDetails.codNote}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-[24px] border border-sky-600 bg-sky-50 p-4 sm:p-5">
                <p className="font-semibold text-slate-900">Delivery Address</p>

                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                  {latestOrder.address || "Not provided"}
                  {latestOrder.city && `, ${latestOrder.city}`}
                  {latestOrder.state && `, ${latestOrder.state}`}
                  {latestOrder.pin && ` - ${latestOrder.pin}`}
                </p>
              </div>
            </div>
            <br />
            {/* Cancellation */}
            <div className="mt-6 rounded-[24px] border border-rose-100 bg-rose-50 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[18px] text-slate-900">Order Actions</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Cancel anytime before dispatch and we will help with a quick
                    refund.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {isCancelable && (
                    <button
                      type="button"
                      onClick={cancelOrder}
                      className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                    >
                      Cancel Order
                    </button>
                  )}

                  {canMarkDelivered && (
                    <button
                      type="button"
                      onClick={markDelivered}
                      className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                    >
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>

              {isCancelable && (
                <div className="pt-4">
                  <label className="block text-1sm font-semibold text-slate-700 pb-2">
                    Why are you cancelling?
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(event) => setCancelReason(event.target.value)}
                    rows="3"
                    className="mt-2 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400"
                  />
                </div>
              )}

              {cancelMessage && (
                <p className="mt-3 text-sm font-semibold text-rose-700">
                  {cancelMessage}
                </p>
              )}

              {latestOrder.status === "Cancelled" && (
                <div className="mt-4 rounded-2xl border border-rose-200 bg-white p-3 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">
                    Cancellation Details
                  </p>
                  <p className="mt-1">
                    Reason: {latestOrder.cancellationReason || "Not provided"}
                  </p>
                  <p className="mt-1">
                    Refund:{" "}
                    {latestOrder.refundInfo ||
                      "Refund will be initiated shortly."}
                  </p>
                </div>
              )}
            </div>
            <br />
            {/* RMA Request */}
            <div className="mt-6 rounded-[24px] border border-sky-100 bg-sky-50 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[18px] text-slate-900">Return Request (RMA)</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Submit an RMA request for delivered orders.
                  </p>
                </div>
                {isRmaAllowed && (
                  <button
                    type="button"
                    onClick={requestRma}
                    className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    Submit RMA
                  </button>
                )}
              </div>

              {isRmaAllowed && (
                <div className="pt-4">
                  <label className="block text-1sm font-semibold text-slate-700 pb-2">
                    Reason for return
                  </label>
                  <textarea
                    value={rmaReason}
                    onChange={(event) => setRmaReason(event.target.value)}
                    rows="3"
                    className="mt-2 w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                  />
                </div>
              )}

              {rmaMessage && (
                <p className="mt-3 text-sm font-semibold text-sky-700">{rmaMessage}</p>
              )}

              {latestOrder.rmaRequested && (
                <div className="mt-4 rounded-2xl border border-sky-200 bg-white p-3 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">RMA Status</p>
                  <p className="mt-1">Requested on: {latestOrder.rmaRequestedAt}</p>
                  <p className="mt-1">Status: {latestOrder.rmaStatus}</p>
                  <p className="mt-1">Reason: {latestOrder.rmaReason}</p>
                </div>
              )}
            </div>
            <br />
            {/* Delivery Update */}
            <div className="mt-6 rounded-[24px] border border-sky-100 bg-sky-50 p-4 sm:p-5">
              <p className="font-semibold text-slate-900">Delivery Update</p>

              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                {latestOrder.status === "Cancelled"
                  ? "Your order has been cancelled. If a payment was already captured, the refund process will begin shortly."
                  : latestOrder.status === "Packed"
                  ? "Your package is being packed and will be shipped shortly. You will receive a live update soon."
                  : latestOrder.status === "Delivered"
                  ? "Your order has been delivered. If you want to return it, submit an RMA request."
                  : latestOrder.status === "Return Requested"
                  ? "Your return request has been received. We will update the order status once we process your return."
                  : "Your order status is being updated. Check back for the latest updates."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderTracking;
