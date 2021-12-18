import express from "express";
import { getAllImages} from "./controller";

const imagesRouter = express.Router()

imagesRouter.get("/", getAllImages)

export default imagesRouter