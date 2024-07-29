import express from 'express';
import {
    createPost,

} from '../controllers/post.controller.js'; // Adjust the path as needed
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Create a new post
router.route("/posts").post(isAuthenticated, createPost);


export default router;
