import { useMemo } from "react";
import InputField from "../common/InputField";

const TENURES = [1, 3, 6, 12];
const CATEGORIES = ["furniture", "appliance"];
const textFields = [
  {
    label: "Product name",
    name: "name",
    type: "text",
    placeholder: "e.g. Sofa",
  },
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "e.g. Modern Sofa",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    placeholder: "Describe the product",
  },
  {
    label: "Stock",
    name: "stock",
    type: "number",
    min: 0,
  },
  {
    label: "Monthly price",
    name: "price",
    type: "number",
    min: 0,
  },
  {
    label: "Security deposit",
    name: "securityDeposit",
    type: "number",
    min: 0,
  },
];

const AddNewProduct = ({
  mode = "create",
  onSubmit,
  onChange,
  onFileUpload,
  image,
  onCancel,
  formData = {},
}) => {
  const isEditMode = mode === "edit";

  const { category = "", availableTenure = [] } = formData;

  const handleTenureChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      parseInt(option.value, 10),
    );
    const syntheticEvent = {
      target: {
        name: e.target.name,
        value: selectedOptions,
      },
    };
    onChange(syntheticEvent);
  };

  const imagePreviews = useMemo(() => {
    if (!image) return [];
    const images = Array.isArray(image) ? image : [image];

    return images
      .map((item) => (typeof item === "string" ? item : item?.url))
      .filter(Boolean);
  }, [image]);

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 w-full max-w-lg rounded-2xl border border-slate-200 bg-slate-50 p-5"
    >
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditMode ? "Edit product" : "Add product"}
          </h2>
          <p className="text-sm text-slate-500">
            {isEditMode
              ? "Update the selected product details."
              : "Create a new rental product for your catalog."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          {textFields.map((field) => (
            <InputField
              key={field.name}
              {...field}
              value={formData[field.name] ?? ""}
              onChange={onChange}
            />
          ))}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            name="category"
            value={category ?? ""}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none"
          >
            <option value="">--none--</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Tenure Plans{" "}
            <span className="text-xs font-light italic  text-slate-500 ">
              ( Ctrl + Select )
            </span>
          </label>
          <select
            name="availableTenure"
            id="availableTenure"
            value={availableTenure}
            onChange={handleTenureChange}
            multiple
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none"
          >
            {TENURES.map((tenure) => (
              <option key={tenure} value={tenure}>
                {tenure} month{tenure > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <InputField
            label="Images"
            name="images"
            id="images"
            type="file"
            onChange={onFileUpload}
            accept="image/*"
            value={image}
            required={!(image && image.length > 0)}
            multiple
          />
          {!!imagePreviews.length && (
            <div className="mt-2 flex flex-wrap gap-2">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`preview ${index}`}
                  className="h-12 w-12 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer hover:bg-blue-500 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="cursor-pointer hover:bg-blue-500 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          {isEditMode ? "Save changes" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddNewProduct;
