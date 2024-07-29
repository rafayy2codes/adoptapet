import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who created the post
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the post
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who made the comment
            content: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

export const Post = mongoose.model('Post', postSchema);

