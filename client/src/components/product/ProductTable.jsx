import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getFirstProductImageUrl } from "../../utils/productImages";

const ProductTable = ({
  loading,
  filteredProducts,
  openEditModal,
  handleDelete,
}) => {
  return (
    <table className="min-w-full divide-y divide-slate-200 text-sm">
      <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        <tr>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Monthly Rent</th>
          <th className="px-4 py-3">Stock</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
        {loading ? (
          <tr>
            <td colSpan="7" className="px-4 py-10 text-center text-slate-500">
              Loading products...
            </td>
          </tr>
        ) : filteredProducts.length === 0 ? (
          <tr>
            <td colSpan="7" className="px-4 py-10 text-center text-slate-500">
              No products found for the selected filters.
            </td>
          </tr>
        ) : (
          filteredProducts.map((product) => {
            const monthlyRent = product.tenurePlans?.[0]?.pricePerMonth;
            const status = product.stock > 0 ? "In stock" : "Out of stock";
            const imageUrl = getFirstProductImageUrl(product.images);

            return (
              <tr key={product._id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-400">
                      No image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">
                    {product.title}
                  </div>
                  <div className="text-xs text-slate-500">{product.name}</div>
                </td>
                <td className="px-4 py-3 capitalize">{product.category}</td>
                <td className="px-4 py-3">
                  {monthlyRent ? `₹${monthlyRent}` : "—"}
                </td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(product)}
                      className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50"
                      aria-label={`Edit ${product.title}`}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="rounded-full p-2 text-rose-600 transition hover:bg-rose-50"
                      aria-label={`Delete ${product.title}`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
