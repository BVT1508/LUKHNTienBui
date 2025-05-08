import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import { ProductProvider } from "./context/ProductContext";
import OrderHistory from "./pages/OrderHistory";
function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
