import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewProduct from "../components/product/AddNewProduct";
import {
  createProduct,
  updateProduct,
  fetchProducts,
  deleteProduct,
} from "../features/products/productsSlice";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import ProductTable from "../components/product/ProductTable";

import { FiSearch } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";

const Products = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 5;

  const { items, loading, error, meta } = useSelector(
    (state) => state.products,
  );
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [image, setImage] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    images: [],
    price: "",
    availableTenure: [],
    securityDeposit: "",
    stock: "",
  });

  const [createForm, setCreateForm] = useState({
    name: "",
    title: "",
    description: "",
    category: "furniture",
    images: [],
    price: "",
    securityDeposit: "",
    availableTenure: [],
    stock: "",
  });

  const buildQueryParams = useCallback(
    (currentPage = page) => {
      const params = { page: currentPage, limit: itemsPerPage };
      if (search.trim()) params.search = search.trim();
      if (categoryFilter !== "all") params.category = categoryFilter;
      return params;
    },
    [categoryFilter, page, search],
  );

  useEffect(() => {
    dispatch(fetchProducts(buildQueryParams(page)));
  }, [buildQueryParams, dispatch, page]);

  const filteredProducts = useMemo(() => {
    return items.filter((product) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "in-stock" ? product.stock > 0 : product.stock <= 0);

      return matchesStatus;
    });
  }, [items, statusFilter]);

  const totalPages = Math.max(1, meta?.pages || 1);

  const handlePageChange = (_event, value) => {
    const nextPage = Math.max(1, Math.min(value, totalPages));
    setPage(nextPage);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
    setPage(1);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product from the catalog?")) return;

    try {
      await dispatch(deleteProduct(productId)).unwrap();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormValues({
      name: product.name || "",
      title: product.title || "",
      description: product.description || "",
      category: product.category || "",
      stock: product.stock ?? "",
      price: product.tenurePlans?.[0]?.pricePerMonth ?? "",
      availableTenure: product.tenurePlans?.map((p) => p.duration) || [],
      securityDeposit: product.securityDeposit ?? "",
      images: product.images || [],
    });
    setImage(product.images || []);
    setSelectedFiles([]);
    setIsModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleCreateInputChange = (event) => {
    const { name, value } = event.target;
    setCreateForm((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleAddNewItem = () => {
    setIsOpenForm(true);
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const previews = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          }),
      ),
    );

    setImage(previews);
    setSelectedFiles(files);
  };

  const buildProductFormData = (values, files, currentImages = []) => {
    const formData = new FormData();
    const monthlyRent = Number(values.price);
    const stock = Number(values.stock);
    const tenurePlans = values.availableTenure.map((duration) => ({
      duration: Number(duration),
      pricePerMonth: monthlyRent,
      totalPrice: monthlyRent * Number(duration),
    }));

    formData.append("name", values.name.trim());
    formData.append("title", values.title.trim());
    formData.append("description", values.description.trim());
    formData.append("category", values.category);
    formData.append("securityDeposit", Number(values.securityDeposit));
    formData.append("stock", stock);
    formData.append("availableQuantity", stock);
    formData.append("tenurePlans", JSON.stringify(tenurePlans));

    files.forEach((file) => {
      formData.append("images", file);
    });

    if (!files.length && currentImages.length) {
      formData.append("images", JSON.stringify(currentImages));
    }

    return formData;
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    const payload = buildProductFormData(createForm, selectedFiles);

    try {
      const response = await dispatch(createProduct(payload)).unwrap();
      console.log("response : ", response);

      setCreateForm({
        name: "",
        title: "",
        description: "",
        category: "furniture",
        images: [],
        price: "",
        securityDeposit: "",
        availableTenure: [],
        stock: "",
      });
      setImage([]);
      setSelectedFiles([]);
      setPage(1);
      dispatch(fetchProducts(buildQueryParams(1)));
      setIsOpenForm(false);
    } catch (err) {
      console.error("Create failed", err.message);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!editingProduct) return;

    const payload = buildProductFormData(
      {
        ...formValues,
        name: formValues.name.trim() || editingProduct.name,
        title: formValues.title.trim() || editingProduct.title,
        description: formValues.description.trim() || editingProduct.description,
        category: formValues.category.trim() || editingProduct.category,
      },
      selectedFiles,
      editingProduct.images || [],
    );

    try {
      await dispatch(
        updateProduct({ productId: editingProduct._id, data: payload }),
      ).unwrap();
      setIsModalOpen(false);
      setEditingProduct(null);
      setImage([]);
      setSelectedFiles([]);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <button
        onClick={handleAddNewItem}
        className="flex  gap-1 items-center bg-blue-500 text-white border rounded-md shadow-md p-2 my-2"
      >
        <IoAddSharp />
        Add New Item
      </button>
      <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Inventory
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Manage products
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review stock, update pricing, and keep your catalog organized.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <FiSearch className="text-slate-400" />
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search products"
                className="w-full bg-transparent outline-none"
              />
            </label>

            <select
              value={categoryFilter}
              onChange={handleCategoryFilter}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
            >
              <option value="all">All categories</option>
              <option value="furniture">Furniture</option>
              <option value="appliance">Appliance</option>
            </select>

            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
            >
              <option value="all">All status</option>
              <option value="in-stock">In stock</option>
              <option value="out-of-stock">Out of stock</option>
            </select>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong."}
          </div>
        ) : null}

        {isOpenForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
            <AddNewProduct
              mode="create"
              onChange={handleCreateInputChange}
              onSubmit={handleCreateSubmit}
              onFileUpload={handleFileUpload}
              image={image}
              onCancel={() => {
                setImage([]);
                setSelectedFiles([]);
                setIsOpenForm(false);
              }}
              formData={createForm}
            />
          </div>
        )}

        <div className="overflow-x-auto">
          <ProductTable
            loading={loading}
            filteredProducts={filteredProducts}
            openEditModal={openEditModal}
            handleDelete={handleDelete}
          />
        </div>

        <Stack spacing={2} className=" pt-4 border-t border-slate-300">
          <div className="flex justify-between items-center ">
            <p className="text-sm tracking-wider">
              Showing {page * itemsPerPage - itemsPerPage + 1}-
              {page * itemsPerPage} of {meta?.total || 0} assets
            </p>

            <Pagination
              page={Math.min(page, totalPages)}
              variant="outlined"
              shape="rounded"
              count={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </Stack>
      </div>

      {isModalOpen && editingProduct ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <AddNewProduct
            mode="edit"
            formData={formValues}
            onChange={handleInputChange}
            onSubmit={handleSave}
            onFileUpload={handleFileUpload}
            image={image}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingProduct(null);
              setImage([]);
              setSelectedFiles([]);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Products;
