import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, password, email, bio, profilePicture } = req.body;

        // Validate input data
        if (!username || !password || !email) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // Check if user with the given email already exists
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({
                message: "Email already in use",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            bio: bio || '', // Default to an empty string if not provided
            profilePicture: profilePicture || '' // Default to an empty string if not provided
        });

        // Respond with the created user information
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                bio: newUser.bio,
                profilePicture: newUser.profilePicture
                // Don't return the password in the response for security reasons
            }
        });

    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input data
        if (!username || !password) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }

        // Create a token
        const tokenData = {
            userId: user._id
        };

        // Generate the JWT token
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Respond with the user details and token
        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
                httpOnly: true, // Fixed option name
                sameSite: "strict"
            })
            .json({
                message: "Login successful",
                success: true,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token
                }
            });

    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logout successful",
            success: true,
        })
    } catch (error) {

    };
};
export const updateprofile = async (req, res) => {
    try {
        const { username, email, bio, profilePicture } = req.body;
        if (!username || !email || !bio || !profilePicture) {
            return res.status(200).json({
                message: "something is missing",
                success: false
            });
        };

        const userId = req.id
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            })
        }

        user.username = username;
        user.email = email;
        user.bio = bio;
        user.profilePicture = profilePicture;

        await user.save();

    } catch (error) {

    }
}