import ReviewModel from "../models/ReviewModel.js";

export const createReview = async (req, res) => {
    const userId = req.loggedInId;
    const { storeId, rating, feedback } = req.body;
    try {
        const newReview = await ReviewModel.create({
            userId,
            storeId, 
            rating, 
            feedback
        });

        return res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getStoreReviews = async (req, res) => {
    const { storeId } = req.body;

    try {
        // Fetch marks data with populated student details based on the subject ID
        const storesData = await ReviewModel.find({ storeId: storeId })
        .populate({
            path: 'userId',
            model: 'users'  
        });

        res.status(200).json({ storesData });
    } catch (error) {
        console.error('Error fetching Stores data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const  id  = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedSub = await ReviewModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Review Deleted Successfully', subject:deletedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateReview = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedReview = await ReviewModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Review Updated Successfully', subject: updatedReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}