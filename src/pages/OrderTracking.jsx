import { useEffect, useState } from "react";

function OrderTracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const latestOrder = orders[0];

  return (
    <section className="min-h-screen bg-[linear-gradient(135deg,#f5fbff_0%,#eef9ff_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl rounded-[36px] border border-sky-100 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(2,132,199,0.22)] sm:p-8 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Order Tracking</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Track your latest order</h1>

        {!latestOrder ? (
          <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 sm:p-10">
            No orders placed yet. Complete your first purchase to see tracking details here.
          </div>
        ) : (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Order ID</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{latestOrder.id}</p>
              </div>
              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                {latestOrder.status}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Placed On</p>
                <p className="mt-2 text-slate-900">{latestOrder.placedAt}</p>
              </div>
              <div className="rounded-[24px] bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Total Amount</p>
                <p className="mt-2 text-slate-900">₹{latestOrder.total}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-sky-100 bg-sky-50 p-4">
              <p className="font-semibold text-slate-900">Delivery Update</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">Your package is being packed and will be shipped shortly. You will receive a live update soon.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderTracking;
