import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly  = TryCatch(
    async(req,res,next) => {

        const {id} = req.query;
        if(!id) return next(new ErrorHandler("Kindly Login first",401))
        
        const user = await User.findById(id)
        if(!user) return next(new ErrorHandler("User does not exist",401))
        if(user.role!=="admin") return next(new ErrorHandler("Unauthorised (Not an admin)",401))

        next()
    
    }
)