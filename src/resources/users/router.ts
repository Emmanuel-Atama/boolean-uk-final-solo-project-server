import express from "express";
import {  deleteUser, getAll, getOneById, login, register } from "./controller";

const router = express.Router()

router.get("/", getAll)
router.get("/:id", getOneById)
router.post("/", register)
router.post("/login", login)
router.delete("/:id", deleteUser)

export default router
