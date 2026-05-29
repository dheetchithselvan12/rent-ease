export const createOrder =  (req, res) => {
    try{
        const apiOrderData =  req.body;
        console.log("apiOrderData:", apiOrderData);
        
        if(!apiOrderData){
            return res.status(400).json({
                success: false,
                message: "Missing order data"
            });
        } 
         res.status(201).json({
            success: true,
            data: apiOrderData
        });

    } catch (error) {
        console.error(error);
        
    };

}