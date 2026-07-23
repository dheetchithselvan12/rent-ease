import Product from "../models/Product.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

const allowedDurations = [1, 3, 6, 12];

const validateTenurePlans = (tenurePlans) => {
  if (!Array.isArray(tenurePlans) || tenurePlans.length === 0) {
    return {
      valid: false,
      message: "At least one tenure plan is required",
    };
  }

  const seenDuration = new Set();

  for (const plan of tenurePlans) {
    const { duration, pricePerMonth, totalPrice } = plan;

    if (!allowedDurations.includes(duration)) {
      return {
        valid: false,
        message: `Invalid duration: ${duration}`,
      };
    }

    if (seenDuration.has(duration)) {
      return {
        valid: false,
        message: `Duplicate duration: ${duration}`,
      };
    }

    seenDuration.add(duration);

    if (pricePerMonth <= 0) {
      return {
        valid: false,
        message: "Price must be greater than 0",
      };
    }

    if (totalPrice !== duration * pricePerMonth) {
      return {
        valid: false,
        message: `Invalid totalPrice for duration ${duration}`,
      };
    }
  }

  return { valid: true };
};

const parseJsonField = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const normalizeTenurePlans = (tenurePlans) => {
  const parsedPlans = parseJsonField(tenurePlans, []);

  if (!Array.isArray(parsedPlans)) return [];

  return parsedPlans.map((plan) => ({
    duration: Number(plan.duration),
    pricePerMonth: Number(plan.pricePerMonth),
    totalPrice: Number(plan.totalPrice),
  }));
};

const uploadProductImages = async (files = []) => {
  const uploadResults = await Promise.all(
    files.map((file) => uploadToCloudinary(file.buffer)),
  );

  return uploadResults.map((result) => ({
    public_id: result.public_id,
    url: result.secure_url,
  }));
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      securityDeposit,
      stock,
      availableQuantity,
      tenurePlans,
      title,
      description,
    } = req.body;

    if (
      !name ||
      !category ||
      securityDeposit === undefined ||
      stock === undefined ||
      availableQuantity === undefined ||
      !tenurePlans ||
      !title ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!req.files?.length) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    const normalizedTenurePlans = normalizeTenurePlans(tenurePlans);
    const validation = validateTenurePlans(normalizedTenurePlans);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const imageUrls = await uploadProductImages(req.files);

    const product = await Product.create({
      name: name.trim(),
      category: category.toLowerCase(),
      securityDeposit: Number(securityDeposit),
      stock: Number(stock),
      availableQuantity: Number(availableQuantity),
      tenurePlans: normalizedTenurePlans,
      images: imageUrls,
      title: title.trim(),
      description: description.trim(),
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get /api/products
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      categories,
      maxPrice,
      tenures,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    if (category) {
      filter.category = category.toLowerCase();
    }

    if (categories) {
      const catsArray = categories
        .split(",")
        .filter(Boolean)
        .map((c) => c.toLowerCase());
      if (catsArray.length > 0) {
        filter.category = { $in: catsArray };
      }
    }

    if (maxPrice) {
      filter["tenurePlans.0.pricePerMonth"] = { $lte: Number(maxPrice) };
    }

    if (tenures) {
      const tenuresArray = tenures.split(",").filter(Boolean).map(Number);
      if (tenuresArray.length > 0) {
        filter["tenurePlans.duration"] = { $in: tenuresArray };
      }
    }

    if (search) {
      const searchTerm = search.trim();
      if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, "i");
        filter.$or = [
          { name: searchRegex },
          { title: searchRegex },
          { description: searchRegex },
          { category: searchRegex },
        ];
      }
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    let query = Product.find(filter).sort({ createdAt: -1 });
    if (limitNum > 0) {
      query = query.skip(skip).limit(limitNum);
    }

    const [products, total, metadata] = await Promise.all([
      query.lean(),
      Product.countDocuments(filter),
      Product.aggregate([
        {
          $group: {
            _id: null,
            highestPrice: { $max: { $max: "$tenurePlans.pricePerMonth" } },
            categories: { $addToSet: "$category" },
          },
        },
      ]).allowDiskUse(true),
    ]);

    const highestPrice = metadata[0]?.highestPrice || 10000;
    const allCategories = metadata[0]?.categories || ["furniture", "appliance"];

    res.status(200).json({
      success: true,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: limitNum > 0 ? Math.ceil(total / limitNum) : 1,
        highestPrice,
        allCategories,
      },
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };

    if (updateData.category) {
      updateData.category = updateData.category.toLowerCase();
    }

    if (updateData.tenurePlans) {
      updateData.tenurePlans = normalizeTenurePlans(updateData.tenurePlans);
      const validation = validateTenurePlans(updateData.tenurePlans);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: validation.message,
        });
      }
    }

    if (updateData.securityDeposit !== undefined) {
      updateData.securityDeposit = Number(updateData.securityDeposit);
    }

    if (updateData.stock !== undefined) {
      updateData.stock = Number(updateData.stock);
    }

    if (updateData.availableQuantity !== undefined) {
      updateData.availableQuantity = Number(updateData.availableQuantity);
    }

    if (req.files?.length) {
      updateData.images = await uploadProductImages(req.files);
    } else if (updateData.images) {
      updateData.images = parseJsonField(updateData.images, updateData.images);
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    console.log("Product deleted : ", product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
