import express from "express";
import { deleteUserRequest, getAll, sendRequest } from "./controller";

const usersRequestRouter = express.Router()

usersRequestRouter.get("/", getAll)

usersRequestRouter.post("/", sendRequest)

usersRequestRouter.delete("/:id", deleteUserRequest)

export default usersRequestRouter