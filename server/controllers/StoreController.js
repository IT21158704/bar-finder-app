import StoreModel from "../models/StoreModel.js";

export const createStore = async (req, res) => {
    const sellerId = req.loggedInId;
    const { storeName, contactNo, location, openingTime, closingTime } = req.body;
    try {
        const newStore = await StoreModel.create({
            sellerId,
            storeName, 
            contactNo, 
            location, 
            openingTime, 
            closingTime
        });

        return res.status(201).json(newStore);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMyStores = async (req, res) => {
    const sellerId = req.loggedInId;

    try {
        // Fetch marks data with populated student details based on the subject ID
        const storesData = await StoreModel.find({ sellerId: sellerId });

        res.status(200).json({ storesData });
    } catch (error) {
        console.error('Error fetching Stores data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getStoreById = async (req, res) => {
    const id = req.params.id;

    try {
        // Fetch marks data with populated student details based on the subject ID
        const storeData = await StoreModel.findById(id);

        res.status(200).json({ storeData });
    } catch (error) {
        console.error('Error fetching Stores data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteStore = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedSub = await StoreModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Store Deleted Successfully', subject:deletedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateStore = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedStore = await StoreModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Store Updated Successfully', subject: updatedStore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}