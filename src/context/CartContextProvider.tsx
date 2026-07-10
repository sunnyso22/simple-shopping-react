import { useState } from "react";
import { CartContext } from "./CartContext";
import { CartItems } from "./CartContext";

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  return (
    <CartContext value={{ cartItems, setCartItems }}>{children}</CartContext>
  );
};

export default CartContextProvider;
