import express from "express";
import {  deleteUser, getAll, getOneById, login, register } from "./controller";

const usersRouter = express.Router()

usersRouter.get("/", getAll)
usersRouter.get("/:id", getOneById)
usersRouter.post("/", register)
usersRouter.post("/login", login)
usersRouter.delete("/:id", deleteUser)

export default usersRouter
