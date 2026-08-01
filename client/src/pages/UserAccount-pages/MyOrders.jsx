import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { fetchOrders } from "../../features/order/orderSlice.js";
import { formatDate } from "../../utils/dateUtils.js";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orderData: orders = [] } = useSelector((state) => state.orders);
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(orders?.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const selectedItems = orders?.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const renderStatus = (status) => (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        status === "Delivered"
          ? "bg-green-100 text-green-800"
          : status === "Processing"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-800"
      }`}
    >
      {status || "Processing"}
    </span>
  );

  return (
    <div className="h-full w-full rounded-lg border border-gray-300 bg-gray-50">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <h1 className="text-xl font-medium text-gray-800 sm:text-2xl">
          Orders History
        </h1>
        <div className="flex flex-wrap gap-2">
          <button className="flex cursor-pointer items-center gap-1 rounded-md border border-gray-400 px-2 py-1 text-sm transition-colors duration-300 hover:border-blue-500 hover:text-blue-500">
            <IoFilter />
            Filter
          </button>
          <button className="flex cursor-pointer items-center gap-1 rounded-md border border-gray-400 px-2 py-1 text-sm transition-colors duration-300 hover:border-blue-500 hover:text-blue-500">
            <FiDownload />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-3 px-4 pb-4 md:hidden">
        {selectedItems?.map((order) => {
          const itemLabel =
            order.orderItems?.length > 1
              ? `${order.orderItems[0].title} + ${order.orderItems.length - 1} more`
              : order.orderItems?.[0]?.title || "-";

          return (
            <article
              key={order._id}
              className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase text-gray-500">
                    Order ID
                  </p>
                  <p className="truncate text-sm font-semibold" title={order._id}>
                    {order._id}
                  </p>
                </div>
                <div className="shrink-0">{renderStatus(order.orderStatus)}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="min-w-0">
                  <p className="text-gray-500">Items</p>
                  <p className="truncate font-medium" title={itemLabel}>
                    {itemLabel}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Price</p>
                  <p className="font-medium">Rs. {order.totalPrice}</p>
                </div>
              </div>

              <Link
                to={`/my-account/orders/${order._id}`}
                className="mt-4 inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
              >
                View Details
              </Link>
            </article>
          );
        })}
      </div>

      <div className="hidden w-full overflow-x-auto md:block">
        <table className="w-full min-w-190 border-collapse whitespace-nowrap text-left">
          <thead>
            <tr className="border-y border-gray-400 bg-blue-50 text-center text-gray-600">
              <th className="px-4 py-4 font-medium lg:px-6">Order ID</th>
              <th className="px-4 py-4 font-medium lg:px-6">Items</th>
              <th className="px-4 py-4 font-medium lg:px-6">Date</th>
              <th className="px-4 py-4 font-medium lg:px-6">Total Price</th>
              <th className="px-4 py-4 font-medium lg:px-6">Status</th>
              <th className="px-4 py-4 font-medium lg:px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems?.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 py-4 text-center lg:px-6">
                  <span
                    className="inline-block max-w-25 truncate"
                    title={order._id}
                  >
                    {order._id}
                  </span>
                </td>
                <td className="px-4 py-4 text-center lg:px-6">
                  <span
                    className="inline-block max-w-36 truncate"
                    title={order.orderItems
                      ?.map((item) => item.title)
                      .join(", ")}
                  >
                    {order.orderItems?.length > 1
                      ? `${order.orderItems[0].title} + ${order.orderItems.length - 1} more`
                      : order.orderItems?.[0]?.title || "-"}
                  </span>
                </td>
                <td className="px-4 py-4 text-center lg:px-6">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-4 text-center lg:px-6">
                  Rs. {order.totalPrice}
                </td>
                <td className="px-4 py-4 text-center lg:px-6">
                  {renderStatus(order.orderStatus)}
                </td>
                <td className="px-4 py-4 text-center lg:px-6">
                  <Link
                    to={`/my-account/orders/${order._id}`}
                    className="inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-1 text-white transition-colors hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Stack spacing={2} className="mx-4 my-5 items-center sm:mx-6 sm:items-end">
          <Pagination
            count={totalPages}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            siblingCount={0}
          />
        </Stack>
      )}
    </div>
  );
};

export default MyOrders;
