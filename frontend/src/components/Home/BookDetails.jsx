import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  if (!book) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Book not found. <span onClick={() => navigate("/")} className="text-blue-600 underline cursor-pointer">Go back</span>.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 md:px-20 py-28 font-calvino">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left - Image */}
        <div className="flex justify-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-[260px] md:w-[300px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] object-cover"
          />
        </div>

        {/* Right - Info */}
        <div>
          <h2 className="text-[2.4rem] md:text-[3rem] font-juanabold text-[#111] mb-4 leading-tight">
            {book.title}
          </h2>
          <p className="text-gray-700 text-lg mb-2">By <span className="font-semibold">{book.author}</span></p>
          <p className="text-sm text-gray-500 italic mb-6">{book.genre}</p>
          <p className="text-gray-600 leading-relaxed">
            This book is part of our curated TweakItUp collection — a handpicked read
            that helps you learn, grow, and evolve through practical wisdom and timeless ideas.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-sm font-semibold transition-all duration-300 shadow-md"
          >
            ← Back to Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
