import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.tsx";
import { Product } from "../Products";

const QtyBtn = ({
  productInfo,
  removeProduct,
}: {
  productInfo: Product;
  removeProduct?: () => void;
}) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const productIndexInCart = cartItems.findIndex((element) => {
    return element.id === productInfo.id;
  });

  const [qtyInCart, setQtyInCart] = useState(
    productIndexInCart === -1 ? 0 : cartItems[productIndexInCart].quantity,
  );

  const handleAdd = () => {
    if (productIndexInCart === -1) {
      setCartItems([
        {
          id: productInfo.id,
          productName: productInfo.productName,
          price: productInfo.price,
          image: productInfo.image,
          description: productInfo.description,
          quantity: 1,
        },
        ...cartItems,
      ]);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexInCart].quantity++;
      setCartItems(newCartArray);
    }

    setQtyInCart(qtyInCart + 1);
  };

  const handleSubtract = () => {
    if (cartItems[productIndexInCart].quantity === 1) {
      let newCartArray = [...cartItems];
      newCartArray.splice(productIndexInCart, 1);
      setCartItems(newCartArray);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexInCart].quantity--;
      setCartItems(newCartArray);
    }

    setQtyInCart(qtyInCart - 1);
  };

  return (
    <div>
      {qtyInCart === 0 ? (
        <button
          onClick={handleAdd}
          className="bg-cyan-300 text-2xl px-3 py-1 rounded-full hover:bg-cyan-500"
        >
          Add to Cart
        </button>
      ) : removeProduct ? (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleAdd}
            className="bg-cyan-300 text-3xl px-3 py-1 rounded-full hover:bg-cyan-500"
          >
            +
          </button>
          <p className="text-3xl">{qtyInCart}</p>
          <button
            onClick={handleSubtract}
            className="bg-cyan-300 text-3xl px-3 py-1 rounded-full hover:bg-cyan-500"
          >
            -
          </button>
          <button
            onClick={removeProduct}
            className="bg-red-300 text-3xl px-3 py-1 rounded-full hover:bg-red-500"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleAdd}
            className="bg-cyan-300 text-3xl px-3 py-1 rounded-full hover:bg-cyan-500"
          >
            +
          </button>
          <p className="text-3xl">{qtyInCart}</p>
          <button
            onClick={handleSubtract}
            className="bg-cyan-300 text-3xl px-3 py-1 rounded-full hover:bg-cyan-500"
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default QtyBtn;
