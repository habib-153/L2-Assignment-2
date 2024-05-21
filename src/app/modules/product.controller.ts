import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodSchema from './product.validation';
import {z} from 'zod'

const createProduct = async (req: Request, res: Response) => {
  // try catch for error handling
  try {
    const productData = req.body;
    // validate through zod
    const zodParsedData = productZodSchema.parse(productData);

    // send the data into product service
    const result = await ProductServices.createProductIntoDb(zodParsedData);

    // send a response if it post into db successfully
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle Zod validation errors
      const validationErrors = err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors,
      });
    } else {
      // Handle other errors 
      res.status(500).json({
        success: false,
        message: 'Operation Failed',
      });
    }
  }
};


// controller for get a single prod
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; // destruct id from params
    const result = await ProductServices.getSingleProductFromDB(productId);
    // response send id success
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Product not Found',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// update
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const zodParsedData = productZodSchema.parse(data);
    const result = await ProductServices.updateProduct(productId,zodParsedData);
    
    // response send id success
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle Zod validation errors
      const validationErrors = err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors,
      });
    } else {
      // Handle other errors 
      res.status(500).json({
        success: false,
        message: 'Operation Failed',
      });
    }
  }
};

// delete
const deletedProduct = async (req: Request, res: Response) =>{
  try{
    const result = await ProductServices.deleteProductFromDb(req.params.productId)

      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
  }catch(err){
    res.status(500).json({
      success: false,
      message: "Product not found!"
    });
  }
}

// search
const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    
    const result = await ProductServices.searchProductIntoDb(searchTerm as string);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: searchTerm ? `${searchTerm} Products not found` : 'No products found',
      });
    }

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// export
export const ProductControllers = {
  createProduct,
  getSingleProduct,
  updateProduct, deletedProduct, getProducts
};
