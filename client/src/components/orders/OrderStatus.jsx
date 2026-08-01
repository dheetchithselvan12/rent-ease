import OrderTrackingStepper from "../mui/OrderTrackingStepper";

const OrderStatus = ({ data }) => {
  console.log("OrderStatus Data: ", data.orderStatus);
  return (
    <div className="mb-5 mt-3 rounded-md border border-gray-300 bg-gray-50 p-4">
      <h1 className="mb-2 text-lg font-semibold">Tracking Status</h1>
      <div className="my-7 overflow-x-auto pb-2">
        <div className="min-w-150">
          <OrderTrackingStepper orderStatus={data.orderStatus} />
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
