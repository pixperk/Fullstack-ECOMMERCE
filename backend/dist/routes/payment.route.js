import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allCoupons, applyDiscount, createPaymentIntent, deleteCoupon, getCoupon, newCoupon, updateCoupon, } from "../controllers/payment.controller.js";
const app = express.Router();
app.post("/create", createPaymentIntent);
app.get("/discount", applyDiscount);
app.post("/coupon/new", adminOnly, newCoupon);
app.get("/coupon/all", adminOnly, allCoupons);
app.delete("/coupon/:id", adminOnly, deleteCoupon);
app
    .route("/coupon/:id")
    .get(adminOnly, getCoupon)
    .put(adminOnly, updateCoupon)
    .delete(adminOnly, deleteCoupon);
export default app;
