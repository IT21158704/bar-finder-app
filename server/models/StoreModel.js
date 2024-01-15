import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    storeName: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    location: {

        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        }
    },
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    }
}, { timestamps: true });

const StoreModel = mongoose.model("stores", StoreSchema);

export default StoreModel;