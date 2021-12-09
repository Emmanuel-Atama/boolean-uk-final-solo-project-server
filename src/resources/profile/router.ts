import express from "express";
import { deleteProfile, getAllProfile, getOneProfileById, updateProfile } from "./controller";

const routerProfile = express.Router()

routerProfile.get("/", getAllProfile)
routerProfile.get("/:id", getOneProfileById)
routerProfile.put("/:id", updateProfile)
routerProfile.delete("/:id", deleteProfile)

export default routerProfile
