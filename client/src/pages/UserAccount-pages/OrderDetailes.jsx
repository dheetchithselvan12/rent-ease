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
    <div className="h-fit bg-blue-50/50 px-1 sm:px-4 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <BreadCrumbs
            id={id}
            links={{ link: "/my-account/orders", name: "My Orders" }}
          />
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Order Detailes
          </h1>
          <p className="text-gray-600">
            placed on {formatDate(orderData.createdAt)}{" "}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button className="flex cursor-pointer items-center justify-center gap-1 rounded-md border border-gray-400 px-4 py-2 text-sm transition-colors hover:border-blue-500 hover:text-blue-500">
            <FiDownload />
            Download Invoice
          </button>
          <button className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600">
            <BsChatLeftFill size={15} />
            Contact Support
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
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
