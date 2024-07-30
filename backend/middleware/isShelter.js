import jwt from 'jsonwebtoken';

const isShelter = (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token_forShelter = req.cookies.token_forShelter;

        // Check if token exists
        if (!token_forShelter) {
            return res.status(401).json({
                message: "Not a shelter, authorization denied",
                success: false
            });
        }

        // Verify the token
        jwt.verify(token_forShelter, process.env.SECRET_KEY_for_shelter, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false
                });
            }

            // Store user information in the request object
            req.Shelter = decoded; // Assuming your JWT payload contains user information

            // Call the next middleware or route handler
            next();
        });

    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(500).json({
            message: "Something went wrong in the middle",
            success: false
        });
    }
};

export default isShelter;
