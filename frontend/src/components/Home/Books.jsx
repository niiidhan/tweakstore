import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import {
  addToCart,
  removeFromCart,
  subscribe,
  getCart,
} from "../../utils/cartStore";

const Books = () => {
  const navigate = useNavigate();

  const books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", genre: "Self Improvement", price: 39, image: "/cover/atomic-habits.jpg" },
    { id: 2, title: "Deep Work", author: "Cal Newport", genre: "Productivity", price: 39, image: "/cover/deep-work.jpg" },
    { id: 3, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", genre: "Personal Growth", price: 39, image: "/cover/subtle-art.jpg" },
    { id: 4, title: "Think Like a Monk", author: "Jay Shetty", genre: "Mindfulness", price: 39, image: "/cover/think-line-a-monk.jpg" },
    { id: 5, title: "Start With Why", author: "Simon Sinek", genre: "Leadership", price: 39, image: "/cover/start-with-why.jpg" },
    { id: 6, title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", price: 39, image: "/cover/the-psychology-of-money.jpg" },
    { id: 7, title: "Ego Is The Enemy", author: "Ryan Holiday", genre: "Philosophy", price: 39, image: "/cover/ego-is-the-enemy.jpg" },
    { id: 8, title: "Make Time", author: "Jake Knapp", genre: "Time Management", price: 39, image: "/cover/make-time.png" },
    { id: 9, title: "Show Your Work", author: "Austin Kleon", genre: "Creativity", price: 39, image: "/cover/show-your-work.png" },
    { id: 10, title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", genre: "Wisdom", price: 39, image: "/cover/the-almanack-of-naval-ravikant.jpg" },
    { id: 11, title: "Steal Like an Artist", author: "Austin Kleon", genre: "Creativity", price: 39, image: "/cover/steel-like-an-artist.jpeg" },
    { id: 12, title: "Your Next Five Moves", author: "Patrick Bet-David", genre: "Strategy", price: 39, image: "/cover/your-next-five-moves.jpg" },
    { id: 13, title: "Tools of Titans", author: "Tim Ferriss", genre: "Productivity", price: 39, image: "/cover/tools-of-titan.jpg" },
    { id: 14, title: "The Mountain Is You", author: "Brianna Wiest", genre: "Self Discovery", price: 39, image: "/cover/the-mountain-is-you.jpg" },
    { id: 15, title: "Can’t Hurt Me", author: "David Goggins", genre: "Motivation", price: 39, image: "/cover/cant-hurt-me.jpeg" },
    { id: 16, title: "The Four-Hour Workweek", author: "Tim Ferriss", genre: "Lifestyle Design", price: 39, image: "/cover/the-four-hour-workweek.jpg" },
    { id: 17, title: "Think and Grow Rich", author: "Napoleon Hill", genre: "Success", price: 39, image: "/cover/think-and-grow-rich.jpg" },
    { id: 18, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", genre: "Finance", price: 39, image: "/cover/rich-dad-poor-dad.jpg" },
    { id: 19, title: "Zero to One", author: "Peter Thiel", genre: "Entrepreneurship", price: 39, image: "/cover/zero-to-one.jpeg" },
    { id: 20, title: "Outliers", author: "Malcolm Gladwell", genre: "Psychology", price: 39, image: "/cover/outliers.jpg" },
    { id: 21, title: "Drive", author: "Daniel Pink", genre: "Motivation", price: 39, image: "/cover/drive.jpg" },
  ];

  const genres = ["All", ...new Set(books.map((book) => book.genre))];

  const [selectedGenre, setSelectedGenre] = useState("All");
  const [cartItems, setCartItems] = useState(getCart());
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribe(setCartItems);
    return unsubscribe;
  }, []);

  const filteredBooks =
    selectedGenre === "All"
      ? books
      : books.filter((b) => b.genre === selectedGenre);

  return (
    <>
      {/* ⭐ Navbar scroll target for categories */}
      <section id="categories-section"></section>

      {/* ⭐ Navbar scroll target for ebooks */}
      <section
        id="ebooks-section"
        className="w-full bg-[#fafafa] py-28 px-6 md:px-20 font-calvino overflow-hidden transition-all duration-500 relative"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[2.4rem] md:text-[3.4rem] font-juanabold text-[#111] mb-3">
            Explore Our Collection
          </h2>
          <p className="text-gray-600 text-[16px] md:text-[18px] font-juanathin max-w-2xl mx-auto">
            A visual library of powerful reads — filter by category to find your next favorite.
          </p>
        </div>

        {/* Genres Filter */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-16">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedGenre === genre
                  ? "bg-[#111] text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-10 gap-y-10 justify-items-center">
          {filteredBooks.map((book) => {
            const inCart = cartItems.some((item) => item.id === book.id);
            return (
              <div
                key={book.id}
                className="group flex flex-col items-center text-center cursor-pointer w-[160px] md:w-[180px] xl:w-[190px]"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] bg-gray-200 transition-transform duration-500 group-hover:scale-[1.05]">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <button
                      onClick={() =>
                        inCart ? removeFromCart(book.id) : addToCart(book)
                      }
                      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                        inCart
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-white text-black hover:bg-green-900 hover:text-white"
                      }`}
                    >
                      {inCart ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-[2px]">
                  <h3 className="text-[15px] md:text-[16px] font-semibold text-[#111] leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-[13px] text-gray-600">{book.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
      />
    </>
  );
};

export default Books;
