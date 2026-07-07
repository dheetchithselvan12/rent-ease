import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import { validateLogin } from "../utils/validator";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginSuccess } from "../features/auth/authSlice";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [error, setError] = useState({});
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        const payload = JSON.parse(
          atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
        );

        dispatch(
          loginSuccess({
            token,
            user: {
              _id: payload.userId,
              role: payload.role,
              firstName: payload.firstName || "",
              lastName: payload.lastName || "",
              avatar: payload.avatar || "",
              email: payload.email,
            },
          }),
        );
        window.history.replaceState({}, "", "/login");
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Failed to decode Google auth token", err);
      }
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const validateError = validateLogin(formData);
    setError(validateError);
    if (Object.keys(validateError).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          formData,
        );
        dispatch(loginSuccess(response.data));
        navigate("/");
        console.log("response : ", response);
        alert("Login Successful");
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
      <h1 className="text-blue-500 text-4xl font-bold">RentEase</h1>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 shadow-lg bg-gray-50 flex flex-col w-fit rounded-xl mt-4 p-8 space-y-3"
      >
        <div className="mb-4 text-center ">
          <p className="text-2xl font-medium ">Welcome Back</p>
          <p className="text-gray-500 w-75 ">
            Sign in to manage your premium furniture rentals.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <InputField
            ref={emailRef}
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            icon={MdEmail}
            error={error?.email}
          />
          <InputField
            ref={passwordRef}
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            icon={RiLockPasswordFill}
            error={error?.password}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 w-full text-center cursor-pointer hover:bg-blue-600 transition-colors duration-300 mt-5 "
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/google";
            }}
            className=" border border-gray-300 text-black flex gap-2 items-center justify-center hover:text-white rounded-md p-2 w-full text-center cursor-pointer hover:bg-blue-500 transition-colors duration-300 mt-5 "
          >
            <FcGoogle size={22} />
            Login with Google
          </button>

          <hr className="my-5 text-gray-400 " />
          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium ">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
