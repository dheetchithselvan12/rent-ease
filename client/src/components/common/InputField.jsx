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
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-600 cursor-pointer"
        >
          {label}
        </label>
        <div
          className={`flex w-full min-w-0 items-center gap-3 rounded-md border border-gray-300 bg-white p-2 text-gray-500 ${error && "border-red-500 "}`}
        >
          {Icon && <Icon className="shrink-0" />}
          <input
            ref={ref}
            type={inputType}
            id={id}
            name={name}
            value={isFileField ? undefined : value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`min-w-0 outline-none ${className} ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
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
