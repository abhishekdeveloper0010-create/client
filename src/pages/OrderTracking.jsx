import { useEffect, useState } from "react";

function OrderTracking() {
  const API_URL = "http://localhost:4000";

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // CANCEL / RETURN STATES
  // =====================================================

  const [actionType, setActionType] = useState(null);
  // "cancel" | "return" | null

  const [actionReason, setActionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) return "";

    image = String(image).trim();

    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:image") ||
      image.startsWith("blob:")
    ) {
      return image;
    }

    const cleanImage = image.replace(/^\/+/, "");

    if (cleanImage.startsWith("images/")) {
      return `${API_URL}/${cleanImage}`;
    }

    return `${API_URL}/images/${cleanImage}`;
  };

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const getProductImage = (item) => {
    if (!item) return "";

    return (
      item.product_image ||
      item.productImage ||
      item.image ||
      item.image_url ||
      item.imageUrl ||
      item.thumbnail ||
      ""
    );
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date);
    }

    return parsedDate.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // =====================================================
  // ORDER NUMBER
  // =====================================================

  const getOrderNumber = (order) => {
    return (
      order?.order_number ||
      order?.orderNumber ||
      order?.id ||
      "N/A"
    );
  };

  // =====================================================
  // TOTAL AMOUNT
  // =====================================================

  const getTotalAmount = (order) => {
    return Number(
      order?.total_amount ??
        order?.total ??
        0
    );
  };

  // =====================================================
  // PAYMENT METHOD
  // =====================================================

  const getPaymentMethod = (order) => {
    return (
      order?.payment_method ||
      order?.paymentMethod ||
      "Not available"
    );
  };

  // =====================================================
  // DELIVERY ADDRESS
  // =====================================================

  const getAddress = (order) => {
    if (!order) return "Not available";

    if (
      typeof order.address === "object" &&
      order.address !== null
    ) {
      const address = order.address;

      return [
        address.full_name,
        address.address_line,
        address.city,
        address.state,
        address.pincode,
        address.country,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return [
      order.address,
      order.address_line,
      order.city,
      order.state,
      order.pincode,
      order.pin,
    ]
      .filter(Boolean)
      .join(", ");
  };

  // =====================================================
  // ORDER STATUSES
  // =====================================================

  const statuses = [
    "Order Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  // =====================================================
  // RETURN STATUSES
  // =====================================================

  const returnStatuses = [
    "Return Requested",
    "Return Approved",
    "Return Picked Up",
    "Return Completed",
  ];

  // =====================================================
  // STATUS INDEX
  // =====================================================

  const getStatusIndex = (status) => {
    const index = statuses.indexOf(status);

    return index === -1 ? 0 : index;
  };

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    if (
      status === "Return Requested" ||
      status === "Return Approved" ||
      status === "Return Picked Up"
    ) {
      return "bg-orange-100 text-orange-700";
    }

    if (status === "Return Completed") {
      return "bg-purple-100 text-purple-700";
    }

    return "bg-sky-100 text-sky-700";
  };

  // =====================================================
  // DELIVERY MESSAGE
  // =====================================================

  const getDeliveryMessage = (status) => {
    switch (status) {
      case "Order Placed":
        return "Your order has been successfully placed and is waiting for confirmation.";

      case "Confirmed":
        return "Your order has been confirmed and will be packed shortly.";

      case "Packed":
        return "Your order has been packed and will be shipped shortly.";

      case "Shipped":
        return "Your order has been shipped and is currently in transit.";

      case "Out for Delivery":
        return "Your order is out for delivery and should arrive soon.";

      case "Delivered":
        return "Your order has been delivered successfully.";

      case "Cancelled":
        return "Your order has been cancelled.";

      case "Return Requested":
        return "Your return request has been submitted and is waiting for approval.";

      case "Return Approved":
        return "Your return request has been approved.";

      case "Return Picked Up":
        return "Your return package has been picked up.";

      case "Return Completed":
        return "Your return has been completed successfully.";

      default:
        return "Your order status is being updated.";
    }
  };

  // =====================================================
  // LOAD ALL ORDERS
  // =====================================================

  const loadOrders = async () => {
    const token = getToken();

    if (!token) {
      setError("Login token not found. Please login again.");
      setLoadingOrders(false);
      return;
    }

    try {
      setLoadingOrders(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/orders/my-orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Server returned non JSON:",
          text
        );

        throw new Error(
          "Server returned HTML instead of JSON."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load orders."
        );
      }

      const serverOrders = Array.isArray(data.orders)
        ? data.orders
        : [];

      setOrders(serverOrders);

      if (serverOrders.length > 0) {
        setSelectedOrderId(serverOrders[0].id);
      } else {
        setSelectedOrderId(null);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("LOAD ORDERS ERROR:", error);

      setOrders([]);
      setSelectedOrder(null);

      setError(
        error.message || "Unable to load orders."
      );
    } finally {
      setLoadingOrders(false);
    }
  };

  // =====================================================
  // LOAD SINGLE ORDER
  // =====================================================

  const loadOrder = async (orderId) => {
    if (!orderId) return;

    const token = getToken();

    if (!token) {
      setError("Login token not found. Please login again.");
      return;
    }

    try {
      setLoadingOrder(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Server returned non JSON:",
          text
        );

        throw new Error(
          "Server returned HTML instead of JSON."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load order."
        );
      }

      const orderData = {
        ...(data.order || {}),

        items: Array.isArray(data.items)
          ? data.items
          : [],

        history: Array.isArray(data.history)
          ? data.history
          : [],
      };

      setSelectedOrder(orderData);

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          String(order.id) === String(orderId)
            ? {
                ...order,
                ...orderData,
              }
            : order
        )
      );
    } catch (error) {
      console.error("LOAD ORDER ERROR:", error);

      setSelectedOrder(null);

      setError(
        error.message || "Unable to load order."
      );
    } finally {
      setLoadingOrder(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadOrders();
  }, []);

  // =====================================================
  // LOAD SELECTED ORDER
  // =====================================================

  useEffect(() => {
    if (selectedOrderId) {
      loadOrder(selectedOrderId);
    }
  }, [selectedOrderId]);

  // =====================================================
  // CURRENT ORDER
  // =====================================================

  const currentOrder =
    selectedOrder ||
    orders.find(
      (order) =>
        String(order.id) ===
        String(selectedOrderId)
    ) ||
    null;

  // =====================================================
  // CURRENT STATUS
  // =====================================================

  const currentStatus =
    currentOrder?.status || "Order Placed";

  const currentStatusIndex =
    getStatusIndex(currentStatus);

  // =====================================================
  // ITEMS
  // =====================================================

  const orderItems =
    currentOrder &&
    Array.isArray(currentOrder.items)
      ? currentOrder.items
      : [];

  // =====================================================
  // HISTORY
  // =====================================================

  const orderHistory =
    currentOrder &&
    Array.isArray(currentOrder.history)
      ? currentOrder.history
      : [];

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const totalItems = orderItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // =====================================================
  // CAN CANCEL
  // =====================================================

  const canCancelOrder = [
    "Order Placed",
    "Confirmed",
    "Packed",
  ].includes(currentStatus);

  // =====================================================
  // CAN RETURN
  // =====================================================

  const canReturnOrder =
    currentStatus === "Delivered";

  // =====================================================
  // OPEN CANCEL
  // =====================================================

  const openCancelModal = () => {
    setActionType("cancel");
    setActionReason("");
    setError("");
    setSuccess("");
  };

  // =====================================================
  // OPEN RETURN
  // =====================================================

  const openReturnModal = () => {
    setActionType("return");
    setActionReason("");
    setError("");
    setSuccess("");
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeActionModal = () => {
    if (actionLoading) return;

    setActionType(null);
    setActionReason("");
  };

  // =====================================================
  // CANCEL / RETURN
  // IMPORTANT: POST METHOD
  // =====================================================

  const submitOrderAction = async () => {
    if (!currentOrder?.id) {
      setError("Order ID not found.");
      return;
    }

    if (!actionType) return;

    if (!actionReason.trim()) {
      setError(
        actionType === "cancel"
          ? "Please enter cancellation reason."
          : "Please enter return reason."
      );

      return;
    }

    const token = getToken();

    if (!token) {
      setError(
        "Login token not found. Please login again."
      );

      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const endpoint =
        actionType === "cancel"
          ? `${API_URL}/api/orders/${currentOrder.id}/cancel`
          : `${API_URL}/api/orders/${currentOrder.id}/return`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reason: actionReason.trim(),
        }),
      });

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const text = await response.text();

        console.error(
          "ACTION SERVER RESPONSE:",
          text
        );

        throw new Error(
          "Server returned invalid response."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Unable to ${
              actionType === "cancel"
                ? "cancel"
                : "return"
            } order.`
        );
      }

      setSuccess(
        actionType === "cancel"
          ? "Order cancelled successfully."
          : "Return request submitted successfully."
      );

      setActionType(null);
      setActionReason("");

      await loadOrder(currentOrder.id);
      await loadOrders();
    } catch (error) {
      console.error(
        "ORDER ACTION ERROR:",
        error
      );

      setError(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingOrders) {
    return (
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            Loading Orders...
          </h2>

          <p className="mt-2 text-slate-500">
            Please wait while we fetch your orders.
          </p>

        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && orders.length === 0) {
    return (
      <section className="w-full bg-white py-10 sm:py-14 lg:py-20">

        <div className="mx-auto max-w-5xl px-4">

          <div className="text-center">

            <h1 className="text-3xl font-bold text-[#0c4a6e] sm:text-4xl lg:text-5xl">
              Order Tracking
            </h1>

            <p className="pt-4 text-base text-slate-600 sm:text-lg">
              Track your orders and delivery status
            </p>

          </div>

          <div className="mt-10 rounded-[28px] border border-red-200 bg-red-50 p-10 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-3xl">
              ⚠️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              Unable to Load Orders
            </h2>

            <p className="mt-2 text-slate-600">
              {error}
            </p>

            <button
              type="button"
              onClick={loadOrders}
              className="mt-6 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Try Again
            </button>

          </div>

        </div>

      </section>
    );
  }

  // =====================================================
  // NO ORDERS
  // =====================================================

  if (orders.length === 0) {
    return (
      <section className="w-full bg-white py-10 sm:py-14 lg:py-20">

        <div className="mx-auto w-full max-w-[1850px] px-4 sm:px-6 lg:px-10 xl:px-16">

          <div className="text-center">

            <h1 className="text-3xl font-bold text-[#0c4a6e] sm:text-4xl lg:text-5xl">
              Order Tracking
            </h1>

            <p className="pt-4 text-base text-slate-600 sm:text-lg">
              Track your orders and delivery status
            </p>

          </div>

          <div className="mt-10 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-3xl">
              📦
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No Orders Yet
            </h2>

            <p className="mt-2 text-slate-600">
              Complete your first purchase to see your orders here.
            </p>

          </div>

        </div>

      </section>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-20">

      <div className="mx-auto w-full max-w-[1850px] px-4 sm:px-6 lg:px-10 xl:px-16">

        {/* PAGE HEADING */}

        <div className="text-center">

          <h1 className="text-3xl font-bold text-[#0c4a6e] sm:text-4xl lg:text-5xl xl:text-[55px]">
            Order Tracking
          </h1>

          <p className="pt-4 text-base text-slate-600 sm:text-lg lg:text-xl">
            Track your orders and delivery status
          </p>

        </div>

        {/* SUCCESS */}

        {success && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-700">
            {success}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {/* ORDER LIST */}

        {orders.length > 1 && (
          <div className="mt-10">

            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              My Orders
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

              {orders.map((order) => {

                const selected =
                  String(order.id) ===
                  String(selectedOrderId);

                return (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() =>
                      setSelectedOrderId(order.id)
                    }
                    className={`rounded-[24px] border p-5 text-left transition ${
                      selected
                        ? "border-sky-600 bg-sky-50 shadow-md"
                        : "border-slate-200 bg-white hover:border-sky-400 hover:shadow-sm"
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                          Order ID
                        </p>

                        <p className="mt-1 break-all font-bold text-slate-900">
                          {getOrderNumber(order)}
                        </p>

                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          order.status ||
                            "Order Placed"
                        )}`}
                      >
                        {order.status ||
                          "Order Placed"}
                      </span>

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      <p className="text-sm text-slate-500">
                        {formatDate(
                          order.created_at ||
                            order.createdAt
                        )}
                      </p>

                      <p className="font-bold text-slate-900">
                        ₹
                        {getTotalAmount(
                          order
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>
        )}

        {/* SINGLE ORDER LOADING */}

        {loadingOrder && (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

            <p className="mt-4 font-medium text-slate-600">
              Loading order details...
            </p>

          </div>
        )}

        {/* CURRENT ORDER */}

        {currentOrder && !loadingOrder && (

          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:p-8">

            {/* ORDER HEADER */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                  Order ID
                </p>

                <p className="mt-2 break-all text-lg font-bold text-slate-900 sm:text-xl">
                  {getOrderNumber(currentOrder)}
                </p>

              </div>

              <span
                className={`self-start rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                  currentStatus
                )}`}
              >
                {currentStatus}
              </span>

            </div>

            {/* ACTION BUTTONS */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              {canCancelOrder && (
                <button
                  type="button"
                  onClick={openCancelModal}
                  className="rounded-xl border border-red-300 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Cancel Order
                </button>
              )}

              {canReturnOrder && (
                <button
                  type="button"
                  onClick={openReturnModal}
                  className="rounded-xl border border-orange-300 bg-white px-5 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
                >
                  Return Order
                </button>
              )}

            </div>

            {/* SUMMARY */}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-[24px] bg-white p-5 shadow-sm">

                <p className="text-sm font-semibold text-slate-500">
                  Placed On
                </p>

                <p className="mt-2 font-medium text-slate-900">
                  {formatDate(
                    currentOrder.created_at ||
                      currentOrder.createdAt
                  )}
                </p>

              </div>

              <div className="rounded-[24px] bg-white p-5 shadow-sm">

                <p className="text-sm font-semibold text-slate-500">
                  Total Items
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  {totalItems}
                </p>

              </div>

              <div className="rounded-[24px] bg-white p-5 shadow-sm">

                <p className="text-sm font-semibold text-slate-500">
                  Total Amount
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  ₹
                  {getTotalAmount(
                    currentOrder
                  ).toLocaleString("en-IN")}
                </p>

              </div>

            </div>

            {/* TRACKING BAR */}

            {currentStatus !== "Cancelled" &&
              !returnStatuses.includes(currentStatus) && (
                <div className="mt-10 rounded-[26px] border border-slate-200 bg-white p-5 sm:p-6">

                  <h2 className="text-2xl font-bold text-slate-900">
                    Track Your Order
                  </h2>

                  <div className="mt-8 overflow-x-auto pb-4">

                    <div className="flex min-w-[700px]">

                      {statuses.map(
                        (status, index) => {

                          const completed =
                            index <=
                            currentStatusIndex;

                          const isLast =
                            index ===
                            statuses.length - 1;

                          return (
                            <div
                              key={status}
                              className="relative flex-1 text-center"
                            >

                              {!isLast && (
                                <div
                                  className={`absolute left-1/2 top-3 h-1 w-full ${
                                    index <
                                    currentStatusIndex
                                      ? "bg-sky-600"
                                      : "bg-slate-200"
                                  }`}
                                />
                              )}

                              <div
                                className={`relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full border-4 border-white text-xs font-bold ${
                                  completed
                                    ? "bg-sky-600 text-white"
                                    : "bg-slate-300 text-slate-500"
                                }`}
                              >
                                {completed ? "✓" : ""}
                              </div>

                              <p
                                className={`mt-3 px-1 text-[11px] font-semibold sm:text-xs ${
                                  completed
                                    ? "text-sky-700"
                                    : "text-slate-400"
                                }`}
                              >
                                {status}
                              </p>

                            </div>
                          );
                        }
                      )}

                    </div>

                  </div>

                  <div className="mt-4 rounded-2xl bg-sky-50 p-4">

                    <p className="font-semibold text-slate-900">
                      Current Update
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {getDeliveryMessage(
                        currentStatus
                      )}
                    </p>

                  </div>

                </div>
              )}

            {/* RETURN TRACKING */}

            {returnStatuses.includes(currentStatus) && (
              <div className="mt-10 rounded-[26px] border border-orange-200 bg-orange-50 p-5 sm:p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  Return Tracking
                </h2>

                <div className="mt-8 overflow-x-auto pb-4">

                  <div className="flex min-w-[650px]">

                    {returnStatuses.map(
                      (status, index) => {

                        const currentIndex =
                          returnStatuses.indexOf(
                            currentStatus
                          );

                        const completed =
                          index <= currentIndex;

                        const isLast =
                          index ===
                          returnStatuses.length - 1;

                        return (
                          <div
                            key={status}
                            className="relative flex-1 text-center"
                          >

                            {!isLast && (
                              <div
                                className={`absolute left-1/2 top-3 h-1 w-full ${
                                  index <
                                  currentIndex
                                    ? "bg-orange-500"
                                    : "bg-slate-200"
                                }`}
                              />
                            )}

                            <div
                              className={`relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full border-4 border-white text-xs font-bold ${
                                completed
                                  ? "bg-orange-500 text-white"
                                  : "bg-slate-300 text-slate-500"
                              }`}
                            >
                              {completed ? "✓" : ""}
                            </div>

                            <p
                              className={`mt-3 px-1 text-[11px] font-semibold sm:text-xs ${
                                completed
                                  ? "text-orange-700"
                                  : "text-slate-400"
                              }`}
                            >
                              {status}
                            </p>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>

                <div className="mt-4 rounded-2xl bg-white p-4">

                  <p className="font-semibold text-slate-900">
                    Return Update
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {getDeliveryMessage(
                      currentStatus
                    )}
                  </p>

                </div>

              </div>
            )}

            {/* ORDER ITEMS */}

            <div className="mt-10">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-slate-900">
                  Order Items
                </h2>

                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-500">
                  {orderItems.length}{" "}
                  {orderItems.length === 1
                    ? "Product"
                    : "Products"}
                </span>

              </div>

              {orderItems.length === 0 ? (

                <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                  No order items found.
                </div>

              ) : (

                <div className="space-y-5">

                  {orderItems.map(
                    (item, index) => {

                      const image =
                        getProductImage(item);

                      const imageUrl =
                        getImageUrl(image);

                      const itemStatus =
                        item.status ||
                        currentStatus;

                      const itemStatusIndex =
                        getStatusIndex(
                          itemStatus
                        );

                      const quantity =
                        Number(
                          item.quantity || 1
                        );

                      const price =
                        Number(
                          item.price || 0
                        );

                      const itemTotal =
                        price * quantity;

                      return (
                        <div
                          key={
                            item.id ||
                            `item-${index}`
                          }
                          className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm"
                        >

                          <div className="p-4 sm:p-6">

                            <div className="flex flex-col gap-5 md:flex-row">

                              {/* IMAGE */}

                              <div className="h-52 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-60 md:h-40 md:w-40">

                                {imageUrl ? (

                                  <img
                                    src={imageUrl}
                                    alt={
                                      item.product_name ||
                                      item.productName ||
                                      item.name ||
                                      "Product"
                                    }
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    onError={(event) => {
                                      event.currentTarget.style.display =
                                        "none";

                                      const parent =
                                        event.currentTarget
                                          .parentElement;

                                      if (
                                        parent &&
                                        !parent.querySelector(
                                          ".image-error"
                                        )
                                      ) {
                                        const fallback =
                                          document.createElement(
                                            "div"
                                          );

                                        fallback.className =
                                          "image-error flex h-full w-full items-center justify-center text-sm text-slate-400";

                                        fallback.innerText =
                                          "Image unavailable";

                                        parent.appendChild(
                                          fallback
                                        );
                                      }
                                    }}
                                  />

                                ) : (

                                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">

                                    <span className="text-3xl">
                                      🖼️
                                    </span>

                                    <span className="text-sm">
                                      No Image
                                    </span>

                                  </div>

                                )}

                              </div>

                              {/* PRODUCT DETAILS */}

                              <div className="min-w-0 flex-1">

                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">

                                  <div>

                                    <h3 className="text-xl font-bold text-slate-900">
                                      {item.product_name ||
                                        item.productName ||
                                        item.name ||
                                        "Product"}
                                    </h3>

                                    <div className="mt-3 flex flex-wrap gap-2">

                                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                        Qty: {quantity}
                                      </span>

                                      {item.size && (
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                          Size: {item.size}
                                        </span>
                                      )}

                                      {item.color && (
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                          Color: {item.color}
                                        </span>
                                      )}

                                    </div>

                                  </div>

                                  <div className="sm:text-right">

                                    <p className="text-xl font-bold text-slate-900">
                                      ₹
                                      {itemTotal.toLocaleString(
                                        "en-IN"
                                      )}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                      ₹
                                      {price.toLocaleString(
                                        "en-IN"
                                      )}{" "}
                                      each
                                    </p>

                                  </div>

                                </div>

                                {/* ITEM STATUS */}

                                <div className="mt-5 rounded-2xl bg-slate-50 p-4">

                                  <div className="flex flex-wrap items-center justify-between gap-3">

                                    <p className="font-semibold text-slate-800">
                                      Product Status
                                    </p>

                                    <span
                                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                        itemStatus
                                      )}`}
                                    >
                                      {itemStatus}
                                    </span>

                                  </div>

                                  {itemStatus !== "Cancelled" &&
                                    !returnStatuses.includes(
                                      itemStatus
                                    ) && (

                                      <div className="mt-6 overflow-x-auto pb-2">

                                        <div className="flex min-w-[650px]">

                                          {statuses.map(
                                            (
                                              status,
                                              statusIndex
                                            ) => {

                                              const completed =
                                                statusIndex <=
                                                itemStatusIndex;

                                              const isLast =
                                                statusIndex ===
                                                statuses.length - 1;

                                              return (
                                                <div
                                                  key={status}
                                                  className="relative flex-1 text-center"
                                                >

                                                  {!isLast && (
                                                    <div
                                                      className={`absolute left-1/2 top-3 h-1 w-full ${
                                                        statusIndex <
                                                        itemStatusIndex
                                                          ? "bg-sky-600"
                                                          : "bg-slate-200"
                                                      }`}
                                                    />
                                                  )}

                                                  <div
                                                    className={`relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full border-4 border-white ${
                                                      completed
                                                        ? "bg-sky-600"
                                                        : "bg-slate-300"
                                                    }`}
                                                  >
                                                    {completed && (
                                                      <span className="text-xs text-white">
                                                        ✓
                                                      </span>
                                                    )}
                                                  </div>

                                                  <p
                                                    className={`mt-2 text-[10px] font-semibold ${
                                                      completed
                                                        ? "text-sky-700"
                                                        : "text-slate-400"
                                                    }`}
                                                  >
                                                    {status}
                                                  </p>

                                                </div>
                                              );
                                            }
                                          )}

                                        </div>

                                      </div>
                                    )}

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>
              )}

            </div>

            {/* ORDER TIMELINE */}

            {orderHistory.length > 0 && (
              <div className="mt-10 rounded-[26px] border border-slate-200 bg-white p-5 sm:p-6">

                <h2 className="text-2xl font-bold text-slate-900">
                  Order Timeline
                </h2>

                <div className="mt-7">

                  {orderHistory.map(
                    (history, index) => {

                      const isLast =
                        index ===
                        orderHistory.length - 1;

                      return (
                        <div
                          key={
                            history.id ||
                            `${history.status}-${index}`
                          }
                          className="relative flex gap-4"
                        >

                          {!isLast && (
                            <div className="absolute left-[11px] top-7 h-full w-0.5 bg-sky-600" />
                          )}

                          <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs text-white">
                            ✓
                          </div>

                          <div className="pb-8">

                            <p className="font-semibold text-slate-900">
                              {history.status}
                            </p>

                            {history.message && (
                              <p className="mt-1 text-sm text-slate-600">
                                {history.message}
                              </p>
                            )}

                            <p className="mt-1 text-sm text-slate-500">
                              {formatDate(
                                history.created_at ||
                                  history.createdAt
                              )}
                            </p>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>
            )}

            {/* FALLBACK TIMELINE */}

            {orderHistory.length === 0 &&
              currentStatus !== "Cancelled" &&
              !returnStatuses.includes(
                currentStatus
              ) && (
                <div className="mt-10 rounded-[26px] border border-slate-200 bg-white p-5 sm:p-6">

                  <h2 className="text-2xl font-bold text-slate-900">
                    Order Timeline
                  </h2>

                  <div className="mt-7">

                    {statuses.map(
                      (status, index) => {

                        const completed =
                          index <=
                          currentStatusIndex;

                        const isLast =
                          index ===
                          statuses.length - 1;

                        return (
                          <div
                            key={status}
                            className="relative flex gap-4"
                          >

                            {!isLast && (
                              <div
                                className={`absolute left-[11px] top-7 h-full w-0.5 ${
                                  index <
                                  currentStatusIndex
                                    ? "bg-sky-600"
                                    : "bg-slate-200"
                                }`}
                              />
                            )}

                            <div
                              className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-4 border-white ${
                                completed
                                  ? "bg-sky-600"
                                  : "bg-slate-300"
                              }`}
                            >
                              {completed && (
                                <span className="text-xs text-white">
                                  ✓
                                </span>
                              )}
                            </div>

                            <div className="pb-8">

                              <p
                                className={`font-semibold ${
                                  completed
                                    ? "text-slate-900"
                                    : "text-slate-400"
                                }`}
                              >
                                {status}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {completed
                                  ? "Completed"
                                  : "Pending"}
                              </p>

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>
              )}

            {/* PAYMENT + ADDRESS */}

            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">

              <div className="rounded-[24px] border border-sky-200 bg-sky-50 p-5">

                <p className="font-semibold text-slate-900">
                  Payment Method
                </p>

                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  {getPaymentMethod(
                    currentOrder
                  )}
                </p>

              </div>

              <div className="rounded-[24px] border border-sky-200 bg-sky-50 p-5">

                <p className="font-semibold text-slate-900">
                  Delivery Address
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                  {getAddress(
                    currentOrder
                  )}
                </p>

              </div>

            </div>

            {/* CANCELLED */}

            {currentStatus === "Cancelled" && (
              <div className="mt-8 rounded-[24px] border border-red-200 bg-red-50 p-5">

                <p className="font-semibold text-red-700">
                  Order Cancelled
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  This order has been cancelled.
                </p>

                {currentOrder.cancellation_reason && (
                  <p className="mt-2 text-sm text-slate-600">
                    Reason:{" "}
                    {currentOrder.cancellation_reason}
                  </p>
                )}

              </div>
            )}

            {/* RETURN INFORMATION */}

            {currentStatus.startsWith("Return") && (
              <div className="mt-8 rounded-[24px] border border-orange-200 bg-orange-50 p-5">

                <p className="font-semibold text-orange-700">
                  Return Information
                </p>

                <p className="mt-2 text-sm text-slate-600">

                  {currentStatus ===
                    "Return Requested" &&
                    "Your return request is waiting for approval."}

                  {currentStatus ===
                    "Return Approved" &&
                    "Your return request has been approved."}

                  {currentStatus ===
                    "Return Picked Up" &&
                    "Your return package has been picked up."}

                  {currentStatus ===
                    "Return Completed" &&
                    "Your return has been completed."}

                </p>

                {currentOrder.return_reason && (
                  <p className="mt-3 text-sm text-slate-600">
                    <strong>Reason:</strong>{" "}
                    {currentOrder.return_reason}
                  </p>
                )}

              </div>
            )}

          </div>
        )}

      </div>

      {/* =====================================================
          CANCEL / RETURN MODAL
      ===================================================== */}

      {actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  {actionType === "cancel"
                    ? "Cancel Order"
                    : "Return Order"}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Order:{" "}
                  {getOrderNumber(
                    currentOrder
                  )}
                </p>

              </div>

              <button
                type="button"
                onClick={closeActionModal}
                disabled={actionLoading}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 hover:bg-slate-200 disabled:opacity-50"
              >
                ×
              </button>

            </div>

            {/* REASON */}

            <div className="mt-6">

              <label className="block">

                <span className="text-sm font-semibold text-slate-700">
                  {actionType === "cancel"
                    ? "Cancellation Reason"
                    : "Return Reason"}
                </span>

                <textarea
                  value={actionReason}
                  onChange={(event) =>
                    setActionReason(
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder={
                    actionType === "cancel"
                      ? "Please tell us why you want to cancel this order..."
                      : "Please tell us why you want to return this order..."
                  }
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />

              </label>

            </div>

            {/* MODAL ERROR */}

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* BUTTONS */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={closeActionModal}
                disabled={actionLoading}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Keep Order
              </button>

              <button
                type="button"
                onClick={submitOrderAction}
                disabled={actionLoading}
                className={`rounded-xl px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 ${
                  actionType === "cancel"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {actionLoading
                  ? "Please wait..."
                  : actionType === "cancel"
                    ? "Confirm Cancellation"
                    : "Submit Return"}
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default OrderTracking;