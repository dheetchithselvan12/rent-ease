const OrderItem = ({ data }) => {
  return (
    <>
      <div className="flex border border-gray-400 w-1/2 p-2 bg-gray-50 my-2">
        {data?.orderItems?.map((item) => (
          <div key={item._id} className="flex justify-between w-full gap-2">
            <div>
              <p className="text-lg font-semibold">{item?.title}</p>
              <p className="text-gray-500">{item?.tenure} month tenure</p>
              <p className="font-medium">₹{data?.totalPrice}</p>
            </div>
            <img
              src={item?.image}
              alt="image"
              className="border w-20 h-20 cursor-pointer "
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderItem;
