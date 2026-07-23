export const getProductImageUrl = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.url || "";
};

export const getFirstProductImageUrl = (images) => {
  if (!Array.isArray(images)) return getProductImageUrl(images);
  return getProductImageUrl(images[0]);
};
