import { forwardRef } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const InputField = forwardRef(
  (
    {
      label,
      id,
      name,
      type = "text",
      placeholder,
      icon: Icon,
      error,
      className = "w-full",
      showPassword,
      setShowPassword,
      ...props
    },
    ref,
  ) => {
    const isPasswordField = type === "password";
    const inputType = isPasswordField && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-2 flex-1">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-600 cursor-pointer"
        >
          {label}
        </label>
        <div
          className={`flex gap-3 items-center border border-gray-300 bg-blue-50/40 text-gray-500 w-full rounded-md p-2  ${error && "border-red-500 "}`}
        >
          {Icon && <Icon />}
          <input
            ref={ref}
            type={inputType}
            id={id}
            name={name}
            placeholder={placeholder}
            className={`outline-none ${className}`}
            {...props}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm font-medium hover:text-gray-700 transition whitespace-nowrap cursor-pointer "
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
