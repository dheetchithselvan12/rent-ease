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
        const {category, page = 1, limit = 10} = req.query;

        // filter object
        const filter = {}
        if(category){
            filter.category = category.toLowerCase();
        }

        // pagination calc
        const pageNum = parseInt(page, 10);
        const limitNUm = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNUm;

        // Query DB
        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limitNUm)
                .lean(),
            Product.countDocuments(filter),
        ]);

        // Response
        res.status(200).json({
            success: true,
            meta: {
                page: pageNum,
                limit: limitNUm,
                total,
                pages: Math.ceil(total / limitNUm)
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