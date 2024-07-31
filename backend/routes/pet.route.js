import express from 'express';
import {
    createPet,
    getPets,
    getPetById
} from '../controllers/pet.controller.js';
import isShelter from '../middleware/isShelter.js';

const router = express.Router();

// Create a new post
router.route("/createpet").post(isShelter, createPet);
router.route("/getpet").get(getPets);

router.route("/getpetbyid").get(getPetById);

export default router;
