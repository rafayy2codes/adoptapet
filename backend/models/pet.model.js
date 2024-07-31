import mongoose from "mongoose";


const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },  // e.g., Dog, Cat, etc.
    breed: { type: String },
    age: { type: Number },
    description: { type: String },
    availableForAdoption: { type: Boolean, default: true },
    imageUrl: { type: String },
    shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter' }, // Shelter where the pet is located
    createdAt: { type: Date, default: Date.now },
});

export const Pet = mongoose.model('Pet', petSchema);

