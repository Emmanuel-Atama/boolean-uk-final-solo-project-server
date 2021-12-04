import express from "express";
import { getAll, getOneById, login, register } from "./controller";

const router = express.Router()

router.get("/", getAll)
router.get("/:id", getOneById)
router.post("/register", register)
router.post("/login", login)

export default router 