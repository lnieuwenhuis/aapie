/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("products");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const pageSetter = (page) => {
    setPage(page);
  };

  const renderProducts = () => (
    <>
      <div class="body w-3/4 ml-auto mr-auto">
        <div class="grid grid-cols-3 gap-4 pt-5">
          {products.map((product, key) => {
            return (
              <div
                key={key}
                class="flex flex-col border border-gray-500 rounded-lg bg-gray-600"
              >
                <h1 class="text-center text-lg">
                  {product.title} - ${product.price}
                </h1>
                <img src={product.image} alt="image" class="p-3 pt-2"></img>
                <button
                  onClick={() => addToCart(product)}
                  class="place-self-center p-3 mb-3 bg-blue-600 bg-opacity-75 border border-blue-700 rounded-xl"
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  const renderCart = () => (
    <>
      <div class="body w-3/4 ml-auto mr-auto">
        <div class="grid grid-cols-3 gap-4 pt-5">
          {cart.map((product, key) => {
            return (
              <div
                key={key}
                class="flex flex-col border border-gray-500 rounded-lg bg-gray-600"
              >
                <h1 class="text-center text-lg">
                  {product.title} - ${product.price}
                </h1>
                <img src={product.image} alt="image" class="p-3 pt-2"></img>
                <button
                  onClick={() => removeFromCart(product)}
                  class="place-self-center p-3 mb-3 bg-blue-600 bg-opacity-75 border border-blue-700 rounded-xl"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <main>
      <header class="bg-gray-700 h-16 flex flex-row">
        <button
          onClick={() => pageSetter("products")}
          class="text-2xl  ml-auto p-4"
        >
          Products
        </button>
        <button
          onClick={() => pageSetter("cart")}
          class="text-2xl mr-auto p-4 flex flex-row"
        >
          Cart {cart.length > 0 && <h1>({cart.length})</h1>}
        </button>
      </header>
      {page === "products" && renderProducts()}
      {page === "cart" && renderCart()}
    </main>
  );
}
