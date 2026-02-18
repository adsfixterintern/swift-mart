"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity, color, size) => {
    setCart(prev => {
      const index = prev.findIndex(
        item =>
          item.id === product.id &&
          item.color === color &&
          item.size === size
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        updated[index].totalPrice =
          updated[index].quantity * product.discountPrice;
        return updated;
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.productName,
          price: product.discountPrice,
          quantity,
          color,
          size,
          image: product.images[0],
          totalPrice: product.discountPrice * quantity,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
