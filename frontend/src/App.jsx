import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import { useEffect } from "react";

// 🌟 Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Always scroll to top
  }, [pathname]); // Runs on first load + route change

  return null;
}

export default function App() {
  return (
    <div>
      <ScrollToTop /> 

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
