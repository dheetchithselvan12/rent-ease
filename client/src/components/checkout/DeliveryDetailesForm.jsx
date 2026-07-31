export const DeliveryDetailesForm = ({ defaultValues = {} }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 ">Delivery Details</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            defaultValue={defaultValues.name || ""}
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="123-456-7890"
            defaultValue={defaultValues.phone || ""}
            className=" border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            minLength={10}
            maxLength={10}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="123 Main St"
          defaultValue={defaultValues.address || ""}
          className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            defaultValue={defaultValues.city || ""}
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="state" className="text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State"
            defaultValue={defaultValues.state || ""}
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="pincode"
            className="text-sm font-medium text-gray-700"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            placeholder="Pincode"
            defaultValue={defaultValues.pincode || ""}
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
      </div>
    </div>
  );
};

export const DeliveryScheduleForm = () => {
  return (
    <div className="mt-2 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800">Delivery Schedule</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="deliveryDate"
            className="text-sm font-medium text-gray-700"
          >
            Delivery Date
          </label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="preferredTime"
            className="text-sm font-medium text-gray-700"
          >
            Preferred Time
          </label>
          <input
            type="time"
            id="preferredTime"
            name="preferredTime"
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
      </div>
    </div>
  );
};
