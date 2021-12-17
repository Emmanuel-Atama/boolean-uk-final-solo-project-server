import express from "express";
import { getAll, sendRequest, updateOneById, deleteUserRequest } from "./controller";

const usersRequestRouter = express.Router()

usersRequestRouter.get("/", getAll)

usersRequestRouter.post("/", sendRequest)

usersRequestRouter.put("/:id", updateOneById)

usersRequestRouter.delete("/:id", deleteUserRequest)

export default usersRequestRouter
