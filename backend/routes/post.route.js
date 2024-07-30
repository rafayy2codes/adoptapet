import express from 'express';
import {
    createPost,
    getNewsfeed

} from '../controllers/post.controller.js'; // Adjust the path as needed
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Create a new post
router.route("/posts").post(isAuthenticated, createPost);

router.route('/newsfeed').get(isAuthenticated, getNewsfeed);

export default router;
