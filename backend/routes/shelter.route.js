import express from 'express';
import { registerShelter, getSuggestedShelters, acceptShelterApplication, loginShelter, logoutshelter } from '../controllers/shelter.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import isShelter from '../middleware/isShelter.js';

const router = express.Router();


router.route("/registershelter").post(registerShelter);
router.route("/loginshelter").post(loginShelter);
router.route("/getshelter").get(isAuthenticated, getSuggestedShelters);
router.route("/logoutshelter").get(logoutshelter);
export default router;
