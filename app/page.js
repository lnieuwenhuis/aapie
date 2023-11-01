/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("products");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const addToCart = (productToAdd) => {
    if (cart.length > 0) {
      cart.forEach((product, k) => {
        if (product.product.title === productToAdd.title) {
          product.amount = product.amount + 1;
          removeFromCart(product.product);
        } else if (product.product.title !== productToAdd.title) {
          setCart([
            ...cart,
            {
              ...{
                product: productToAdd,
                amount: 1,
              },
            },
          ]);
        }
      });
    } else if (cart.length === 0) {
      setCart([
        ...cart,
        {
          ...{
            product: productToAdd,
            amount: 1,
          },
        },
      ]);
    }
  };
  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getTotalSum = () => {
    let number = cart.reduce((sum, { price }) => sum + price, 0);
    let roundedNumber = Math.round(number * 100) / 100;
    return roundedNumber;
  };

  const getTotalAmount = () => {
    let number = cart.reduce((sum, { amount }) => sum + amount, 0);
    return number;
  };

  const renderCartLength = () => {
    getTotalAmount();
  };

  const renderHeader = () => (
    <header class="bg-gray-700 h-16 flex flex-row">
      <button
        onClick={() => navigateTo(PAGE_PRODUCTS)}
        class="text-2xl  ml-auto p-4"
      >
        Products
      </button>
      <button
        onClick={() => navigateTo(PAGE_CART)}
        class="text-2xl mr-auto p-4 flex flex-row"
      >
        Cart {cart.length > 0 && <h1>({getTotalAmount()})</h1>}
      </button>
    </header>
  );

  const renderCart = () => (
    <>
      <div class="body w-3/4 ml-auto mr-auto">
        <h1 class="text-4xl text-center mt-5">Cart</h1>
        <div class="flex flex-col mt-4">
          {cart.length > 0 &&
            cart.map((product, key) => {
              return (
                <div
                  key={key}
                  class="flex flex-row border border-gray-500 rounded-lg bg-gray-600 h-20 mt-1.5"
                >
                  <img
                    src={product.product.image}
                    alt="image"
                    class="p-1"
                  ></img>

                  <h1 class="text-center text-2xl mt-auto mb-auto ml-2">
                    {product.product.title}
                  </h1>
                  <h1 class="text-2xl mt-auto mb-auto ml-auto mr-3">
                    ${product.product.price}
                  </h1>
                  {product.amount > 1 && (
                    <h1 class="text-2xl mt-auto mb-auto mr-3">
                      * {product.amount}
                    </h1>
                  )}

                  <button
                    onClick={() => removeFromCart(product)}
                    class="place-self-center p-4 mr-3 bg-blue-600 bg-opacity-75 border border-blue-700 rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
        </div>
        {cart.length === 0 && (
          <>
            <h1 class="text-4xl ml-auto mr-auto text-center">
              No items in cart
            </h1>
            <h2 class="text-center mt-2 text-lg">
              Please return to the product page and add some into your cart
            </h2>
          </>
        )}
      </div>
      {cart.length > 0 && (
        <div class="w-3/4 ml-auto mr-auto flex">
          <h1 class="ml-auto text-xl mt-1 mr-1">
            Total Cost: ${getTotalSum()}
          </h1>
        </div>
      )}
    </>
  );

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

  return (
    <main>
      {renderCartLength()}
      {renderHeader()}

      {page === PAGE_PRODUCTS && renderProducts()}
      {page === PAGE_CART && renderCart()}
    </main>
  );
}
