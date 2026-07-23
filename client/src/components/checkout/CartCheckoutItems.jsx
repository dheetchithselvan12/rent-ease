const CartCheckoutItems = ({ items }) => {
  return (
    <div>
      <div className="border border-gray-200 rounded-lg p-5 my-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between  border-b pb-4 border-gray-400"
          >
            <div className="flex  gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-25 h-25 border rounded-md"
              />
              <div className="space-y-1">
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-lg font-medium">
                ₹{(Number(item.price) * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">₹{item.price}/month</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartCheckoutItems;
