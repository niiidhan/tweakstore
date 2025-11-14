import React, { useEffect, useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Phone,
  Menu,
  X,
} from "lucide-react";
import booksData from "../../data/booksData";
import CartDrawer from "./CartDrawer";
import AuthModal from "../Auth/AuthModal";

// Shared Cart Store
import {
  subscribe,
  getCart,
  removeFromCart,
  addToCart,
} from "../../utils/cartStore";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(getCart());

  const [authOpen, setAuthOpen] = useState(false);

  // Sync cart globally
  useEffect(() => {
    const unsubscribe = subscribe(setCartItems);
    return unsubscribe;
  }, []);

  // Smooth Scroll Handler
  const handleScrollTo = (id) => {
    const headerHeight = 110;

    if (id === "ebooks-section") {
      const firstCard = document.querySelector("#ebooks-section .grid > div");
      const target = firstCard || document.getElementById(id);
      if (!target) return;

      const extra = 10;

      const yOffset =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        extra;

      window.scrollTo({ top: yOffset, behavior: "smooth" });
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    const yOffset =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: yOffset, behavior: "smooth" });
  };

  // Search update
  const handleSearchChange = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchTerm(val);

    if (val.length > 1) {
      const match = booksData.filter(
        (b) =>
          b.title.toLowerCase().includes(val) ||
          b.author.toLowerCase().includes(val) ||
          b.genre.toLowerCase().includes(val)
      );
      setSuggestions(match.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm fixed top-[48px] left-0 z-50 border-b border-gray-200">

        {/* TOP SECTION — DESKTOP UNTOUCHED */}
        <div className="w-full flex items-center justify-between px-6 md:px-10 py-3">
          <h1 className="font-juanathin text-2xl md:text-3xl">TWEAKSTORE</h1>

          {/* SEARCH BAR — DESKTOP ONLY */}
          <div className="hidden md:flex flex-col relative w-[45%]">
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-[6px] border border-gray-200 shadow-sm">
              <Search size={18} className="text-gray-500 ml-1" />

              <input
                type="text"
                placeholder="Search books"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-transparent outline-none px-3 text-base text-gray-700"
              />

              <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-[6px] rounded-full">
                Search
              </button>
            </div>

            {/* SEARCH SUGGESTIONS */}
            {suggestions.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                {suggestions.map((book) => {
                  const isInCart = cartItems.some((i) => i.id === book.id);

                  return (
                    <div
                      key={book.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <div
                        onClick={() => {
                          setSearchTerm(book.title);
                          setSuggestions([]);
                        }}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={book.image}
                          className="w-10 h-14 rounded-md border"
                        />
                        <div>
                          <p className="font-semibold text-sm">{book.title}</p>
                          <p className="text-xs text-gray-600">{book.author}</p>
                        </div>
                      </div>

                      {!isInCart ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(book);
                          }}
                          className="text-xs border px-3 py-1 rounded-full"
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(book.id);
                          }}
                          className="text-xs bg-red-50 border border-red-300 text-red-500 px-3 py-1 rounded-full"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT ICONS — DESKTOP UNTOUCHED */}
          <div className="flex items-center gap-5 text-gray-600">

            {/* Need Help — DESKTOP ONLY */}
            <div className="hidden md:flex items-center gap-3">
              <Phone size={20} className="text-blue-600" />
              <div>
                <p className="font-semibold">Need Help?</p>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
            </div>

            <User size={22} className="hover:text-blue-600 hidden md:block" />
            <Heart size={22} className="hover:text-blue-600 hidden md:block" />

            <div className="relative cursor-pointer">
              <ShoppingCart
                size={22}
                className="hover:text-blue-600"
                onClick={() => setCartOpen(true)}
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* ⭐ MOBILE HAMBURGER BUTTON */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 active:scale-90 transition"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* DESKTOP NAV — UNTOUCHED */}
        <nav className="hidden md:flex w-full font-sfpro">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

            <ul className="flex items-center gap-10 mx-auto text-base">
              <li
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="cursor-pointer hover:text-blue-600"
              >
                Home
              </li>
              <li
                onClick={() => handleScrollTo("categories-section")}
                className="cursor-pointer hover:text-blue-600"
              >
                Categories
              </li>
              <li
                onClick={() => handleScrollTo("ebooks-section")}
                className="cursor-pointer hover:text-blue-600"
              >
                Ebooks
              </li>
              <li
                onClick={() => handleScrollTo("contact")}
                className="cursor-pointer hover:text-blue-600"
              >
                Contact
              </li>
            </ul>

            <div className="absolute right-10">
              <button
                onClick={() => setAuthOpen(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
              >
                Login / Signup
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ⭐ MOBILE MENU ONLY — DESKTOP SAFE */}
      {mobileMenuOpen && (
        <div className="md:hidden font-sfpro fixed top-[110px] left-0 w-full bg-white shadow-xl px-6 py-5 z-[999] rounded-b-xl animate-fadeIn">

          <p
            className="py-3 border-b text-lg text-gray-700"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Home
          </p>

          <p
            className="py-3 border-b text-lg text-gray-700"
            onClick={() => {
              setMobileMenuOpen(false);
              handleScrollTo("categories-section");
            }}
          >
            Categories
          </p>

          <p
            className="py-3 border-b text-lg text-gray-700"
            onClick={() => {
              setMobileMenuOpen(false);
              handleScrollTo("ebooks-section");
            }}
          >
            Ebooks
          </p>

          <p
            className="py-3 text-lg text-gray-700"
            onClick={() => {
              setMobileMenuOpen(false);
              handleScrollTo("contact");
            }}
          >
            Contact
          </p>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setAuthOpen(true);
            }}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Login / Signup
          </button>
        </div>
      )}

      {/* MOBILE MENU ANIMATION */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn .25s ease;
          }
        `}
      </style>

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
      />

      {/* AUTH MODAL */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Navbar;
