import { TOrder } from "./order.interface";
import Order from "./order.model";

const createOrderIntoDb = async(orderData: TOrder) =>{
    const result = await Order.create(orderData);
    return result;
}

const getOrdersFromDb = async(email?: string) =>{
    let result
    if (email){
        result =  await Order.find({email: email})
    }else{
        result = await Order.find()
    }
    return result
}

export const OrderService = {
    createOrderIntoDb,
    getOrdersFromDb
}
