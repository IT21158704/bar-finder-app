import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'stores'
    }
}, { timestamps: true });

const FavoriteModel = mongoose.model("favorites", FavoriteSchema);

export default FavoriteModel;