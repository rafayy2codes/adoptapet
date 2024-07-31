import mongoose from "mongoose";

const shelterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    contactNumber: { type: String },
    email: { type: String },
    website: { type: String },
    description: { type: String },
    capacity: { type: Number }, // Maximum number of animals the shelter can accommodate
    currentOccupancy: { type: Number, default: 0 }, // Number of animals currently at the shelter
    openingHours: {
        monday: { type: String },
        tuesday: { type: String },
        wednesday: { type: String },
        thursday: { type: String },
        friday: { type: String },
        saturday: { type: String },
        sunday: { type: String },
    },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }], // Pets in the shelter
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }], // Donations received by the shelter
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true }, // Password for shelter login
    applicationStatus: { type: Boolean, default: false }, // Application status
});

// Export the Shelter model
export const Shelter = mongoose.model('Shelter', shelterSchema);
