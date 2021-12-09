"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const hobbyRouter = express_1.default.Router();
hobbyRouter.post("/", controller_1.createHobby);
hobbyRouter.get("/", controller_1.getAll);
hobbyRouter.get("/:id", controller_1.getOneById);
hobbyRouter.delete("/:id", controller_1.deleteHobby);
exports.default = hobbyRouter;
