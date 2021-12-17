import express  from "express";
import { createHobby,  getAll, getOneById, updateOneById, deleteHobby } from "./controller";

const hobbyRouter = express.Router()

hobbyRouter.post("/", createHobby)
hobbyRouter.get("/", getAll)
hobbyRouter.get("/:id", getOneById)
hobbyRouter.put("/:id", updateOneById)
hobbyRouter.delete("/:id", deleteHobby)

export default hobbyRouter