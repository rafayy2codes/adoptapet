import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;  // Retrieve MongoDB URI from environment variables
        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit the process with failure status
    }
};

export default connectDB;
