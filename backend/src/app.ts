import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import {config} from 'dotenv'
import morgan from "morgan"

import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import paymentRoute from "./routes/payment.route.js";

config({
  path:"./.env"
})

const port = process.env.PORT || 4000;
const mongoURL = process.env.MONGO_URL || "";

const app = express();

app.use(express.json());
app.use(morgan("dev"))

connectDB(mongoURL, "ECommerce");

export const myCache = new NodeCache();

app.get("/", (req, res) => {
  res.send("Api Working with /api/v1");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
