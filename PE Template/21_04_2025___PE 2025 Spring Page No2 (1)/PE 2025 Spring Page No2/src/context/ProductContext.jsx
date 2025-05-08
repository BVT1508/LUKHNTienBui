import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:9999/products");
    setProducts(res.data);
  };

  const addReview = async (productId, review) => {
    const product = products.find(p => p.id === productId);
    const updatedProduct = {
      ...product,
      reviews: [...product.reviews, review],
    };

    await axios.patch(`http://localhost:9999/products/${productId}`, updatedProduct);
    await fetchProducts();

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        addReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};