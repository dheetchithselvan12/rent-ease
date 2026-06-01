import axios from "axios";
import { useEffect, useState } from "react";

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
        <div
          key={order._id}
          className="border flex flex-col mb-4 p-4 h-fit rounded-lg"
        >
          <div className="flex gap-2">
            {order?.orderItems?.map((item) => (
              <img
                key={item._id}
                src={item?.image}
                alt="image"
                className="border w-20 h-20 rounded-lg "
              />
            ))}
            <div>
              {order?.orderItems?.map((item) => (
                <p key={item._id}>{item?.title}</p>
              ))}
              <p>Total: ₹{order.totalPrice}</p>
              <p>Status: {order.orderStatus}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
