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
        if (!name || !capacity || !email || !website || !contactNumber || !password) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        // Hash the password
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
            message: "Shelter registered successfully",
            success: true,
            shelter: newShelter
        });

    } catch (error) {
        console.error("Error registering shelter:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};



export const loginShelter = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Validate input data
        if (!name || !password) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // Find the shelter by name
        const shelter = await Shelter.findOne({ name });
        if (!shelter) {
            return res.status(400).json({
                message: "Incorrect name or password",
                success: false
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, shelter.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect name or password",
                success: false
            });
        }

        // Check application status
        // if (!shelter.applicationStatus) {
        // return res.status(403).json({
        //   message: "Application not approved. Access denied.",
        // success: false
        //     });
        // }

        // Create token payload
        const tokenData_Shelter = {
            shelterId: shelter._id
        };

        // Generate the JWT token
        const token_forShelter = jwt.sign(tokenData_Shelter, process.env.SECRET_KEY_for_shelter, { expiresIn: '1d' });

        // Respond with the shelter details and token
        return res.status(200)
            .cookie("token", token_forShelter, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
                httpOnly: true, // Secure cookies (not accessible via JavaScript)
                sameSite: "strict" // Helps prevent CSRF attacks
            })
            .json({
                message: "Login successful",
                success: true,
                shelter: {
                    _id: shelter._id,
                    name: shelter.name,
                    email: shelter.email,
                    token_forShelter
                }
            });

    } catch (error) {
        console.error("Error logging in shelter:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};








export const getSuggestedShelters = async (req, res) => {
    try {
        // Fetch shelters with applicationStatus set to true
        const shelters = await Shelter.find({ applicationStatus: false })
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

        // Check if the application status is already accepted
        if (shelter.applicationStatus) {
            return res.status(400).json({
                message: "Application is already accepted",
                success: false
            });
        }

        // Update the application status to accepted
        shelter.applicationStatus = true;
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

