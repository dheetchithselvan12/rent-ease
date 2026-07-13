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
      total: `₹${orderData?.reduce((acc, item) => acc + item.totalPrice, 0)}`,
      color: "bg-green-200",
      border: "border-green-300",
    },
    {
      id: 4,
      icon: <CiDeliveryTruck size={28} />,
      name: "Up Comming Delivery",
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
    <div className="p-2  h-full  ">
      {/* Dashboard Headline */}
      <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-1">
        <p className="text-2xl text-gray-700 font-bold">Hello, {displayName}</p>
        <p className="text-gray-500">
          Here's an overview of your RentEase Account.
        </p>
        <div className="space-y-1"></div>
      </div>

      {/* Indicator */}
      <div className="flex gap-4 my-4 ">
        {totalNumber?.map((item) => (
          <div
            key={item.id}
            className={` flex items-center gap-5 w-4/4 p-5 bg-white border ${item.border} rounded-lg shadow-lg`}
          >
            <p
              className={`p-2 rounded-full flex justify-center items-center h-12 w-12 ${item.color}`}
            >
              {item.icon}
            </p>
            <div className="space-y-3">
              <p className=" font-semibold ">{item.name}</p>
              <p className="font-bold text-xl ">{item.total}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Rentals */}
      <div>
        <div className="flex justify-between mt-8 ">
          <p className="text-xl text-gray-700 font-bold">Active Rentals</p>
          <Link
            to="subscriptions"
            className="text-blue-500 cursor-pointer hover:text-blue-600  "
          >
            View All
          </Link>
        </div>
        {subscriptions?.length === 0 ? (
          <p className="bg-white border border-gray-300  rounded-md my-2 px-2 py-4">
            No active subscriptions.
          </p>
        ) : (
          <div className="flex gap-4 ">
            {subscriptions?.map((item) => (
              <div
                key={item._id}
                className="flex my-4 border w-2/2 border-gray-300 bg-gray-50 rounded-lg shadow-lg "
              >
                <img
                  src={/*item.image*/ "https://picsum.photos/200/300"}
                  alt="img"
                  className="w-1/3 h-40 rounded-l-lg"
                />

                <div className="px-4 py-2 space-y-2 h-fit w-2/3">
                  <p className="font-bold flex justify-between ">
                    {item?.orderItems?.map((title) => title?.title)}
                    <span className="text-xs font-medium px-2 p-1 rounded-xl bg-green-300">
                      {item.orderStatus === "Delivered"
                        ? "pending"
                        : item.rentalStatus}
                    </span>
                  </p>
                  <p className=" flex gap-1 items-center text-sm text-gray-500">
                    <CiCalendar />
                    Started: {formatDate(item.createdAt)}
                  </p>
                  <p className=" flex gap-1 items-center text-sm text-gray-500 ">
                    <LuCalendarFold />
                    End:{item.nextPaymentDate}
                  </p>
                  <div className="flex items-center  justify-between mt-4">
                    <p className=" font-bold text-xl ">₹{item.totalPrice}</p>
                    <button
                      className="bg-blue-500 px-3 py-1 hover:bg-blue-600 cursor-pointer transition-colors duration-300
                   text-white rounded-md text-center"
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
      <div className="my-4  ">
        <p className="text-xl text-gray-700 font-bold">Rental History</p>
        <div className="border my-4 border-gray-400 rounded-lg overflow-x-auto w-full ">
          <table className="w-full text-left border-collapse whitespace-nowrap  ">
            <thead>
              <tr className="bg-gray-100  text-gray-600 text-center">
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-6 font-medium">Order Date</th>
                <th className="py-4 px-6 font-medium">Amount</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-300 bg-gray-50 hover:bg-blue-50 transition-colors duration-300 "
                >
                  <td className="px-6 py-4 text-center">
                    <span className="truncate max-w-25 inline-block">
                      {item.orderItems
                        .map((orderItem) => orderItem.title)
                        .join(", ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="truncate max-w-25 inline-block">
                      {formatDate(item.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="truncate max-w-25 inline-block">
                      ₹{item.itemPrice}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/my-account/orders/${item._id}`}
                      className="truncate max-w-25 inline-block cursor-pointer text-blue-500 hover:text-blue-600 "
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
