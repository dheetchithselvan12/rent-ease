import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdRepeat } from "react-icons/io";
import { validateRegister } from "../utils/validator";

const Register = () => {
  const [error, setError] = useState({});

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password2: password2Ref.current.value,
    };
    const validateError = validateRegister(formData);

    setError(validateError);

    if (Object.keys(validateError).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData,
        );
        console.log("response : ", response);

        alert("Registration Successful");
      } catch (error) {
        alert(error.response?.data?.message);
        console.log("Error : ", error.response?.data?.message);
      }
    } else {
      console.log("Validation errors:", validateError);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-50/50 h-dvh ">
      <div className="text-center mb-5">
        <h1 className="text-blue-500 text-4xl font-bold">RentEase</h1>
        <p className="text-gray-700">Premium furniture rental simplified.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 shadow-lg bg-gray-50 flex flex-col w-fit rounded-xl p-8 space-y-3"
      >
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
                ref={firstNameRef}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="outline-none "
              />
            </div>
            {error.firstName && (
              <p className="text-red-500">{error.firstName}</p>
            )}
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
                ref={lastNameRef}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="outline-none"
              />
            </div>
            {error.lastName && <p className="text-red-500">{error.lastName}</p>}
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
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="outline-none w-full"
            />
          </div>
          {error.email && <p className="text-red-500">{error.email}</p>}
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
                ref={passwordRef}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="outline-none"
              />
            </div>
            {error.password && <p className="text-red-500">{error.password}</p>}
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
                ref={password2Ref}
                type="password"
                id="password2"
                name="password2"
                placeholder="Confirm Password"
                className="outline-none"
              />
            </div>
            {error.password2 && (
              <p className="text-red-500">{error.password2}</p>
            )}
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
