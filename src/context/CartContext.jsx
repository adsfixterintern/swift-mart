"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
const [cart, setCart] = useState(() => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart")) || [];
});

  // Load from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const updateQuantity = (id, color, size, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          let newQuantity = item.quantity;
          
          if (type === "increment") newQuantity += 1;
          if (type === "decrement" && newQuantity > 1) newQuantity -= 1; 
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price, 
          };
        }
        return item;
      })
    );
  };


const removeFromCart = (id, color, size) => {
  setCart(prev => 
    prev.filter(item => !(item.id === id && item.color === color && item.size === size))
  );
};
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart,updateQuantity, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
