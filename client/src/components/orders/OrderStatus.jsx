import OrderTrackingStepper from "../mui/OrderTrackingStepper";

const OrderStatus = () => {
  return (
    <div className=" border border-gray-300 rounded-md  bg-gray-50  my-4 p-4">
      <h1 className="text-lg font-semibold mb-2">Tracking Status</h1>
      <div className="my-7">
        <OrderTrackingStepper orderStatus="Out For Delivery" />
      </div>
    </div>
  );
};

export default OrderStatus;
