import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.model.js";
import ErrorHandler from "../utils/utility-class.js";
export const newCoupon = TryCatch(async (req, res, next) => {
    const { code, amount } = req.body;
    if (!code || !amount)
        return next(new ErrorHandler("Please enter the code and the amount", 400));
    const coupon = await Coupon.create({ code, amount });
    return res.status(201).json({
        success: true,
        message: `Coupon ${coupon.code} created`,
    });
});
