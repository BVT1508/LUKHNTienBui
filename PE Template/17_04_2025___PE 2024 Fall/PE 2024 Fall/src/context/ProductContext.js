import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState(""); 
    const [brand, setBrand] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API từng bước
                const productsRes = await axios.get("http://localhost:9999/product");
                setProducts(productsRes.data);
    
                const categoriesRes = await axios.get("http://localhost:9999/category");
                setCategories(categoriesRes.data);
    
                const brandsRes = await axios.get("http://localhost:9999/brand");
                setBrands(brandsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
    



    return (
        <ProductContext.Provider
            value={{
                products,
                categories,
                brands,
                category,
                setCategory, 
                brand,
                setBrand, 
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
