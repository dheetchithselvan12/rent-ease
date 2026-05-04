import Product from "../models/Product.js";


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