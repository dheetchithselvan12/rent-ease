import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try{
        const apiOrderData =  req.body;
        console.log("apiOrderData:", apiOrderData);
        
        if(!apiOrderData){
            return res.status(400).json({
                success: false,
                message: "Missing order data"
            });
        } 

        const order = new Order(apiOrderData);
        await order.save();


         res.status(201).json({
            success: true,
            data: order
        });

    } catch (error) {
        console.error(error);
        
    };

}