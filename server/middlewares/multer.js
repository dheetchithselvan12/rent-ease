import multer from "multer";

const storage = multer.memoryStorage();
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const uploadImages = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 4,
  },
  fileFilter: (_req, file, cb) => {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Only image files are allowed"));
  },
}).array("images", 4);

const upload = (req, res, next) => {
  uploadImages(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });
  });
};

export default upload;
