import express  from "express";
import { createHobby, deleteHobby, getAll, getOneById } from "./controller";

const hobbyRouter = express.Router()

hobbyRouter.post("/", createHobby)
hobbyRouter.get("/", getAll)
hobbyRouter.get("/:id", getOneById)
hobbyRouter.delete("/:id", deleteHobby)

export default hobbyRouter