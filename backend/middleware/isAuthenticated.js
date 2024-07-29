import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false
                });
            }

            // Store user information in the request object
            req.user = decoded; // Assuming your JWT payload contains user information

            // Call the next middleware or route handler
            next();
        });

    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export default isAuthenticated;
