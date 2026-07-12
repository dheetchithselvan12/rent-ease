import { CiCalendar } from "react-icons/ci";
import { LuCalendarFold } from "react-icons/lu";
import { formatDate } from "../../utils/dateUtils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveSubscriptions } from "../../features/order/orderSlice.js";
import { Link } from "react-router-dom";

const ActiveSubscriptions = () => {
  const dispatch = useDispatch();
  const {
    activeSubscriptions: subscriptions,
    activeSubscriptionsLoading: loading,
    activeSubscriptionsError: error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchActiveSubscriptions());
  }, [dispatch]);

  if (loading) {
    return <p>Loading active subscriptions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="h-full  ">
      <div className="  pb-2 mb-4">
        <p className="text-xl border-b border-gray-400 p-2 text-gray-700 font-bold">
          Active Rentals
        </p>
      </div>
      {subscriptions.length === 0 ? (
        <p className="bg-white border border-gray-300  rounded-md my-2 px-2 py-4">
          No active subscriptions found.
        </p>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          {subscriptions.map((subscription) => (
            <div
              key={subscription._id}
              className="border border-gray-300 bg-gray-50 rounded-lg shadow-lg pt-4 px-4 w-full max-w-196"
            >
              {subscription.orderItems.map((orderItem) => (
                <div
                  key={orderItem._id}
                  className="flex flex-col gap-5 border-t py-4 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="relative overflow-hidden rounded-xl shadow-sm min-w-full md:min-w-56 md:w-76 h-72 md:h-66">
                      <img
                        src={
                          /*orderItem.image ||*/ "https://picsum.photos/400/300"
                        }
                        alt={orderItem.title}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full text-white shadow-sm ${
                          subscription.orderStatus === "active"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {subscription.orderStatus}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <p className="font-bold text-xl text-gray-800">
                        {orderItem.title}
                      </p>
                      <p className=" text-gray-800">
                        Rental Plan {orderItem.tenure} Months
                      </p>
                      <p className="flex gap-2 items-center text-sm text-gray-500">
                        <CiCalendar />
                        Start Date: {formatDate(subscription.createdAt)}
                      </p>
                      <p className="flex gap-2 items-center text-sm text-gray-500">
                        <LuCalendarFold />
                        Next Payment Date:{" "}
                        {formatDate(subscription.nextPaymentDate)}
                      </p>
                      <p className="font-semibold text-lg text-gray-900">
                        Monthly Fee: ₹{orderItem.price}
                      </p>
                      <Link
                        to={`/my-account/orders/${subscription._id}`}
                        className=" text-center text-white hover:bg-blue-600 bg-blue-500 rounded-md p-2 transition-colors duration-300 "
                      >
                        Details
                      </Link>
                      <button className=" w-full md:w-auto bg-blue-500 px-4 py-2 hover:bg-blue-600 transition-colors duration-300 text-white rounded-md">
                        Manage Subscription
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveSubscriptions;
