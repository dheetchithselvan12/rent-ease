const CartCheckoutItems = ({ items }) => {
  return (
    <div>
      <div className="my-4 space-y-4 rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col gap-4 border-b border-gray-300 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex min-w-0 gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 shrink-0 rounded-md border object-cover sm:h-24 sm:w-24"
              />
              <div className="min-w-0 space-y-1">
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <div className="space-y-1 sm:text-right">
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
