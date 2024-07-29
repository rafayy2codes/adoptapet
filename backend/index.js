import cookieParser from "cookie-parser";  // Correct import for cookie-parser
import cors from "cors";
import express from "express";  // Consistent ES module import style
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import ShelterRoute from "./routes/shelter.route.js"
import userRoute from "./routes/user.route.js"
import postRoute from './routes/post.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Route definition
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'youre hacked!',
        success: true
    });
});

// Middleware setupsu
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // Correctly call cookieParser as middleware

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",  // Correct URL format
    credentials: true
};
app.use(cors(corsOptions));


app.use("/api/v1/user", userRoute);


// http://localhost:8000/api/v1/user/register
// http://localhost:8000/api/v1/user/update
// http://localhost:8000/api/v1/user/login


app.use("/api/v1/shelter", ShelterRoute);

// http://localhost:8000/api/v1/shelter/registershelter
// http://localhost:8000/api/v1/shelter//accept/:shelterId
// http://localhost:8000/api/v1/shelter/feed

app.use("/api/v1/post", postRoute);

// http://localhost:8000/api/v1/post/posts
// http://localhost:8000/api/v1/shelter//accept/:shelterId
// http://localhost:8000/api/v1/shelter/feed

// Start the server
app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`);
});
