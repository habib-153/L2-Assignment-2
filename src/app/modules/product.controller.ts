import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  // try catch for error handling
  try {
    const productData = req.body;
    // validate through zod
    const zodParsedData = productZodSchema.parse(productData)
    
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

// export
export const ProductControllers = {
  createProduct,
};
