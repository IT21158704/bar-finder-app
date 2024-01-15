import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'stores'
    },
    rating: {
        type: Number,
    },
    feedback: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const ReviewModel = mongoose.model("reviews", ReviewSchema);

export default ReviewModel;