import { Post } from '../models/post.model.js'; // Import the Post model

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { content, imageUrl } = req.body;
        const authorId = req.user.id; // Assuming req.user contains authenticated user details

        // Validate content
        if (!content || content.length > 200) {
            return res.status(400).json({
                message: "Content is required and must be less than 200 characters",
                success: false
            });
        }

        // Create a new Post document
        const newPost = new Post({
            content,
            imageUrl,
            author: authorId
        });

        // Save the post to the database
        await newPost.save();

        // Populate the author field
        const postWithAuthor = await Post.findById(newPost._id)
            .populate('author', 'username profilePicture') // Populate author with username and profilePicture
            .exec();

        // Respond with success message and post data
        return res.status(201).json({
            message: "Post created successfully",
            success: true,
            post: postWithAuthor
        });

    } catch (error) {
        console.error("Error creating post:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const getNewsfeed = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 posts per page

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit) // Skip the number of posts based on the current page
            .limit(Number(limit)) // Limit the number of posts returned
            .populate('author', 'username')
            .exec();

        return res.status(200).json({
            message: "Newsfeed retrieved successfully",
            success: true,
            posts
        });
    } catch (error) {
        console.error("Error retrieving newsfeed:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
