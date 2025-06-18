import mongoose from "mongoose";

const ridesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    from: {
        type: String,
        required: true,
        trim: true
    },
    to: {
        type: String,
        required: true,
        trim: true
    },
    distance:{
        type: String,
        required: true,
    },
    fare: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    rider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export default mongoose.model("Ride", ridesSchema)