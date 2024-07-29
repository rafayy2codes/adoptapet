import express from 'express';
import { registerShelter, getSuggestedShelters, acceptShelterApplication } from '../controllers/shelter.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();


router.route("/registershelter").post(registerShelter);
router.route("/accept/:shelterId").post(acceptShelterApplication);
router.route("/feed").get(isAuthenticated, getSuggestedShelters);


export default router;
