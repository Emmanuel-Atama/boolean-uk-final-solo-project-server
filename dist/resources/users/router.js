"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const usersRouter = express_1.default.Router();
usersRouter.get("/", controller_1.getAll);
usersRouter.get("/:id", controller_1.getOneById);
usersRouter.delete("/:id", controller_1.deleteUser);
exports.default = usersRouter;
