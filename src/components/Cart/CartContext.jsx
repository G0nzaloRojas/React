/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((prod) => prod.id === item.id);

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: (updatedCart[existingIndex].quantity || 1) + quantity,
        };
        return updatedCart;
      }

      return [...prevCart, { ...item, quantity }];
    });
    toast.success("Producto agregado al carrito");
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  };

  const total = () => {
    return cart.reduce((acc, item) => {
      const precio = item.precio ?? item.price ?? 0;
      const cantidad = item.quantity || 1;
      return acc + precio * cantidad;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        getTotalItems,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};