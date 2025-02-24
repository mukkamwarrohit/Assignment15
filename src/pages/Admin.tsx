import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Product } from "../types";

const Admin = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [newProduct, setNewProduct] = useState<Product>({
    id: Date.now(), // Generate unique ID dynamically
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "https://via.placeholder.com/150",
  });

  if (state.user !== "admin") {
    return <h2>Access Denied! Admins Only.</h2>;
  }

  const handleAddProduct = () => {
    if (newProduct.title && newProduct.price > 0 && newProduct.category) {
      dispatch({ type: "ADD_PRODUCT", payload: newProduct });

      // Check if category exists, if not, add it
      if (!state.categories.includes(newProduct.category)) {
        dispatch({ type: "SET_CATEGORIES", payload: [...state.categories, newProduct.category] });
      }

      // Reset the input fields
      setNewProduct({
        id: Date.now(),
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "https://via.placeholder.com/150",
      });
    } else {
      alert("Please enter valid product details.");
    }
  };

  const handleDeleteProduct = (id: number) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });

    // Remove category if no products belong to it
    const remainingProducts = state.products.filter((product) => product.id !== id);
    const remainingCategories = Array.from(new Set(remainingProducts.map((p) => p.category)));
    dispatch({ type: "SET_CATEGORIES", payload: ["all", ...remainingCategories] });
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {/* Add Product Form */}
      <div>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Manage Products */}
      <h3>Manage Products</h3>
      {state.products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        state.products.map((product) => (
          <div key={product.id}>
            <h4>{product.title} - ${product.price}</h4>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
