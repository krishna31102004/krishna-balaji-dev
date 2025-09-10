import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const updateScrolled = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrolled(scrollPercent);
    };

    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
      <div 
        className="h-full bg-gradient-primary transition-all duration-150 ease-out"
        style={{ width: `${scrolled}%` }}
      />
    </div>
  );
}