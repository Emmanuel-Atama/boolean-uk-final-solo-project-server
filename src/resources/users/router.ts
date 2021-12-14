import express from "express";
import {  deleteUser, getAll, getOneById } from "./controller";

const usersRouter = express.Router()

usersRouter.get("/", getAll)
usersRouter.get("/:id", getOneById)
usersRouter.delete("/:id", deleteUser)

export default usersRouter