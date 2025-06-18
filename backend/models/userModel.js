import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    startDt:{
        type: String,
        required: true
    },
    noOfRides: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride"
    }],
    userType: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model('User', userSchema);
