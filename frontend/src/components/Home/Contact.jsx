import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const contactInputClass =
    "w-full border border-gray-200 bg-white px-4 py-2.5 rounded-lg outline-none " +
    "focus:ring-2 focus:ring-blue-400 text-[#0f172a] placeholder-gray-400 " +
    "transition-all duration-300";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "72a00fdf-1c6f-420d-8212-f79cf296a217");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thanks! We’ve received your message.", {
          icon: "✔️",
          className: "success-toast",
        });
        e.target.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-6 md:px-16 py-16 bg-white"
    >
      {/* NEW BEAUTIFUL TOAST */}
      <ToastContainer
        autoClose={2200}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        newestOnTop
        transition={Slide}
        position="top-right"
        style={{
          position: "fixed",
          top: "10px", // 👈 moved higher (real top-right corner)
          right: "15px",
          zIndex: 999999999,
          pointerEvents: "none",
        }}
        toastStyle={{
          background: "#ffffff",
          padding: "10px 14px", // 👈 smaller padding
          borderRadius: "10px", // 👈 slightly smaller
          borderLeft: "5px solid #22c55e",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          color: "#0f172a",
          fontFamily: "Calvino, sans-serif",
          fontSize: "12px", // 👈 smaller text
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minHeight: "48px", // 👈 compact height
        }}
      />

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-[2rem] md:text-[2.5rem] font-sfpro text-[#111]">
          Contact Us
        </h2>
        <p className="text-gray-600 text-[15px] md:text-[17px] mt-2 max-w-xl mx-auto leading-relaxed">
          Missing a title from our collection? Let us know — we’d love to hear
          from you!
        </p>
      </div>

      {/* Form + Image */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 p-6 md:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)] max-w-lg mx-auto">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#0f172a] text-sm font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={contactInputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-[#0f172a] text-sm font-semibold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={contactInputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#0f172a] text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Type your message..."
                className={`${contactInputClass} resize-none`}
                required
              ></textarea>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-2.5 font-semibold text-sm rounded-full shadow-md transition-all duration-300 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1 hidden md:flex justify-center items-center">
          <img
            src="/images/contact.jpg"
            alt="Contact Illustration"
            className="w-[90%] max-w-2xl object-contain scale-125"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
