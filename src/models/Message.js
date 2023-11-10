import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        trim: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt: String
}, { versionKey: false });

export default mongoose.model('messages', messageSchema);