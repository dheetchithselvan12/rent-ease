import { useRef } from "react";
import axios from "axios";
import InputField from "../common/InputField";
import { FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const UserSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const getAuthHeaders = () => {
    const token = window.localStorage.getItem("authToken");

    return token ? { authorization: `Bearer ${token}` } : {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
    };
    console.log("Profile updated : ", formData, "token", getAuthHeaders());

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        { headers: getAuthHeaders() },
      );
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white px-4 py-4 rounded-lg border border-gray-300 shadow-sm ">
      <div className="flex flex-col gap-1 border-b border-gray-300 pb-4">
        <h1 className="text-xl font-semibold">Profile Information</h1>
        <p className="text-gray-500 text-sm">
          Update your profile details and how we can reach you.
        </p>
      </div>
      <div className="bg-blue-100 w-fit p-4 rounded-lg my-4 relative">
        <img
          src={"https://picsum.photos/200/300"}
          alt="img"
          className="w-20 h-20 rounded-full border-3 border-blue-500"
        />
        <FaCamera
          size={20}
          className="absolute bottom-5 right-5 text-gray-600"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            ref={firstNameRef}
            label={"First Name"}
            id="firstName"
            name="firstName"
            defaultValue={user?.firstName ?? ""}
            icon={FaUser}
          />
          <InputField
            ref={lastNameRef}
            label={"Last Name"}
            id="lastName"
            name="lastName"
            defaultValue={user?.lastName ?? ""}
            icon={FaUser}
          />
        </div>
        <InputField
          ref={emailRef}
          label={"Email Address"}
          defaultValue={user?.email ?? ""}
          id="email"
          name="email"
          type="email"
          icon={MdEmail}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-fit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
