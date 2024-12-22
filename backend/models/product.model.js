import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name : {
        type: String,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    url : {
        type : String,
        requied : true,
    },
}, {
    timestamps : true,
});

const Product = model('Product' , productSchema);

export default Product;