import mongoose, { Schema } from "mongoose";

const productSchema: Schema = new Schema({
    name : { type:String, require: true },
    price : { type:Number, require: true },
    category : { type:String, require: true},
}, {collection: 'Product'})

export default mongoose.model('Product',productSchema)