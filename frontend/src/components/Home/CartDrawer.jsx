import React, { useEffect } from "react";
import { X, Trash2 } from "lucide-react";

const CartDrawer = ({ isOpen, onClose, cartItems = [], onRemove }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const isEmpty = cartItems.length === 0;

  /* -----------------------------------------------------
     Razorpay + Secure Backend Flow
  ----------------------------------------------------- */
  const handleCheckout = async () => {
    try {
      // 1️⃣ Get Razorpay Key from backend
      const keyRes = await fetch("http://localhost:5000/get-key");
      const { key } = await keyRes.json();

      // 2️⃣ Create Order
      const orderRes = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await orderRes.json();

      // 3️⃣ Razorpay Checkout Options
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "TWEAKSTORE",
        description: "Ebook Purchase",
        order_id: order.id,

        handler: async function (response) {
          // 4️⃣ Verify payment on backend
          const verifyRes = await fetch(
            "http://localhost:5000/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                files: cartItems.map((b) => b.title),
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // 5️⃣ Download all books automatically
            cartItems.forEach((item) => {
              const filename = item.title;
              window.location.href = `http://localhost:5000/download/${verifyData.token}/${filename}`;
            });
          }
        },

        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },

        theme: { color: "#111" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <>
      {/* Dim Background */}
      <div
        className={`fixed top-[48px] left-0 w-full h-[calc(100vh-48px)] bg-black/50 backdrop-blur-[2px] transition-all duration-500 z-[9998] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-[48px] right-0 h-[calc(100vh-48px)] w-full sm:w-[400px] bg-white shadow-lg transform transition-transform duration-500 z-[9999] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 -mt-10">
              <p className="text-lg font-medium mb-2">Your cart is empty 🛒</p>
              <p className="text-sm text-gray-400">
                Start adding your favorite books!
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b border-gray-100 py-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[55px] h-[80px] object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.author}</p>
                  <p className="text-blue-600 text-sm font-semibold mt-1">
                    ₹{item.price}
                  </p>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-600 p-1 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t bg-gray-50 px-5 py-5 sticky bottom-0">
            <div className="flex justify-between mb-3">
              <p className="text-sm text-gray-700">Subtotal</p>
              <p className="text-lg font-semibold text-gray-900">₹{total}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-md text-sm transition-all"
            >
              Proceed to Checkout
            </button>

            <p className="text-[11px] text-gray-500 mt-3">
              Note: eBooks are licensed for personal use only.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
