import OrderTrackingStepper from "../mui/OrderTrackingStepper";

const OrderStatus = ({ data }) => {
  console.log("OrderStatus Data: ", data.orderStatus);
  return (
    <div className=" border border-gray-300 rounded-md  bg-gray-50 mt-3 mb-5 p-4">
      <h1 className="text-lg font-semibold mb-2">Tracking Status</h1>
      <div className="my-7 ">
        <OrderTrackingStepper orderStatus={data.orderStatus} />
      </div>
    </div>
  );
};

export default OrderStatus;
