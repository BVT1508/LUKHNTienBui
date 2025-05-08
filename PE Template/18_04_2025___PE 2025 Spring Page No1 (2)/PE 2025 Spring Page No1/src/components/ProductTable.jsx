import { Table, Button } from "react-bootstrap";

import { useProductContext } from "../context/ProductContext";

const ProductTable = ({ products }) => {
  const { addToCart } = useProductContext();

  const calcAverageRate = (reviews) => {
    if (!reviews.length) return "0.00";
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(2);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Rate</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.title}</td>
            <td>{p.category}</td>
            <td>${p.price}</td>
            <td>{calcAverageRate(p.reviews)}</td>
            <td><Button onClick={() => addToCart(p)}>Add to Cart</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
