import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            default: 0.0,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String, 
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, {
    timestamps: true
}
);

export default mongoose.model('Products', productsSchema);
