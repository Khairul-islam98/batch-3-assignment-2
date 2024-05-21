import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductFromDB = async (searchTerm?: string) => {
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    const result = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
        { tags: { $in: [regex] } },
      ],
    });
    return result;
  } else {
    return await Product.find();
  }
};
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateSingleProductFromDB = async (id: string, payload: TProduct) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true },
  );
  return result;
};
const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteProductFromDB,
};
