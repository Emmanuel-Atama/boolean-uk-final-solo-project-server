"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get("/", controller_1.getAll);
router.get("/:id", controller_1.getOneById);
router.post("/register", controller_1.register);
router.post("/login", controller_1.login);
exports.default = router;
