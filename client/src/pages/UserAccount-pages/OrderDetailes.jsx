import { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import OrderItem from "../../components/orders/OrderItem";
import OrderStatus from "../../components/orders/OrderStatus";
import { FiDownload } from "react-icons/fi";
import { BsChatLeftFill } from "react-icons/bs";
import { DeliveryDetaile } from "../../components/orders/DeliveryDetaile";
import OrderSummary from "../../components/orders/OrderSummary";
import BreadCrumbs from "../../components/mui/BreadCrumbs.jsx";
import { formatDate } from "../../utils/dateUtils.js";
import { fetchOrderByIdAPI } from "../../features/order/orderAPI.js";

const OrderDetailes = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrderDetailes = async () => {
      try {
        const data = await fetchOrderByIdAPI(id);
        const datas = data.data;
        setOrderData(datas);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderDetailes();
  }, [id]);
  return (
    <div className="px-10  h-fit bg-blue-50/50 ">
      <div className="flex justify-between mb-5 ">
        <div className="mb-8">
          <BreadCrumbs
            id={id}
            links={{ link: "/my-account/orders", name: "My Orders" }}
          />
          <h1 className="text-2xl font-bold">Order Detailes</h1>
          <p className="text-gray-600">
            placed on {formatDate(orderData.createdAt)}{" "}
          </p>
        </div>
        <div className="flex gap-2 items-center ">
          <button className=" flex items-center gap-1 border border-gray-400 px-4 py-2 rounded-md cursor-pointer text-sm">
            <FiDownload />
            Download Invoice
          </button>
          <button className=" flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm">
            <BsChatLeftFill size={15} />
            Contact Support
          </button>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="w-2/2">
          <OrderStatus data={orderData} />
          <OrderItem data={orderData} />
          <DeliveryDetaile data={orderData} />
        </div>
        <OrderSummary data={orderData} />
      </div>
    </div>
  );
};

export default OrderDetailes;
