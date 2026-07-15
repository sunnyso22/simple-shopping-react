import { createContext, useState } from "react";

export type CartItems = {
  id: number;
  productName: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItems[];
  setCartItems: (items: CartItems[]) => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  return (
    <CartContext value={{ cartItems, setCartItems }}>{children}</CartContext>
  );
};

export { CartContext, CartContextProvider };
