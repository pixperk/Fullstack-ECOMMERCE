import mongoose from "mongoose"

export const connectDB = (url:string,dbName:string) => {
    mongoose.connect(url,{dbName})
    .then((c)=>console.log(`DB Connected to ${c.connection.host}`)
    )
    .catch((e)=>console.log(`Mongo DB Cnonection Error : ${e}`)
    )

}