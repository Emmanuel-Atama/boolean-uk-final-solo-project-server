"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const profileRouter = express_1.default.Router();
profileRouter.get("/", controller_1.getAllProfile);
profileRouter.get("/me", controller_1.getMyProfile);
profileRouter.get("/:id", controller_1.getOneProfileById);
profileRouter.put("/:id", controller_1.updateProfile);
profileRouter.delete("/:id", controller_1.deleteProfile);
//my protect goes underneath here before getMyProfile 
exports.default = profileRouter;
