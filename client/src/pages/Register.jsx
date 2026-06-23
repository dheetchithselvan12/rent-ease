import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdRepeat } from "react-icons/io";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-blue-50/50 h-dvh ">
      <div className="text-center mb-5">
        <h1 className="text-blue-500 text-4xl font-bold">RentEase</h1>
        <p className="text-gray-700">Premium furniture rental simplified.</p>
      </div>

      <form className="border border-gray-300 shadow-lg bg-gray-50 flex flex-col w-fit rounded-xl p-8 space-y-3">
        <div className="mb-4">
          <p className="text-2xl font-medium ">Create an Acccount</p>
          <p className="text-gray-500 ">
            Join our community of effortless living.
          </p>
        </div>

        <div className="flex gap-2">
          {/* First Name */}
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="firstName"
              className="text-sm font-semibold text-gray-600 cursor-pointer "
            >
              First Name
            </label>
            <div className="flex gap-3 items-center border border-gray-300 bg-blue-50/40 text-gray-500 rounded-md p-2 ">
              <FaUser />
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="outline-none "
              />
            </div>
          </div>
          {/* Last Name */}
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="lastName"
              className="text-sm font-semibold text-gray-600 cursor-pointer"
            >
              Last Name
            </label>
            <div className="flex gap-3 items-center border border-gray-300 bg-blue-50/40 text-gray-500 rounded-md p-2">
              <FaUser />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="outline-none"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-600 cursor-pointer"
          >
            Email
          </label>
          <div className="flex gap-3 items-center border border-gray-300 bg-blue-50/40 text-gray-500 rounded-md p-2">
            <MdEmail />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-600 cursor-pointer"
            >
              Password
            </label>
            <div className="flex gap-3 items-center border border-gray-300 bg-blue-50/40 text-gray-500 rounded-md p-2">
              <RiLockPasswordFill />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="password2"
              className="text-sm font-semibold text-gray-600 cursor-pointer "
            >
              Confirm Password
            </label>
            <div className="flex gap-3 items-center border border-gray-300 bg-blue-50/40 text-gray-500 rounded-md p-2">
              <IoMdRepeat />
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Confirm Password"
                className="outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 text-center cursor-pointer hover:bg-blue-600 transition-colors duration-300 mt-5 "
        >
          Create Account
        </button>
        <hr className="my-5 text-gray-400 " />
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link to="#" className="text-blue-600 font-medium ">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
