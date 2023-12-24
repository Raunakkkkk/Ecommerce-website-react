import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";
import ContactUs from "./Pages/Contact";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

const cartFromLocalStorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

function App() {
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  useEffect(() => {
    console.log(cartItems);
    const json = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", json);
  }, [cartItems]);

  function onAdd(product) {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  }

  function onRemove(product) {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }
  }

  function onDelete(product) {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation
          countCartItems={cartItems.length}
          onAdd={onAdd}
          onRemove={onRemove}
          cartItems={cartItems}
          onDelete={onDelete}
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute />}>
            <Route path="" element={<Home onAdd={onAdd} />} />
            <Route
              path="products/:id"
              element={<ProductPage onAdd={onAdd} />}
            />
          </Route>
          <Route path="/contact" element={<ContactUs />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
