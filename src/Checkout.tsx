import { useContext } from "react";
import { Link } from "react-router";
import QtyBtn from "./components/QtyBtn";
import { CartContext } from "./context/CartContext";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const isCartEmpty = cartItems.length <= 0 ? true : false;

  const totalAmount = cartItems.reduce(
    (total, item) => (total += item.price * item.quantity),
    0,
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => (total += item.quantity),
    0,
  );

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl font-extrabold text-center py-6">
        Your Shopping Cart
      </h1>

      <div className=" p-6 flex items-start justify-between bg-orange-100 rounded-3xl gap-6">
        {isCartEmpty ? (
          <div className="w-full min-h-[548px] flex flex-col items-center justify-center">
            <h3 className="text-3xl">Your cart is empty</h3>
            <Link to="/products" className="hover:text-cyan-500">
              Bring me to Products page
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="w-full flex rounded-3xl items-center justify-between overflow-hidden bg-cyan-100 "
              >
                <Link to={"/products/" + item.id}>
                  <img
                    src={`${import.meta.env.BASE_URL}/` + item.image}
                    alt=""
                    className="object-cover h-60 w-72"
                  />
                </Link>
                <div className="items-center flex flex-1 justify-between px-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold">
                      {item.productName}
                    </h3>
                    <p className="text-black/60">{item.description}</p>
                    <p className="text-xl">${item.price}</p>
                  </div>
                  <QtyBtn
                    productInfo={item}
                    removeProduct={() => handleRemove(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={() => setCartItems([])}
            className="bg-red-300 text-3xl py-3 rounded-3xl hover:bg-red-500 w-full"
          >
            Clear Cart
          </button>
          <div className="flex flex-col p-6 items-center justify-center gap-4 bg-violet-100 rounded-3xl w-[350px] h-[500px]">
            <h2 className="text-4xl">Total ({totalQuantity})</h2>
            <h3 className="text-3xl">${totalAmount}</h3>
            <button className="w-full bg-purple-300 text-3xl px-3 py-1 rounded-full hover:bg-purple-500">
              Pay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
