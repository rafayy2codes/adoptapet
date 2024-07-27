import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String }, // URL or path to the profile picture
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
    followedShelters: [{ type: Schema.Types.ObjectId, ref: 'Shelter' }], // Shelters the user follows
    // Add other fields as needed
});

export const User = mongoose.model('User', userSchema);
