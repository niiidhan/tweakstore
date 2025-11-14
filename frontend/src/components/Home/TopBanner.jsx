import React from "react";

const TopBanner = () => {
  const text = "Sale is live now! Up to 10% off on all items.";

  return (
    <div
      id="top-banner"
      className="w-full bg-black text-white py-4 overflow-hidden z-[99999]"
      style={{
        position: "fixed",     // 🔒 stays fixed to viewport
        top: 0,                // sticks to very top
        left: 0,               // aligns left edge
        width: "100%",         // full width
        pointerEvents: "auto", // ensure it’s interactive if needed
      }}
    >
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Wrapper */}
      <div className="relative flex overflow-hidden">
        {/* Scrolling content */}
        <div className="flex whitespace-nowrap animate-[scroll_60s_linear_infinite]">
          {/* First copy */}
          {[...Array(20)].map((_, i) => (
            <span key={`a-${i}`} className="mx-3 text-sm font-medium">
              {text}
            </span>
          ))}

          {/* Duplicate copy for seamless looping */}
          {[...Array(20)].map((_, i) => (
            <span key={`b-${i}`} className="mx-3 text-sm font-medium">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
