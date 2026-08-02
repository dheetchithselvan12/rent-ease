import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../common/InputField";
import { updateUserAddressAPI } from "../../features/user/userAPI";
import { updateAddress } from "../../features/auth/authSlice";

import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineLocationCity } from "react-icons/md";
import { RiGovernmentFill } from "react-icons/ri";
import { PiMapPinSimpleAreaFill } from "react-icons/pi";

const UserAddressSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const storedAddress = user?.address;

  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const pincodeRef = useRef();

  useEffect(() => {
    if (!storedAddress) return;

    nameRef.current.value = storedAddress.name || "";
    phoneRef.current.value = storedAddress.phone || "";
    addressRef.current.value = storedAddress.address || "";
    cityRef.current.value = storedAddress.city || "";
    stateRef.current.value = storedAddress.state || "";
    pincodeRef.current.value = storedAddress.pincode || "";
  }, [
    storedAddress,
    storedAddress?.name,
    storedAddress?.phone,
    storedAddress?.address,
    storedAddress?.city,
    storedAddress?.state,
    storedAddress?.pincode,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      pincode: pincodeRef.current.value,
    };

    try {
      const response = await updateUserAddressAPI(formData);
      dispatch(updateAddress(response?.address || formData));
      alert("Address saved successfully!");
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to save address");
    }
  };

  return (
    <div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Your Address Details
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          ref={nameRef}
          label="Full Name"
          id="name"
          name="name"
          placeholder="John Doe"
          icon={FaUser}
          required
        />
        <InputField
          ref={phoneRef}
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          placeholder="123-456-7890"
          minLength={10}
          maxLength={10}
          icon={FaPhoneAlt}
          required
        />
        <InputField
          ref={addressRef}
          label="Street Address"
          id="address"
          name="address"
          placeholder="123 Main St"
          icon={IoLocationSharp}
          required
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            ref={cityRef}
            label="City"
            id="city"
            name="city"
            placeholder="City"
            className="flex-1"
            icon={MdOutlineLocationCity}
            required
          />
          <InputField
            ref={stateRef}
            label="State"
            id="state"
            name="state"
            placeholder="State"
            className="flex-1"
            icon={RiGovernmentFill}
            required
          />
        </div>

        <InputField
          ref={pincodeRef}
          label="Pincode"
          id="pincode"
          name="pincode"
          placeholder="123456"
          type="text"
          icon={PiMapPinSimpleAreaFill}
          required
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 sm:mt-4 sm:w-fit sm:self-start"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default UserAddressSettings;
