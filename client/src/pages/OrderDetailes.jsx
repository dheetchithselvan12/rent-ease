import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetailes = () => {
  const { id } = useParams();
  console.log("Params Id", id);
  useEffect(() => {
    const fetchOrderDetailes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${id}`,
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderDetailes();
  }, []);
  return <div>OrderDetailes</div>;
};

export default OrderDetailes;
