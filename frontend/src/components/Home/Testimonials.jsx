import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ava Thompson",
    role: "Creative Strategist",
    image: "/testimonials/ava.jpg",
    rating: 5,
    text: "Tweak Store transformed the way I discover and read books. Their collection and recommendations are always spot-on!",
    color: "#4f46e5",
  },
  {
    id: 2,
    name: "Liam Carter",
    role: "Software Engineer",
    image: "/testimonials/liam.jpg",
    rating: 5,
    text: "Such a clean and modern reading experience. I’ve learned so much from their carefully curated ebooks.",
    color: "#06b6d4",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Designer & Researcher",
    image: "/testimonials/sophia.jpg",
    rating: 5,
    text: "The perfect resource for anyone who loves to learn. Simple, elegant, and filled with valuable insights.",
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "Ethan Brown",
    role: "Entrepreneur",
    image: "/testimonials/ethan.jpg",
    rating: 5,
    text: "I’ve built better habits and grown professionally thanks to the resources I found here. Absolutely love it!",
    color: "#10b981",
  },
  {
    id: 5,
    name: "Olivia Johnson",
    role: "Marketing Manager",
    image: "/testimonials/olivia.jpeg",
    rating: 5,
    text: "Each ebook feels handpicked with purpose. TweakItUp makes self-growth effortless and enjoyable.",
    color: "#ec4899",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-[#fafafa] text-center font-sans">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-[2rem] md:text-[2.6rem] font-bold text-[#111] mb-3">
          What Our Readers Say
        </h2>
        <p className="text-gray-600 text-[16px] md:text-[18px]">
          Real feedback from people growing with TweakStore.
        </p>
      </div>

      {/* Tighter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-2 justify-items-center">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="w-full max-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col justify-between"
          >
            {/* Top: Quote + Text */}
            <div className="p-6 pb-8 relative">
              <Quote className="text-gray-300 w-6 h-6 mb-3 mx-auto" />
              <p className="text-gray-600 text-[15px] leading-relaxed">
                “{t.text}”
              </p>
            </div>

            {/* Bottom Color Section */}
            <div
              className="pt-6 pb-5 text-white rounded-b-2xl"
              style={{ backgroundColor: t.color }}
            >
              {/* Avatar */}
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 object-cover rounded-full mx-auto border-4 border-white shadow-md mb-3"
              />

              {/* Name & Role */}
              <h3 className="text-[16px] font-semibold">{t.name}</h3>
              <p className="text-[13px] text-gray-100">{t.role}</p>

              {/* Rating */}
              <div className="flex justify-center gap-1 mt-2 text-yellow-300">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
