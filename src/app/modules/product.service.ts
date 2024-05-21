import { TProduct } from './product.interface';
import { Product } from './product.model';

// create a post to post into db
const createProductIntoDb = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// service for get a single product from db
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

// get all product from db
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  //console.log(result)
  return result;
};

// export
export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDB,
  getSingleProductFromDB
};
