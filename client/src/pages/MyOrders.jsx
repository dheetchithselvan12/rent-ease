import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const selectedItems = orders.slice(startIndex, startIndex + itemsPerPage);
  console.log("selectedItems : ", selectedItems);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders");
        const datas = data.data;
        setOrders(datas);
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
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-blue-50 border-y border-gray-400 text-gray-600 text-center">
              <th className="py-4 px-6 font-medium">Order ID</th>
              <th className="py-4 px-6 font-medium">Items</th>
              <th className="py-4 px-6 font-medium">Date</th>
              <th className="py-4 px-6 font-medium">Total Price</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems?.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-center">
                  <span
                    className="truncate max-w-25 inline-block"
                    title={order._id}
                  >
                    {order._id}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className="truncate max-w-35.7 inline-block"
                    title={order.orderItems
                      ?.map((item) => item.title)
                      .join(", ")}
                  >
                    {order.orderItems?.length > 1
                      ? `${order.orderItems[0].title} + ${order.orderItems.length - 1} more`
                      : order.orderItems?.[0]?.title || "-"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-center">₹{order.totalPrice}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.orderStatus === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.orderStatus || "Processing"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/my-account/orders/${order._id}`}
                    className="inline-block bg-blue-500 rounded-md px-4 py-1 cursor-pointer hover:bg-blue-600 text-white transition-colors"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Stack spacing={2} className="my-5 mx-6 items-end">
        <Pagination
          count={totalPages}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default MyOrders;
