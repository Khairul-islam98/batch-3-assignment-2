"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantsSchema = zod_1.z.object({
    type: zod_1.z.string({ required_error: 'Type is required.' }),
    value: zod_1.z.string({ required_error: 'Value is required.' }),
});
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number({ required_error: 'Quantity is required.' })
        .min(0, { message: 'Inventory Quantity must be at least 0' }),
    inStock: zod_1.z.boolean({ required_error: 'InStock status is required.' }),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    description: zod_1.z.string({ required_error: 'Description is required.' }),
    price: zod_1.z
        .number({ required_error: 'Price is required.' })
        .positive({ message: 'Price must be a positive number.' }),
    category: zod_1.z.string({ required_error: 'Category is required.' }),
    tags: zod_1.z.array(zod_1.z.string({ required_error: 'Tags are required and must be a string.' })),
    variants: zod_1.z.array(variantsSchema, {
        required_error: 'Variants are required and must contain at least one variant.',
    }),
    inventory: inventorySchema,
});
exports.default = productValidationSchema;
