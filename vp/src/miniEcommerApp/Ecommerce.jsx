// 📁 App.jsx
import React, { useState, useEffect } from "react";
import productsData from "./Product";

export default function Ecommerce() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filtered = productsData
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .filter((p) => (inStockOnly ? p.inStock : true))
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>🛍️ Mini eCommerce</h2>

      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)} defaultValue="">
        <option value="">All Categories</option>
        <option value="clothing">Clothing</option>
        <option value="electronics">Electronics</option>
      </select>

      <select onChange={(e) => setSort(e.target.value)} defaultValue="">
        <option value="">Sort</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={() => setInStockOnly(!inStockOnly)}
        />{" "}
        In Stock Only
      </label>

      <h3>Products ({filtered.length})</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <p>{p.inStock ? "In Stock" : "Out of Stock"}</p>
            <button
              className="bg-blue-100 px-4 py-1"
              disabled={!p.inStock}
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h3>🛒 Cart ({cart.length})</h3>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{ marginBottom: 10 }}
          className="flex items-center border justify-between"
        >
          <strong>{item.name}</strong> - ₹{item.price} × {item.quantity}
          <div className="ml-20 border">
            <button
              onClick={() => addToCart(item)}
              className="bg-green-200 px-4 py-1"
            >
              Increment
            </button>
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="bg-blue-200 px-4 py-1"
            >
              Decrement
            </button>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-200 px-4 py-1"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h4>Total: ₹{total}</h4>
    </div>
  );
}
