import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Item from "../../components/Item/Item";
import Loading from "../../components/Loading/Loading";

const Order = () => {
    const [items, setItems] = useState([]);

    const { fetchHandler, loading } = useFetch();
    const { orderId } = useParams();

    useEffect(() => {
        fetchHandler(`order/${orderId}`)
            .then((res) => {
                setItems(res);
            })
            .catch(err => console.log(err));
    }, [fetchHandler, orderId]);

    if (loading) return <Loading />;

    return (
        <table>
            <thead>
            <tr>
                <td>Title</td>
                <td>Price</td>
            </tr>
            </thead>
            <tbody>
            {
                items?.length > 0 ? items.map(item => (
                        <Item key={item._id} item={item} />
                    )) :
                    <>
                        <tr>
                            <td colSpan={12}>No items found</td>
                        </tr>
                    </>
            }
            </tbody>
        </table>
    );
};

export default Order;