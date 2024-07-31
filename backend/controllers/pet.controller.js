import { Pet } from '../models/pet.model.js'; // Import your Pet model

// Create a new pet
export const createPet = async (req, res) => {
    try {
        const { name, species, breed, age, description, availableForAdoption, imageUrl, shelter } = req.body;

        // Validate required fields
        if (!name || !species || !availableForAdoption) {
            return res.status(400).json({
                message: "Name, species, and availability status are required.",
                success: false
            });
        }

        if (availableForAdoption === false) {
            return res.status(400).json({
                message: "Pets not available for adoption must be associated with a shelter.",
                success: false
            });
        }

        // Create a new Pet document
        const newPet = new Pet({
            name,
            species,
            breed,
            age,
            description,
            availableForAdoption,
            imageUrl,
            shelter
        });

        // Save the pet to the database
        await newPet.save();

        // Respond with the newly created pet
        return res.status(201).json({
            message: "Pet created successfully.",
            success: true,
            pet: newPet
        });
    } catch (error) {
        console.error("Error creating pet:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Retrieve all pets
export const getPets = async (req, res) => {
    try {
        // Fetch all pets from the database and populate shelter reference
        const pets = await Pet.find()
            .populate('shelter', 'name') // Populate only the name field of the shelter
            .exec();

        // Respond with the list of pets
        return res.status(200).json({
            message: "Pets retrieved successfully.",
            success: true,
            pets
        });
    } catch (error) {
        console.error("Error retrieving pets:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Retrieve a single pet by ID
export const getPetById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the pet by ID
        const pet = await Pet.findById(id).populate('shelter').exec(); // Populate shelter reference

        if (!pet) {
            return res.status(404).json({
                message: "Pet not found.",
                success: false
            });
        }

        // Respond with the pet details
        return res.status(200).json({
            message: "Pet retrieved successfully.",
            success: true,
            pet
        });
    } catch (error) {
        console.error("Error retrieving pet:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Update a pet by ID
export const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find the pet by ID and update it
        const pet = await Pet.findByIdAndUpdate(id, updates, { new: true });

        if (!pet) {
            return res.status(404).json({
                message: "Pet not found.",
                success: false
            });
        }

        // Respond with the updated pet
        return res.status(200).json({
            message: "Pet updated successfully.",
            success: true,
            pet
        });
    } catch (error) {
        console.error("Error updating pet:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Delete a pet by ID
export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the pet by ID and delete it
        const pet = await Pet.findByIdAndDelete(id);

        if (!pet) {
            return res.status(404).json({
                message: "Pet not found.",
                success: false
            });
        }

        // Respond with success message
        return res.status(200).json({
            message: "Pet deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error deleting pet:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
