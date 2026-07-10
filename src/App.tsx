import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./Home";
import Checkout from "./Checkout";
import Products from "./Products";
import ProductDetail from "./components/ProductDetail";
import CartContextProvider from "./context/CartContextProvider";

function App() {
  const links = [
    {
      name: "Home",
      path: "/",
      element: <Home />,
    },
    {
      name: "Products",
      path: "/products",
      element: <Products />,
    },
    {
      name: "Checkout",
      path: "/checkout",
      element: <Checkout />,
    },
  ];

  return (
    <BrowserRouter basename="/simple-shopping-react">
      <nav className="flex py-4 px-4 items-center justify-between">
        <Link to="/" className="text-4xl font-extrabold italic">
          Sunny Fruits
        </Link>
        <div className="flex gap-6">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-2xl font-medium hover:text-cyan-500"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <CartContextProvider>
        <Routes>
          {links.map((item, index) => {
            if (item.name === "Products") {
              return (
                <Route key={index} path={item.path} element={item.element}>
                  <Route path=":id" element={<ProductDetail />} />
                </Route>
              );
            } else
              return (
                <Route key={index} path={item.path} element={item.element} />
              );
          })}
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
