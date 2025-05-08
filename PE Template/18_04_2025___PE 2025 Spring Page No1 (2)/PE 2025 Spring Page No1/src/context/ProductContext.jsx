import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("all");

    const [cart, setCart] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:9999/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Failed to fetch products", err));
    }, []);

    const categories = ["all", ...new Set(products.map(p => p.category))];

    const filteredProducts = category === "all"
        ? products
        : products.filter(p => p.category === category);

    const addToCart = (product) => {
        setSuccess(false);
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const clearCart = () => setCart([]);
    return (
        <ProductContext.Provider value={{
            products: filteredProducts,
            categories,
            setCategory,
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            success,
            setSuccess,
          }}>
            {children}
          </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
