import ProductList from "../components/ProductList";
import ReviewForm from "../components/ReviewForm";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory
  } = useContext(ProductContext);

  return (
    <div className="bg-light py-4">
      <Container fluid="lg">
        {/* Tiêu đề trung tâm */}
        <h3 className="text-center mb-4">Products Review System</h3>

        {/* Dropdown + Button cùng hàng, trái - phải */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Select
            className="w-25"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "Select all category" : cat}
              </option>
            ))}
          </Form.Select>

          <Link to="/reviews">
            <Button variant="success">Show Review List</Button>
          </Link>
        </div>

        {/* Product list + review form ngang hàng */}
        <Row>
          <Col md={9}>
            <ProductList />
          </Col>
          <Col md={3}>
            <ReviewForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
