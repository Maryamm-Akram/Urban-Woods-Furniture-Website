const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{type:String , required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true, min:0},
    category:{type:String, required:true},
    stock:{type:String, required:true}
},{collection: "products"}
)

const Product= mongoose.model("Product", productSchema);
module.exports=Product;

