import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OrderItem from "../components/orders/OrderItem";

const OrderDetailes = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState([]);
  // console.log("orderData: ", orderData);
  useEffect(() => {
    const fetchOrderDetailes = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/${id}`,
        );
        const datas = data.data;
        setOrderData(datas);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderDetailes();
  }, []);
  return (
    <>
      <div className="px-20 h-dvh bg-gray-200">
        <h1>Order Detailes</h1>
        <OrderItem data={orderData} />
      </div>
    </>
  );
};

export default OrderDetailes;
