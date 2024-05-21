import { z } from 'zod';

const variantsSchema = z.object({
  type: z.string({ required_error: 'Type is required.' }),
  value: z.string({ required_error: 'Value is required.' }),
});

const inventorySchema = z.object({
  quantity: z
    .number({ required_error: 'Quantity is required.' })
    .min(0, { message: 'Inventory Quantity must be at least 0' }),
  inStock: z.boolean({ required_error: 'InStock status is required.' }),
});

const productValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  description: z.string({ required_error: 'Description is required.' }),
  price: z
    .number({ required_error: 'Price is required.' })
    .positive({ message: 'Price must be a positive number.' }),
  category: z.string({ required_error: 'Category is required.' }),
  tags: z.array(
    z.string({ required_error: 'Tags are required and must be a string.' }),
  ),
  variants: z.array(variantsSchema, {
    required_error:
      'Variants are required and must contain at least one variant.',
  }),
  inventory: inventorySchema,
});

export default productValidationSchema;

console.log('object');
