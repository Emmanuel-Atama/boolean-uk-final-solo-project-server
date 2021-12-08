import express from "express";
import { getAllProfile, getOneProfileById, updateProfile } from "./controller";

const routerProfile = express.Router()

routerProfile.get("/", getAllProfile)
routerProfile.get("/:id", getOneProfileById)
routerProfile.put("/:id", updateProfile)

export default routerProfile
