import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.model.js";
export const connectDB = (url, dbName) => {
    mongoose
        .connect(url, { dbName })
        .then((c) => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log(`Mongo DB Cnonection Error : ${e}`));
};
export const invalidateCache = async ({ product, order, admin, userId, orderId, productId, }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "all-products",
        ];
        if (typeof productId === "string")
            productKeys.push(`product-${productId}`);
        if (typeof productId === "object")
            productId.forEach((i) => productKeys.push(`product-${i}`));
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
        ];
        myCache.del(orderKeys);
    }
    if (admin) {
    }
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error("Product cannot be found");
        product.stock -= order.quantity;
        await product.save();
    }
};
