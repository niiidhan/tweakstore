import React from "react";

const Footer = () => {
  const handleScrollTo = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 200;

    const targetY =
      el.getBoundingClientRect().top + window.scrollY - headerHeight - 5;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0f172a] text-gray-300 py-8 px-4 md:px-10 font-arial text-[13px] leading-snug">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Left: Brand Info */}
        <div>
          <h2 className="text-white text-xl font-sfpro mb-2">TWEAKSTORE</h2>
          <p className="text-gray-400 text-[13px] leading-relaxed max-w-xs">
            A curated digital library for curious minds — discover ebooks, guides,
            and resources that help you learn, grow, and build better.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div>
          <h3 className="text-white text-[15px] font-semibold mb-2">Explore</h3>
          <ul className="space-y-1.5">
            <li
              onClick={() => handleScrollTo("home")}
              className="hover:text-blue-400 cursor-pointer transition"
            >
              Home
            </li>
            <li
              onClick={() => handleScrollTo("categories-anchor")}
              className="hover:text-blue-400 cursor-pointer transition"
            >
              Categories
            </li>
            <li
              onClick={() => handleScrollTo("ebooks-start")}
              className="hover:text-blue-400 cursor-pointer transition"
            >
              Ebooks
            </li>
            <li
              onClick={() => handleScrollTo("contact")}
              className="hover:text-blue-400 cursor-pointer transition"
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Right: Newsletter */}
        <div>
          <h3 className="text-white text-[15px] font-semibold mb-2">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-400 text-[13px] mb-3 leading-relaxed">
            Get the latest ebooks, deals, and insights straight to your inbox.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center bg-gray-800 rounded-full overflow-hidden border border-gray-700 focus-within:ring-1 focus-within:ring-blue-500 transition"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-transparent text-gray-200 px-3 py-2 outline-none text-[13px] placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-[13px] font-medium transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-700 mt-6 mb-3 opacity-40"></div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-[12px]">
        © {new Date().getFullYear()} Tweakstore. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
