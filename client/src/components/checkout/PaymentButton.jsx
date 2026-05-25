import { RiLock2Fill } from "react-icons/ri";

const PaymentButton = () => {
  return (
    <>
      <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium flex justify-center gap-2 items-center cursor-pointer">
        <RiLock2Fill size={20} />
        Continue to Payment
      </button>
    </>
  );
};

export default PaymentButton;
