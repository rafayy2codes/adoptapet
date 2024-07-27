import mongoose from "mongoose";


const donationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    donor: { type: Schema.Types.ObjectId, ref: 'User' }, // User who made the donation
    shelter: { type: Schema.Types.ObjectId, ref: 'Shelter' }, // Shelter receiving the donation
    date: { type: Date, default: Date.now },
});

export const Donation = mongoose.model('Donation', donationSchema);
