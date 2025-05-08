import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductProvider from "./context/ProductContext";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
    return (
        <ProductProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
            </Router>
        </ProductProvider>
    );
};

export default App;
