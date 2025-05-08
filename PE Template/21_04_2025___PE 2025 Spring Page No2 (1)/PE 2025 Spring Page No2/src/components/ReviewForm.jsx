import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { Form, Button } from "react-bootstrap";

const ReviewForm = () => {
  const { selectedProduct, addReview } = useContext(ProductContext);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset form when selectedProduct changes
    setName("");
    setComment("");
    setRating(1);
    setSuccess(false);
    setErrors({});
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Reviewer Name is required";
    if (!comment.trim()) errs.comment = "Comment is required";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    await addReview(selectedProduct.id, {
      reviewerName: name,
      comment,
      rating,
      date: new Date().toISOString(),
    });

    setSuccess(true); // ✅ giữ selectedProduct, chỉ hiện thông báo
  };

  return (
    <div className="p-3 border bg-white rounded">
      <h6><strong>Reviews details:</strong></h6>
      <p><strong>ProductId:</strong> {selectedProduct.id}</p>
      <p><strong>Title:</strong> {selectedProduct.title}</p>
      <p><strong>Category:</strong> {selectedProduct.category}</p>
      <p><strong>Price:</strong> ${selectedProduct.price}</p>

      {success ? (
        <h5 className="text-success mt-4">Thanks for your review!</h5>
      ) : (
        <>
          <h6 className="mt-3"><strong>Add a new Review</strong></h6>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Reviewer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              isInvalid={!!errors.comment}
            />
            <Form.Control.Feedback type="invalid">
              {errors.comment}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="mb-3">
            <strong>Rating</strong>
            <div>
              {[1, 2, 3, 4, 5].map((r) => (
                <Form.Check
                  key={r}
                  inline
                  label={r}
                  type="radio"
                  name="rating"
                  value={r}
                  checked={rating === r}
                  onChange={() => setRating(r)}
                />
              ))}
            </div>
          </div>

          <Button variant="warning" onClick={handleSubmit}>
            Send Review
          </Button>
        </>
      )}
    </div>
  );
};

export default ReviewForm;
