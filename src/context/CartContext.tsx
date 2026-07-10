import { createContext } from "react";

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

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
});
