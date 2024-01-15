import ProductModel from "../models/ProductModel.js";

export const createProduct = async (req, res) => {

    const { storeId, productName, category, size, price, availability, img } = req.body;
    try {
        const newProduct = await ProductModel.create({
            storeId,
            productName, 
            category, 
            size, 
            price, 
            availability, 
            img
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const Products = await ProductModel.find()
        .populate(
            'storeId'
            ).exec();

        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedSub = await ProductModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product Deleted Successfully', subject:deletedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Product Updated Successfully', subject: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}