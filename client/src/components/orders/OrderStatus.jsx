const OrderStatus = ({ data }) => {
  return (
    <div className=" border border-gray-300 rounded-md  bg-gray-50  my-4 p-5">
      <h1 className="text-lg font-semibold mb-2">Tracking Status</h1>
      <div>
        <p>Status: {data?.orderStatus}</p>
      </div>
    </div>
  );
};

export default OrderStatus;
