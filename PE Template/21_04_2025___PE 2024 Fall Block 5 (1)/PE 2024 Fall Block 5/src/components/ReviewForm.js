import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ReviewForm = ({ productId }) => {
    const { setSelectedProduct } = useContext(ProductContext);
    const [review, setReview] = useState({ reviewerName: "", comment: "", rating: 1 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!review.reviewerName || !review.comment) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:9999/products/${productId}`);
            const updatedReviews = [...response.data.reviews, review];

            await axios.patch(`http://localhost:9999/products/${productId}`, { reviews: updatedReviews });

            alert("Review added successfully!");
            setSelectedProduct({ ...response.data, reviews: updatedReviews });
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group>
                <Form.Label>Reviewer Name</Form.Label>
                <Form.Control
                    type="text"
                    value={review.reviewerName}
                    onChange={(e) => setReview({ ...review, reviewerName: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    required
                />
            </Form.Group>
            <div>
                {[1, 2, 3, 4, 5].map((num) => (
                    <Button key={num} onClick={() => setReview({ ...review, rating: num })}>
                        {num} ⭐
                    </Button>
                ))}
            </div>
            <Button type="submit" className="mt-2">Submit Review</Button>
        </Form>
    );
};

export default ReviewForm;
