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

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        console.log("Params Id: ", req.params.id);
        console.log("Order: ", order);
        
        if(!order) {
            return res.status(404).json({success: false, message: "Order not found"});
        }

        order.orderStatus = req.body.orderStatus;
        await order.save();

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message,
        });
    }
}