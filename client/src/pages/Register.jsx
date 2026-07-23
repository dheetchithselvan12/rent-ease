import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdRepeat } from "react-icons/io";
import InputField from "../components/common/InputField";
import { validateRegister } from "../utils/validator";
import { FcGoogle } from "react-icons/fc";
import { API_BASE_URL, API_ORIGIN } from "../config/api";

const Register = () => {
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          `${API_BASE_URL}/auth/register`,
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
        className="border border-gray-300 shadow-lg bg-gray-50 flex flex-col w-full max-w-2xl rounded-xl p-8 space-y-3"
      >
        <div className="mb-4">
          <p className="text-2xl font-medium ">Create an Acccount</p>
          <p className="text-gray-500 ">
            Join our community of effortless living.
          </p>
        </div>

        <div className="flex gap-2 w-full">
          <InputField
            ref={firstNameRef}
            label="First Name"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            icon={FaUser}
            error={error.firstName}
          />
          <InputField
            ref={lastNameRef}
            label="Last Name"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            icon={FaUser}
            error={error.lastName}
          />
        </div>

        <InputField
          ref={emailRef}
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          icon={MdEmail}
          error={error.email}
        />

        <div className="flex gap-3 w-full">
          <InputField
            ref={passwordRef}
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            icon={RiLockPasswordFill}
            error={error.password}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
          <InputField
            ref={password2Ref}
            label="Confirm Password"
            id="password2"
            name="password2"
            type="password"
            placeholder="Confirm Password"
            icon={IoMdRepeat}
            error={error.password2}
            setShowPassword={setShowConfirmPassword}
            showPassword={showConfirmPassword}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 text-center cursor-pointer hover:bg-blue-600 transition-colors duration-300 mt-5 "
        >
          Create Account
        </button>
        <p className="text-center text-xs my-2 text-gray-400  ">
          ──────────────────────── or continue with Google
          ────────────────────────
        </p>

        <button
          type="button"
          onClick={() => {
            window.location.href = `${API_ORIGIN}/api/auth/google`;
          }}
          className=" border border-gray-300 text-black flex gap-2 items-center justify-center hover:text-white rounded-md p-2 w-full text-center cursor-pointer hover:bg-blue-500 transition-colors duration-300 mt-5 "
        >
          <FcGoogle size={22} />
          Google
        </button>

        <hr className="my-5 text-gray-400 " />
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium ">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
