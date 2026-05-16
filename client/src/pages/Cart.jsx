import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
const Cart = () => {
  return (
    <div className="px-15 py-10 bg-gray-100">
      <div className="mb-5">
        <h2 className="text-3xl font-medium">Checkout</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Review your rental items and complete your order.
        </p>
      </div>
      <section className="flex justify-between gap-10">
        {/* left side */}
        <div className="w-[60%] ">
          {/* cart */}
          <div className="border rounded-lg mb-5 p-3 bg-gray-50">
            <h3 className="text-xl font-medium">Your Cart</h3>
            <div className="flex justify-between mt-5">
              <div className="flex gap-5">
                <img src="" alt="img" className="border w-30 h-30 rounded-md" />
                <div className="flex flex-col gap-1 [&>*:last-child]:mt-auto">
                  <h6 className="text-lg font-medium">Nordic Lounge Sofa</h6>
                  <span className="px-3 py-1  bg-blue-500/10 rounded-full text-center text-sm font-medium w-fit ">
                    Living Room
                  </span>
                  <p className="flex items-center gap-1 text-gray-600">
                    <FaRegCalendarAlt />6 Month Tenure
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between">
                <RiDeleteBinLine size={24} className="cursor-pointer" />
                <p className="text-2xl font-bold">
                  $45<span className="text-sm text-gray-500">/mo</span>
                </p>
              </div>
            </div>
          </div>

          {/* bottom */}
          <div className="border h-70 p-2 rounded-lg">Address</div>
        </div>
        <div className="border rounded-lg h-100 p-5 w-[40%]">
          <h2>Order Summary</h2>
          <hr />
          <div>
            <div>
              <p>Monthly Rent</p>
              <span>$73.00</span>
            </div>
            <div>
              <p>Security Deposit (One - time)</p>
              <span>$146.00</span>
            </div>
            <div>
              <p>Delivery Charges</p>
              <span>Free</span>
            </div>
          </div>
          <hr />
          <div>
            <div>
              <p>Due Today</p>
              <p>$219.00</p>
              <p>Includes first month rent + deposit</p>
            </div>
            <button>Proocced to Payment</button>
            <p>You won't be charged until the next step.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
