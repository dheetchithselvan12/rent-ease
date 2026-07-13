import InputField from "../common/InputField";
import { FaCamera } from "react-icons/fa";
const UserSettings = () => {
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
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField label={"First Name"} />
          <InputField label={"Last Name"} />
        </div>
        <InputField label={"Email Address"} />
        <button className="bg-blue-500 text-white rounded-md p-2 w-fit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
