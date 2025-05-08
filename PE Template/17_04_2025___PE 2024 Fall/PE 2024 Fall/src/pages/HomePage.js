import React from "react";
import CategoryFilter from "../components/CategoryFilter";
import BrandFilter from "../components/BrandFilter";
import ProductList from "../components/ProductList";
import { Container, Row, Col } from "react-bootstrap"; // Import React-Bootstrap

const HomePage = () => {
    return (
        <Container>
            <Row className="my-4">
                <Col md={3}>
                    <div className="p-3">                
                        <CategoryFilter />
                        <hr />
                        <BrandFilter />
                    </div>
                </Col>
                <Col md={9}>
                    <h3 className="text-center mb-4">List of Products</h3>
                    <ProductList />
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
