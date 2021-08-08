import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const { fetchHandler, loading } = useFetch();
    const history = useHistory();

    useEffect(() => {
        fetchHandler(`orders`)
            .then(res => {
                setOrders(res.orders);
            })
            .catch(err => console.log(err));
    }, [fetchHandler]);

    const goToOrder = id => {
        history.push(`/order/${id}`);
    };

    if (loading) return <Loading />

    return (
        <table className="ordersTable">
            <thead>
            <tr>
                <td>Order Number</td>
                <td>Customer Name</td>
                <td>Order Date</td>
                <td>Summary Amount</td>
                <td>Items Quantity</td>
            </tr>
            </thead>
            <tbody>
            {
                orders?.length > 0 && orders.map(order => (
                    <tr key={order._id} onClick={() => goToOrder(order._id)}>
                        <td>{order.order_number}</td>
                        <td>{order.customer_name}</td>
                        <td>{new Date(order.order_date).toLocaleString()}</td>
                        <td>{order.summary_amount}</td>
                        <td>{order.itemsQty}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};

export default Orders;