"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const routerProfile = express_1.default.Router();
routerProfile.get("/", controller_1.getAllProfile);
routerProfile.get("/:id", controller_1.getOneProfileById);
routerProfile.put("/:id", controller_1.updateProfile);
exports.default = routerProfile;
