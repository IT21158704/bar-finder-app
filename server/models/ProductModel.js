import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'stores'
    },
    productName: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        enum: ["stock", "outofstock"],
    },
    img: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;