import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN"); // Format: dd/MM/yyyy
};

const calculateTotalPrice = (products) => {
    return products
        .reduce((total, p) => total + p.price * p.quantity, 0)
        .toFixed(2);
};

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9999/orders")
            .then(res => setOrders(res.data))
            .catch(err => console.error("Failed to fetch orders", err));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Order History</h2>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>OrderDate</th>
                        <th>ShipAddress</th>
                        <th>ProductList</th>
                        <th>TotalPrice ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{formatDate(order.orderDate)}</td>
                            <td>{order.shipAddress}</td>
                            <td>
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        {order.products.map((p, i) => (
                                            <tr key={i}>
                                                <td style={{ width: "5%" }}>{i + 1}.</td>
                                                <td style={{ width: "60%" }}>{p.name}</td>
                                                <td style={{ width: "15%" }}>${p.price.toFixed(2)}</td>
                                                <td style={{ width: "10%" }}>{p.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                            <td>{calculateTotalPrice(order.products)}</td>
                        </tr>
                    ))}
                </tbody>


            </Table>
        </div>
    );
};

export default OrderHistory;
