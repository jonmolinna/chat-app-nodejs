import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    password: String,
    createdAt: String,
}, { versionKey: false });

export default mongoose.model('Users', userSchema);