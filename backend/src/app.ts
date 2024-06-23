import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";

import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";

const port = 4000;

const app = express();

app.use(express.json());

connectDB("mongodb://localhost:27017", "ECommerce");

export const myCache = new NodeCache();

app.get("/", (req, res) => {
  res.send("Api Working with /api/v1");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
