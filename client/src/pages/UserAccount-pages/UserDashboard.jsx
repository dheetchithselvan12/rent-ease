import { useSelector } from "react-redux";
import { CiCalendar } from "react-icons/ci";
import { LuCalendarFold } from "react-icons/lu";
const UserDashboard = () => {
  const { orderData: orders = [] } = useSelector((state) => state.orders);
  console.log("Orders data : ", orders);

  const totalNumber = [
    {
      id: 1,
      icon: "icon",
      name: "Active Rentals",
      total: 3,
      color: "bg-blue-300",
    },
    {
      icon: "icon",
      name: "Total Paid",
      total: `₹${152}`,
      color: "bg-green-300",
    },
    {
      id: 2,
      icon: "icon",
      name: "Loyalty Points",
      total: 4,
      color: "bg-red-300",
    },
    {
      id: 3,
      icon: "icon",
      name: "Up Comming Delivery",
      total: 0,
      color: "bg-yellow-300",
    },
  ];

  const ACTIVERENTS = [
    {
      id: 1,
      image: " https://picsum.photos/200/300",
      title: "Title Name",
      status: "Status",
      deliveredDate: "dd-mm-yyyy",
      nextPayment: "dd-mm-yyyy",
      price: "₹45",
      button: "Manage Rentals",
    },
    {
      id: 2,
      image: " https://picsum.photos/200/300",
      title: "Title Name",
      status: "Status",
      deliveredDate: "dd-mm-yyyy",
      nextPayment: "dd-mm-yyyy",
      price: "₹85",
      button: "Manage Rentals",
    },
  ];

  return (
    <div className="border p-2 border-gray-300 rounded-lg h-full">
      {/* Dashboard Headline */}
      <div className="space-y-2">
        <p className="text-2xl font-bold">Hello, Users</p>
        <p className=" text-gray-500">
          Here's an overview of your RentEase Account.
        </p>
      </div>

      {/* Indicator */}
      <div className="flex gap-4 my-4">
        {totalNumber.map((item) => (
          <div
            key={item.id}
            className={` flex gap-3 w-4/4 p-5 border border-gray-300 rounded-lg bg-gray-50 }`}
          >
            <p
              className={`p-2 rounded-full text-center pt-4 h-15 w-15 ${item.color}`}
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
          <p className="text-xl font-bold">Active Rentals</p>
          <p className="text-blue-500 cursor-pointer hover:text-blue-600  ">
            View All
          </p>
        </div>
        <div className="flex gap-4 ">
          {ACTIVERENTS.map((item) => (
            <div
              key={item.id}
              className="flex my-4 border w-2/2 border-gray-300 bg-gray-50 rounded-lg shadow-lg "
            >
              <img
                src={item.image}
                alt="img"
                className="w-1/3 h-40 rounded-l-lg"
              />

              <div className="px-4 py-2 space-y-2 h-fit w-2/3">
                <p className="font-bold flex justify-between ">
                  {item.title}
                  <span className="text-xs font-medium px-2 p-1 rounded-xl bg-green-300">
                    {item.status}
                  </span>
                </p>
                <p className=" flex gap-1 items-center text-sm text-gray-500">
                  <CiCalendar />
                  Started: {item.deliveredDate}
                </p>
                <p className=" flex gap-1 items-center text-sm text-gray-500 ">
                  <LuCalendarFold />
                  Next Payment:{item.nextPayment}
                </p>
                <div className="flex items-center  justify-between mt-4">
                  <p className=" font-bold text-xl ">{item.price}</p>
                  <button
                    className="bg-blue-500 px-3 py-1 hover:bg-blue-600 cursor-pointer transition-colors duration-300
                   text-white rounded-md text-center"
                  >
                    {item.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rental History */}
      <div className="my-4">
        <p className="text-xl font-bold">Rental History</p>
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-blue-50 border-y border-gray-400 text-gray-600 text-center">
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
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-center ">{item.price}</td>
                <td>{item._id}</td>
                <td>{item.price}</td>
              </tr>
            ))}
            {/* <tr className="border-b border-gray-300 hover:bg-gray-50">
              <td className="px-6 py-4 text-center ">Product Name</td>
              <td>Order Date</td>
              <td>Amount</td>
              <td>Status</td>
              <td>Action</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
