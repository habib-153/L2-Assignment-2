import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

const productVariantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const productInventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true }, // array of string
  variants: [productVariantSchema], // array of product schema
  inventory: productInventorySchema,
});

export const Product = model<TProduct>('Product', productSchema);
