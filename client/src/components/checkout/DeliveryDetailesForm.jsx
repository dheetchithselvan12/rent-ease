export const DeliveryDetailesForm = ({ formData, handleChange }) => {
  return (
    <form className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 ">Delivery Details</h3>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            className=" border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main St"
          className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="city" className="text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="state" className="text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-1/2">
          <label
            htmlFor="zipCode"
            className="text-sm font-medium text-gray-700"
          >
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
      </div>
    </form>
  );
};

export const DeliveryScheduleForm = ({ scheduleData, handleChange }) => {
  return (
    <form className="flex flex-col gap-4 mt-2 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Delivery Schedule</h3>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-1/2">
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
            value={scheduleData.deliveryDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
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
            value={scheduleData.preferredTime}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>
      </div>
    </form>
  );
};
