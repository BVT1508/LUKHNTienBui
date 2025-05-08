import { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { Table, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const CartPanel = () => {
    const { cart, removeFromCart, clearCart, setSuccess, success } = useProductContext();
    const [address, setAddress] = useState("");

    const placeOrder = async () => {
        if (!address.trim() || cart.length === 0) return;

        const payload = {
            orderDate: new Date().toISOString(),
            shipAddress: address,
            products: cart.map(p => ({
                id: p.id,
                name: p.title,
                price: p.price,
                quantity: p.quantity
            }))
        };

        try {
            await axios.post("http://localhost:9999/orders", payload);
            setAddress("");
            clearCart();
            setSuccess(true);
        } catch (err) {
            alert("Failed to place order!");
        }
    };

    if (success) {
        return (
            <div className="text-success fw-bold">
                <p>Your cart is empty!</p>
                <p style={{ color: "green", fontWeight: "bold" }}>Thank you for your order!</p>
                <p className="text-success">Your order has been placed successfully.</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return <p>Your cart is empty!</p>;
    }

    return (
        <>
            <Table bordered size="sm" className="mb-3">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <Form.Group className="mb-2">
                <Form.Label className="fw-semibold">Ship Address</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Tòa BE, Đại học FPT, Hà Nội"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </Form.Group>



            <div className="d-flex justify-content-end">
                <Button
                    variant="warning"
                    onClick={placeOrder}
                    className="text-white fw-bold"
                >
                    Place Order
                </Button>
            </div>
        </>
    );
};

export default CartPanel;
