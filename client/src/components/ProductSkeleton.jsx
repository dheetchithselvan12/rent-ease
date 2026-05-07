const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-40 bg-gray-300 rounded-xl"></div>

      {/* Text Skeleton */}
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        <div className="h-4 bg-gray-300 rounded w-1/3"></div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
