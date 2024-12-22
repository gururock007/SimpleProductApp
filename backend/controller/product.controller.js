import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const fetchProduct = async (req, res) => {
    try {
        const allProduct = await Product.find({});
        console.log("Fetched all products");
        res.status(200).json({ success : true, message : "All products are fetched", data : allProduct});
    } catch (error) {
        console.error(`error in fetching data\nError message : ${error.message}`);
        res.status(500).json({ success : false, message: "Error in fetching data"});
    }
}

export const createProduct = async (req,res) => {
    
    const product = req.body;

    if ( !product.name || !product.price || !product.url ){
        console.log("Please fill all the fiead in the product");
        return res.status(400).json( {success : false , message : "Please fill the form" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        console.log("Product saved");
        res.status(201).json({ success : true, message : "Product created Successfully", product : newProduct});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success : false , message : "Server Error"});
    }
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if( !mongoose.Types.ObjectId ){
        console.log('Incvalid Product Id');
        return res.status(404).json({ success : false , message : " Invalid Product Id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        console.log(`Product id : ${id} is deleted successfully `);
        res.status(200).json({success : true, message : "Product deleted Successfully"});
    } catch (error) {
        console.log(`Cannot delete the product\nerror : ${error.message}`);
        res.status(404).json({success : false, message : "Product not found"});
    } 
}

export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if ( !mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : true, message : " Invalid Product Id"})
    }
    try {
        await Product.findByIdAndUpdate(id, product, {new : true} );
        console.log(` Product Upadated ${id}`);
        res.status(200).json({ suceess : true, message : " Product updated successfully", data : product });
    } catch (error) {
        console.log(`cannot update the product\nerror ${error.message}`);
        res.status(500).json({ success : false, message : " error in updating the product ", data : product});
    }
}