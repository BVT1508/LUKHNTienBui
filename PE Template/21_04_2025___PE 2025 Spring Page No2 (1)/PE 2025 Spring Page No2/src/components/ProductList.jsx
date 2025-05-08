import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Card, Button, Row, Col } from "react-bootstrap";

const ProductList = () => {
  const {
    products,
    selectedCategory,
    setSelectedProduct
  } = useContext(ProductContext);

  const getAverageRate = (reviews) => {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const filtered = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <Row>
      {filtered.map((p) => (
        <Col key={p.id} md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>Price: ${p.price}</Card.Text>
                <Card.Text>Category: {p.category}</Card.Text>
                <Card.Text><strong>Average Rate:</strong> {getAverageRate(p.reviews)}</Card.Text>
              </div>
              <Button
                className="mt-3 w-100"
                variant="primary"
                onClick={() => setSelectedProduct(p)}
              >
                Add New Review
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
