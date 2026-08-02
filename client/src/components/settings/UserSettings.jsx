import { useRef } from "react";
import InputField from "../common/InputField";
import { FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { updateUserAPI } from "../../features/user/userAPI";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../features/auth/authSlice";
import { UserAvatar } from "../common/UserAvatar";

const UserSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  console.log("user : ", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
    };
    console.log("Profile updated : ", formData);

    try {
      const response = await updateUserAPI(formData);
      console.log("response : ", response);
      // Update local storage
      dispatch(updateProfile(response.user));
    } catch (error) {
      console.log("error : ", error?.response?.data?.message);
    }
  };

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 rounded-lg border border-gray-300 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div className="flex flex-col gap-1 border-b border-gray-300 pb-4">
        <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
          Profile Information
        </h1>
        <p className="text-gray-500 text-sm">
          Update your profile details and how we can reach you.
        </p>
      </div>
      <div className="relative my-2 w-fit rounded-lg bg-blue-100 p-4 sm:my-4">
        <UserAvatar className="w-20 h-20 rounded-full" />
        <FaCamera
          size={20}
          className="absolute bottom-5 right-5 text-gray-600"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          className="w-full rounded-md bg-blue-500 p-2 font-medium text-white transition-colors hover:bg-blue-600 sm:w-fit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
