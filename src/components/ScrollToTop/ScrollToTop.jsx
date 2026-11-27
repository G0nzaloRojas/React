import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ScrollToTop.css";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  // 1. Sube automáticamente al cambiar de ruta (ej: entrar a /product/:id)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Muestra/oculta el botón flotante al hacer scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="scroll-to-top-btn"
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      ↑
    </button>
  );
}
