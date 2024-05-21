import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodSchema from './product.validation';

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
    res.status(500).json({
      success: false,
      message: 'Operation Failed',
    });
  }
};

// controller for get all prod
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    // console.log(result, 'res');
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      // error: err,
    });
  }
};

// controller for get a single std
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; // destruct id from params
    const result = await ProductServices.getSingleProductFromDB(productId);
    // response send id success
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!!',
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

// export
export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
