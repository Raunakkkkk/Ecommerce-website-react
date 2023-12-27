import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import DropDown from "../components/FilterDropDown";
import SearchBar from "../components/SearchBar";
import { getAllProducts, getProductsByCategory, searchProduct } from "../APICalls";

function Home(props) {
  const [inventory, setInventory] = useState([]);
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");

  function handleFilter(category) {
    if (category === "All") {
      getAllProducts().then((res) => {
        setInventory(res.data.products);
      });
    } else {
      getProductsByCategory(category).then((res) => {
        setInventory(res.data.products);
      });
    }
  }

  function handleSearch(searchTerm) {

    searchProduct(searchTerm).then((res) => {

      setInventory(res.data.products);
    });

  }

  useEffect(() => {
    getAllProducts().then((res) => {
      setInventory(res.data.products);
    });
  }, []);

  return (
    <div>
      <Hero />
      <div className="container py-5">
        <div className="row  mb-3">
          <div className="col-md-6">
            <DropDown onFilter={handleFilter} />
          </div>
          <div className="col-md-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="row">
          {inventory.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <ProductCard
                id={item.id}
                title={item.title}
                description={item.description}
                rating={item.rating}
                price={item.price}
                img={item.thumbnail}
                category={item.category}
                stock={item.stock}
                brand={item.brand}
                onAdd={props.onAdd}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
