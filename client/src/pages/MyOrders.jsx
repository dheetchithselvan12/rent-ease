import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiCalendarDots } from "react-icons/pi";

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
    <div className="h-full p-15">
      <h1 className="mb-2">My Orders</h1>
      {orders.map((order) => (
        <Link
          to={`/orders/${order._id}`}
          key={order._id}
          className=" border border-gray-300 flex flex-col mb-4 p-4 h-fit rounded-lg cursor-pointer "
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
    </div>
  );
};

export default MyOrders;
