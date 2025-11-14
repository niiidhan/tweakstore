import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const words = ["LEARN", "GROW", "BUILD", "PROGRESS", "RISE", "FOCUS", "DISCOVER"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full bg-white flex flex-col items-center justify-center text-center font-calvino overflow-hidden"
      style={{
        minHeight: "calc(100vh - 120px)", // fill remaining height minus navbar height
        marginTop: "170px", // offset equal to navbar height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <section className="w-full flex flex-col items-center justify-center px-6 md:px-20">
        {/* Desktop View */}
        <h1 className="hidden md:block text-[2.8rem] md:text-[4rem] text-[#111] max-w-5xl tracking-tight font-juanabold leading-[1.1]">
          A COLLECTION OF BOOKS
          <br />
          FOR CURIOUS MINDS WHO
          <br />
          <span className="inline-flex items-baseline">
            LOVE TO&nbsp;
            <span
              className="relative inline-block align-baseline w-[230px]"
              style={{ height: "1em", verticalAlign: "baseline" }}
            >
              <span
                key={index}
                className="absolute left-0 text-blue-600 transition-opacity duration-500 ease-in-out whitespace-nowrap"
                style={{
                  top: 0,
                  lineHeight: "1em",
                  transform: "translateY(0.16em)",
                }}
              >
                {words[index]}
              </span>
            </span>
          </span>
        </h1>

        {/* Mobile View */}
        <h1 className="block md:hidden text-[1.9rem] text-[#111] font-juanabold leading-[1.2] tracking-tight mt-4">
          <span className="block">A COLLECTION OF BOOKS FOR</span>
          <span className="block">CURIOUS MINDS WHO LOVE TO</span>

          <span
            className="block relative h-[1.2em] mt-2"
            style={{ minHeight: "1.3em" }}
          >
            <span
              key={index}
              className="absolute left-1/2 -translate-x-1/2 text-blue-600 transition-opacity duration-500 ease-in-out"
            >
              {words[index]}
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <div className="mt-8 md:mt-10 max-w-3xl px-3 md:px-0">
          <p className="text-[13px] md:text-[15px] tracking-wide text-gray-900 leading-relaxed font-semibold uppercase font-juanathin">
            TWEAKSTORE IS A DIGITAL LIBRARY DESIGNED FOR THINKERS, MAKERS, AND
            LEARNERS. <br className="hidden md:block" />
            DISCOVER HANDPICKED EBOOKS, CURATED BUNDLES, AND RESOURCES THAT HELP YOU
            GROW, BUILD, AND EVOLVE.
          </p>
        </div>

        {/* Footer Line */}
        <div className="mt-12 text-gray-500 text-xs md:text-sm tracking-widest uppercase">
          <p>Scroll to Explore — Read, Learn, Evolve.</p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
