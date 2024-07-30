import express from 'express';
import { registerShelter, getSuggestedShelters, acceptShelterApplication, loginShelter } from '../controllers/shelter.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();


router.route("/registershelter").post(registerShelter);
router.route("/loginshelter").post(loginShelter);
router.route("/getshelter").get(isAuthenticated, getSuggestedShelters);
export default router;
