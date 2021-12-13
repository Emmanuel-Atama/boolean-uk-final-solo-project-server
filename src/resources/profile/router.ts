import express from "express";
import { deleteProfile, getAllProfile, getOneProfileById, updateProfile } from "./controller";

const profileRouter = express.Router()

profileRouter.get("/", getAllProfile)
profileRouter.get("/:id", getOneProfileById)
profileRouter.put("/:id", updateProfile)
profileRouter.delete("/:id", deleteProfile)

export default profileRouter
