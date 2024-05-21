import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create a post to post into db
const createProductIntoDb = async (productData: TProduct) =>{
    const result = await Product.create(productData)
    return result
}

// export
export const ProductServices ={
    createProductIntoDb,
    
}