import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiCalendarDots } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
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
    <div className="h-full bg-gray-50 border w-full rounded-md ">
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
      <div className=" flex justify-between text-sm bg-blue-50 border-y py-2 px-2">
        <p>Image</p>
        <p>Date</p>
        <p>Total Monthly Rent</p>
        <p>Status</p>
        <p>list</p>
      </div>
      {orders.map((order) => (
        <Link
          to={`/orders/${order._id}`}
          key={order._id}
          className=" bg-gray-50 border-t border-gray-300 flex flex-col  p-4 h-fit  cursor-pointer "
        >
          <div className="flex gap-2">
            {order?.orderItems?.map((item) => (
              <img
                key={item._id}
                src={item?.image}
                alt="image"
                className="border border-gray-200 w-20 h-20 rounded-lg "
              />
            ))}
            <div className="flex justify-between w-full">
              {order?.orderItems?.map((item) => (
                <div key={item._id} className="space-y-4">
                  <p>{item?.title}</p>
                  <p className="flex items-center gap-1 text-gray-500">
                    <PiCalendarDots size={18} />
                    {item?.tenure} month tenure
                  </p>
                </div>
              ))}
              <div className="space-y-4">
                <p>Status: {order.orderStatus}</p>
                <p className="text-green-500">Total: ₹{order.totalPrice}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default MyOrders;
