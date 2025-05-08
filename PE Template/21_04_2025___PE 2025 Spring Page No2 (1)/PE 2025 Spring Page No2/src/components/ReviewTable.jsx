import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

const ReviewTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">List of Reviews</h3>
      <Table bordered hover>
        <thead className="table-dark text-center">
          <tr>
            <th style={{ width: "10%" }}>ProductId</th>
            <th style={{ width: "20%" }}>Title</th>
            <th colSpan={4}>Reviews</th>
          </tr>
          <tr>
            <th colSpan={2}></th>
            <th style={{ width: "20%" }}>Date</th>
            <th style={{ width: "15%" }}>Reviewer</th>
            <th style={{ width: "35%" }}>Comment</th>
            <th style={{ width: "10%" }}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) =>
            product.reviews.map((review, index) => (
              <tr key={`${product.id}-${index}`}>
                {index === 0 && (
                  <>
                    <td rowSpan={product.reviews.length} className="align-middle text-center">
                      {product.id}
                    </td>
                    <td rowSpan={product.reviews.length} className="align-middle">
                      {product.title}
                    </td>
                  </>
                )}
                <td>{formatDate(review.date)}</td>
                <td>{review.reviewerName}</td>
                <td>{review.comment}</td>
                <td className="text-center">{review.rating}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ReviewTable;
