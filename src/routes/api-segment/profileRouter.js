import express from "express";
import ProfileController from "../../application/controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.put("/update", ProfileController.updateProfile);
profileRouter.put("/change-password", ProfileController.updatePassword);

export default profileRouter;
