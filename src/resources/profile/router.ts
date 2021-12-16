import express from "express";
import { protect } from "../login/controller";
import { deleteProfile, getAllProfile, getMyProfile, getOneProfileById, updateProfile } from "./controller";

const profileRouter = express.Router()

profileRouter.get("/", getAllProfile)
profileRouter.get("/me", getMyProfile)
profileRouter.get("/:id", getOneProfileById)
profileRouter.put("/:id", updateProfile)
profileRouter.delete("/:id", deleteProfile)
//my protect goes underneath here before getMyProfile 


export default profileRouter
