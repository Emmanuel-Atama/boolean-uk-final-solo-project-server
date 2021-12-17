"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const usersRequestRouter = express_1.default.Router();
usersRequestRouter.get("/", controller_1.getAll);
usersRequestRouter.post("/", controller_1.sendRequest);
usersRequestRouter.delete("/:id", controller_1.deleteUserRequest);
exports.default = usersRequestRouter;
