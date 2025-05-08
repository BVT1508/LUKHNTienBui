import { useProductContext } from "../context/ProductContext";
import ProductTable from "../components/ProductTable";
import CartPanel from "../components/CartPanel";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products, categories, setCategory } = useProductContext();
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Shopping System</h2>

      {/* ✅ Dropdown + Order History trên cùng 1 hàng */}
      <Row className="align-items-center mb-3">
        <Col md={6}>
          <Form.Group style={{ maxWidth: "300px" }}>
            <Form.Select onChange={e => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Select all category" : cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6} className="text-end">
          <Button
            variant="success"
            size="sm"
            onClick={() => navigate("/orders")}
          >
            Order History
          </Button>
        </Col>
      </Row>

      {/* Danh sách sản phẩm và giỏ hàng */}
      <Row>
        <Col md={8}>
          <ProductTable products={products} />
        </Col>
        <Col md={4}>
          <div className="p-3 border rounded shadow-sm bg-white">
            <h5 className="mb-3">Cart</h5>
            <CartPanel />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
