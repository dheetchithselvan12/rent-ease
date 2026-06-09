import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { PiCalendarDots } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const dates = orders.map((order) =>
    new Date(order.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  );
  console.log("Date: ", dates);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders");
        console.log(data);
        const datas = data.data;
        setOrders(datas);
        console.log("My Orders: ", datas);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="h-full bg-gray-50 border border-gray-300 w-full rounded-xl ">
      <div className="flex items-center justify-between p-5">
        <h1 className="mb-2 text-2xl font-medium">Orders History</h1>
        <div className="flex gap-2">
          <button className="flex gap-1 items-center border border-gray-400 hover:border-blue-500 transition-colors duration-300 hover:text-blue-500 px-2 py-1 rounded-md text-sm cursor-pointer">
            <IoFilter />
            Filter
          </button>
          <button className="flex gap-1 items-center border border-gray-400 hover:border-blue-500 transition-colors duration-300 hover:text-blue-500 px-2 py-1 rounded-md text-sm cursor-pointer">
            <FiDownload />
            Export
          </button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-5 px-6 bg-blue-50 py-4 border-y border-gray-400 text-gray-600 text-center  ">
          <p>Order ID</p>
          <p>Name</p>
          <p>Total Monthly Rent</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="px-6 py-2 grid grid-cols-5 border-b border-gray-300 items-center "
          >
            <p className="truncate">{order._id}</p>

            {order?.orderItems?.map((item) => (
              <p key={item._id} className="truncate pe-5 text-center">
                {item.title}
              </p>
            ))}
            <p className="text-center ">{order.totalPrice}</p>
            <p className="text-center ">{order.orderStatus}</p>

            <Link
              to={`/my-account/orders/:${order._id}`}
              className="text-center bg-blue-500 rounded-md px-4 py-1 cursor-pointer hover:bg-blue-600 text-white w-fit mx-auto"
            >
              View Detailes
            </Link>
          </div>
        ))}
      </div>
      <Stack spacing={2} className="my-5 mx-6 items-end">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default MyOrders;
