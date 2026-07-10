import { useEffect, useState } from "react";
import { Link, useNavigate, useOutlet } from "react-router";
import { CartItems } from "./context/CartContext";

export type Product = Omit<CartItems, "quantity">;

const Products = () => {
  let [productList, setProductList] = useState<Product[]>([]);

  const outlet = useOutlet();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://sunnyso22.github.io/testing-api/simple-shopping-products.json",
    )
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);

  return (
    <section className="container mx-auto">
      {outlet || (
        <ul className="flex flex-wrap gap-6 items-center justify-center py-6">
          {productList.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center justify-center gap-3 bg-cyan-100 rounded-3xl h-[480px] w-[384px]"
            >
              <Link to={"/products/" + item.id}>
                <img
                  src={`${import.meta.env.BASE_URL}/` + item.image}
                  alt=""
                  className="object-cover rounded-xl h-60 w-72"
                />
              </Link>
              <div className="flex items-center justify-around gap-3">
                <h3 className="text-2xl font-semibold">{item.productName}</h3>
                <p className="text-xl">${item.price}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="bg-green-300 text-2xl px-3 py-1 rounded-full hover:bg-green-500"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Products;
