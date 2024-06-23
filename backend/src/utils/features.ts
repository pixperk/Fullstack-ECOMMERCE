import mongoose from "mongoose";
import { invalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.model.js";

export const connectDB = (url: string, dbName: string) => {
  mongoose
    .connect(url, { dbName })
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((e) => console.log(`Mongo DB Cnonection Error : ${e}`));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
}: invalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    const products = await Product.find({}).select("_id");

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });

    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
