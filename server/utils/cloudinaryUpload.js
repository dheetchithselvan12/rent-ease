import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "rentease/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));

        resolve(result);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
};
