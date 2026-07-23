import { forwardRef } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const InputField = forwardRef(
  (
    {
      label,
      id,
      name,
      value,
      defaultValue,
      type = "text",
      placeholder,
      icon: Icon,
      error,
      className = "w-full",
      showPassword,
      setShowPassword,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const isPasswordField = type === "password";
    const inputType = isPasswordField && showPassword ? "text" : type;
    const isFileField = type === "file";

    return (
      <div className="flex flex-col gap-1 flex-1">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-600 cursor-pointer"
        >
          {label}
        </label>
        <div
          className={`flex gap-3 items-center border border-gray-300 bg-white text-gray-500 w-full rounded-md p-2  ${error && "border-red-500 "}`}
        >
          {Icon && <Icon />}
          <input
            ref={ref}
            type={inputType}
            id={id}
            name={name}
            value={isFileField ? undefined : value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`outline-none ${className} ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
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
