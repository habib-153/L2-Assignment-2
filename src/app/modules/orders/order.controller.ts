import { Request, Response } from 'express';
import orderZodSchema from './order.validation';
import { z } from 'zod';
import { Product } from '../products/product.model';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  // validate through zod
  const zodParsedData = orderZodSchema.parse(orderData);
  try {
    const { productId, quantity } = zodParsedData;
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }
    if (product.inventory.quantity < quantity) {
      throw new Error('Insufficient quantity available in inventory');
    }
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    const result = await OrderService.createOrderIntoDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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
        message: 'Something went wrong',
      });
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderService.getOrdersFromDb(email as string);
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order Not found',
      });
    }
    res.status(200).json({
        success: true,
        message: email
          ? `Orders fetched successfully for user email!`
          : 'Orders fetched successfully!',
        data: result,
      });
  } catch (err) {
    res.status(404).json({
        success: false,
        message: 'Order Not found',
      });
  }
};

export const OrderControllers = {
  createOrder, getOrders
};
