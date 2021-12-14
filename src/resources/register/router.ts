import express from "express";
import {  register } from "./controller";

const registerRouter = express.Router()

registerRouter.post("/", register)


export default registerRouter
