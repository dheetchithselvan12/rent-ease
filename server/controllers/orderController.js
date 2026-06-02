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

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error(error);
    }

};

export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderDetailes = await Order.findById(orderId)

        res.status(200).json({
            success: true,
            data: orderDetailes
        })
        
    } catch (error) {
        console.error(error);
    
    }
}