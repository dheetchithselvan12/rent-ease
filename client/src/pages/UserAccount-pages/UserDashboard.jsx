import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchOrders,
  fetchActiveSubscriptions,
} from "../../features/order/orderSlice";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import { CiCalendar, CiDeliveryTruck } from "react-icons/ci";
import { LuCalendarFold, LuShapes } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { orderData, loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const { activeSubscriptions: subscriptions } = useSelector(
    (state) => state.orders,
  );

  const totalPaid =
    orderData?.reduce((acc, item) => acc + (item.totalPrice || 0), 0) || 0;

  const totalNumber = [
    {
      id: 1,
      icon: <LuShapes size={28} />,
      name: "Active Rentals",
      total: subscriptions?.length || 0,
      color: "bg-blue-200",
      border: "border-blue-300",
    },
    {
      id: 2,
      icon: <MdOutlinePayments size={28} />,
      name: "Total Paid",
      total: `Rs. ${totalPaid}`,
      color: "bg-green-200",
      border: "border-green-300",
    },
    {
      id: 4,
      icon: <CiDeliveryTruck size={28} />,
      name: "Upcoming Delivery",
      total:
        orderData
          ?.filter((item) => item.orderStatus !== "Delivered")
          .map((item) => item.orderStatus).length || 0,
      color: "bg-yellow-200",
      border: "border-yellow-300",
    },
  ];

  useEffect(() => {
    dispatch(fetchActiveSubscriptions());
  }, [dispatch]);

  const fullName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName = fullName || user?.email?.split("@")[0] || "User";

  const orders = [...(orderData || [])]
    .sort((start, end) => new Date(end.date) - new Date(start.date))
    .slice(0, 5);

  useEffect(() => {
    if (!orderData && !loading) dispatch(fetchOrders());
  }, [dispatch, loading, orderData]);

  return (
    <div className="h-full p-1 sm:p-2">
      {/* Dashboard Headline */}
      <div className="flex flex-col space-y-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-xl font-bold text-gray-700 sm:text-2xl">
          Hello, {displayName}
        </p>
        <p className="text-gray-500">
          Here's an overview of your RentEase Account.
        </p>
        <div className="space-y-1"></div>
      </div>

      {/* Indicator */}
      <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {totalNumber?.map((item) => (
          <div
            key={item.id}
            className={`flex min-w-0 items-center gap-4 rounded-lg border bg-white p-4 shadow-sm sm:p-5 ${item.border}`}
          >
            <p
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-2 ${item.color}`}
            >
              {item.icon}
            </p>
            <div className="min-w-0 space-y-2">
              <p className="font-semibold text-gray-700">{item.name}</p>
              <p className="break-words text-xl font-bold">{item.total}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Rentals */}
      <div>
        <div className="mt-8 flex items-center justify-between gap-3">
          <p className="text-xl font-bold text-gray-700">Active Rentals</p>
          <Link
            to="subscriptions"
            className="shrink-0 cursor-pointer text-blue-500 hover:text-blue-600"
          >
            View All
          </Link>
        </div>
        {subscriptions?.length === 0 ? (
          <p className="my-2 rounded-md border border-gray-300 bg-white px-2 py-4">
            No active subscriptions.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 py-4 xl:grid-cols-2">
            {subscriptions?.map((item) => (
              <div
                key={item._id}
                className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-sm sm:flex-row"
              >
                <img
                  src={/*item.image*/ "https://picsum.photos/200/300"}
                  alt="img"
                  className="h-44 w-full object-cover sm:h-auto sm:w-36 md:w-44"
                />

                <div className="min-w-0 flex-1 space-y-2 px-4 py-3">
                  <div className="flex flex-col gap-2 font-bold sm:flex-row sm:items-start sm:justify-between">
                    <p className="min-w-0 truncate">
                      {item?.orderItems?.map((title) => title?.title).join(", ")}
                    </p>
                    <span className="w-fit shrink-0 rounded-xl bg-green-300 px-2 py-1 text-xs font-medium">
                      {item.orderStatus === "Delivered"
                        ? "pending"
                        : item.rentalStatus}
                    </span>
                  </div>
                  <p className="flex items-center gap-1 text-sm text-gray-500">
                    <CiCalendar />
                    Started: {formatDate(item.createdAt)}
                  </p>
                  <p className="flex items-center gap-1 text-sm text-gray-500">
                    <LuCalendarFold />
                    End: {item.nextPaymentDate}
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xl font-bold">Rs. {item.totalPrice}</p>
                    <button
                      className="cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-center text-white transition-colors duration-300 hover:bg-blue-600 sm:py-1"
                    >
                      {item.button}Manage
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rental History */}
      <div className="my-4">
        <p className="text-xl font-bold text-gray-700">Rental History</p>
        <div className="my-4 w-full overflow-x-auto rounded-lg border border-gray-400">
          <table className="w-full min-w-175 border-collapse whitespace-nowrap text-left">
            <thead>
              <tr className="bg-gray-100 text-center text-gray-600">
                <th className="px-4 py-4 font-medium sm:px-6">Product</th>
                <th className="px-4 py-4 font-medium sm:px-6">Order Date</th>
                <th className="px-4 py-4 font-medium sm:px-6">Amount</th>
                <th className="px-4 py-4 font-medium sm:px-6">Status</th>
                <th className="px-4 py-4 font-medium sm:px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-300 bg-gray-50 transition-colors duration-300 hover:bg-blue-50"
                >
                  <td className="px-4 py-4 text-center sm:px-6">
                    <span className="inline-block max-w-25 truncate">
                      {item.orderItems
                        .map((orderItem) => orderItem.title)
                        .join(", ")}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center sm:px-6">
                    <span className="inline-block max-w-25 truncate">
                      {formatDate(item.createdAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center sm:px-6">
                    <span className="inline-block max-w-25 truncate">
                      Rs. {item.itemPrice}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center sm:px-6">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : item.orderStatus === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center sm:px-6">
                    <Link
                      to={`/my-account/orders/${item._id}`}
                      className="inline-block max-w-25 cursor-pointer truncate text-blue-500 hover:text-blue-600"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
