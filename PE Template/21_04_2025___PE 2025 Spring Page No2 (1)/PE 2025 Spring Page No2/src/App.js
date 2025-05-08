import HomePage from "./pages/HomePage";
import ReviewTable from "./components/ReviewTable";
import { ProductProvider } from "./context/ProductContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reviews" element={<ReviewTable />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
