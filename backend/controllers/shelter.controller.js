import { Shelter } from "../models/shelter.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerShelter = async (req, res) => {
    try {
        // Extract data from request body
        const {
            name,
            address,
            contactNumber,
            password,
            email,
            website,
            description,
            capacity,
            currentOccupancy,
            openingHours
        } = req.body;

        // Validate required fields
        if (!name || !address || !capacity || !email || !website || !contactNumber || !password) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Shelter document
        const newShelter = new Shelter({
            name,
            address,
            contactNumber,
            email,
            password: hashedPassword,
            website,
            description,
            capacity,
            currentOccupancy,
            openingHours
        });

        // Save the shelter to the database
        await newShelter.save();

        // Respond with success message
        return res.status(201).json({
            message: "Appliction to register shelter registered successfully",
            success: true,
            shelter: newShelter
        });

    } catch (error) {
        // Log the error and respond with an error message
        console.error("Error registering shelter:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const getSuggestedShelters = async (req, res) => {
    try {
        // Fetch shelters with applicationStatus set to true
        const shelters = await Shelter.find({ applicationStatus: true })
            .limit(10) // Limit the number of suggestions, if needed
            .exec();

        // Check if shelters are found
        if (!shelters.length) {
            return res.status(404).json({
                message: "No shelters available for suggestions.",
                success: false
            });
        }

        // Respond with the list of suggested shelters
        return res.status(200).json({
            message: "Suggested shelters retrieved successfully.",
            success: true,
            shelters
        });

    } catch (error) {
        console.error("Error fetching suggested shelters:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const acceptShelterApplication = async (req, res) => {
    try {
        const { shelterId } = req.params; // Shelter ID to be approved

        // Find the shelter by ID
        const shelter = await Shelter.findById(shelterId);
        if (!shelter) {
            return res.status(404).json({
                message: "Shelter not found",
                success: false
            });
        }

        // Update the application status to accepted
        shelter.applicationStatus = true; // Assuming you have an applicationStatus field
        await shelter.save(); // Save the updated shelter document

        return res.status(200).json({
            message: "Shelter application accepted successfully",
            success: true,
            shelter
        });

    } catch (error) {
        console.error("Error accepting shelter application:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
