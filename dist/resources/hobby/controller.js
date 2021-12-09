"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHobby = void 0;
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
function createHobby(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        console.log("Request Body: ", req.body);
        try {
            const hobbies = yield dbClient_1.default.hobby.create({
                data: {
                    names: req.body.names
                }
            });
        }
        catch (error) {
            res.status(500).json({ message: "Hobby created successfully" });
        }
    });
}
exports.createHobby = createHobby;
