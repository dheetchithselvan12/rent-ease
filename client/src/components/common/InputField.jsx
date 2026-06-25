import { forwardRef } from "react";

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
      ...props
    },
    ref,
  ) => (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-600 cursor-pointer"
      >
        {label}
      </label>
      <div
        className={`flex gap-3 items-center border border-gray-300 bg-blue-50/40 text-gray-500 rounded-md p-2 ${error && "border-red-500 "}`}
      >
        {Icon && <Icon />}
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={`outline-none ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  ),
);

InputField.displayName = "InputField";

export default InputField;
