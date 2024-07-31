// Import necessary models
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

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

        // Create and save the post
        const newPost = new Post({
            content,
            imageUrl,
            author: authorId
        });

        const savedPost = await newPost.save();

        // Populate the author field
        const postWithAuthor = await Post.findById(savedPost._id)
            .populate('author', 'username') // Populate author with username
            .exec();

        // Respond with the post data
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

// Get all posts (newsfeed)
export const getNewsfeed = async (req, res) => {
    try {
        const posts = await Post.find()
        /// .populate('author', 'username') // Populate author with username
        //.sort({ createdAt: -1 }) // Sort by creation date
        //.exec();

        return res.status(200).json({
            message: "Posts retrieved successfully",
            success: true,
            posts
        });

    } catch (error) {
        console.error("Error retrieving posts:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
