import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' }, // User who sent the message
    receiver: { type: Schema.Types.ObjectId, ref: 'User' }, // User who received the message
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);

