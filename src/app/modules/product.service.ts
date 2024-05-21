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
// const getAllProductsFromDB = async () => {
//   const result = await Product.find();
//   //console.log(result)
//   return result;
// };

// update product info
const updateProduct = async (_id: string, data: Partial<TProduct>) => {
  const updatedProduct = await Product.findByIdAndUpdate(_id, data, {
    new: true,
  });
  return updatedProduct;
};

// Delete a Product
const deleteProductFromDb = async (id: string) => {
  const deletedProd = await Product.findByIdAndDelete({ _id: id });
  return deletedProd;
};

// Search a product
const searchProductIntoDb = async (queryText?: string) => {
  let result;
  if (queryText){
    const query = queryText
    ? {
        $or: [
          { name: { $regex: queryText, $options: 'i' } },
          { category: { $regex: queryText, $options: 'i' } },
          { description: { $regex: queryText, $options: 'i' } },
          { tags: { $regex: queryText, $options: 'i' } },
        ],
      }
    : {};

  result = await Product.find(query);
  
  }
  else{
  result = await Product.find();
  //console.log(result)
  }
  return result
};

// export
export const ProductServices = {
  createProductIntoDb,
  getSingleProductFromDB,
  updateProduct, deleteProductFromDb,
  searchProductIntoDb
};
