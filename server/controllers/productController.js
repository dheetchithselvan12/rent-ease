import Product from "../models/Product.js";

// Create new product
export const createProduct = async (req, res) => {
    try{
        const {
            name,
            category,
            securityDeposit,
            stock,
            availableQuantity,
            tenurePlans,
            images,
            title,
            description
        } = req.body;

        // Basic validation
        if(
            !name ||
            !category ||
            !securityDeposit ||
            !stock ||
            !availableQuantity ||
            !tenurePlans ||
            !images ||
            !title ||
            !description 
        ){
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        };

        // Tenure validation
        const allowedDurations = [1, 3, 6, 12];
        const seenDuration = new Set();

        for(let plan of tenurePlans){
            const {duration, pricePerMonth, totalPrice} = plan;
            
            // Duration check
            if(!allowedDurations.includes(duration)){
                return res.status(400).json({
                    success: false,
                    message: `Invalid duration: ${duration}`,
                });
            };

            // Duplicate check
            if(seenDuration.has(duration)){
                return res.status(400).json({
                    success: false,
                    message: `Duplicate duration: ${duration}`,
                });
            };

            seenDuration.add(duration);

            // Price validation
            if(pricePerMonth <= 0){
                return res.status(400).json({
                    success: false,
                    message: "Price must be greater than 0",
                });
            };

            // Total price validation
            if(totalPrice !== duration * pricePerMonth){
                return res.status(400).json({
                    success: false,
                    message: `Invalid totalPrice for duration ${duration}`
                });
            };
        }

        // Create Product
        const product = await Product.create({
            name,
            category,
            securityDeposit,
            stock,
            availableQuantity,
            tenurePlans,
            images,
            title,
            description,
        });

        res.status(201).json({
            success: true,
            data: product
        });

    }catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
         });
    };
};

// Get /api/products
export const getProducts = async (req, res) => {
    try{
        const {category, categories, maxPrice, tenures, search, page = 1, limit = 10} = req.query;

        // filter object
        const filter = {}
        if(category){
            filter.category = category.toLowerCase();
        }

        if (categories) {
            const catsArray = categories.split(',').filter(Boolean).map(c => c.toLowerCase());
            if (catsArray.length > 0) {
                filter.category = { $in: catsArray };
            }
        }

        if (maxPrice) {
            filter["tenurePlans.0.pricePerMonth"] = { $lte: Number(maxPrice) };
        }

        if (tenures) {
            const tenuresArray = tenures.split(',').filter(Boolean).map(Number);
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

        // pagination calc
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        let query = Product.find(filter).sort({createdAt: -1});
        if (limitNum > 0) {
            query = query.skip(skip).limit(limitNum);
        }

        // Query DB
        const [products, total, metadata] = await Promise.all([
            query.lean(),
            Product.countDocuments(filter),
            Product.aggregate([
                { $unwind: "$tenurePlans" },
                {
                    $group: {
                        _id: null,
                        highestPrice: { $max: "$tenurePlans.pricePerMonth" },
                        categories: { $addToSet: "$category" }
                    }
                }
            ])
        ]);

        const highestPrice = metadata[0]?.highestPrice || 10000;
        const allCategories = metadata[0]?.categories || ["furniture", "appliance"];

        // Response
        res.status(200).json({
            success: true,
            meta: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: limitNum > 0 ? Math.ceil(total / limitNum) : 1,
                highestPrice,
                allCategories
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
    try{
        const id = req.params.id;
        
        const product = await Product.findById(id).lean(); 

        if(!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        };

        res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};