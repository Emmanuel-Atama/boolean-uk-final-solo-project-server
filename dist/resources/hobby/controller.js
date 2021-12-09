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
exports.deleteHobby = exports.getOneById = exports.getAll = exports.createHobby = void 0;
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
            res.json(hobbies);
        }
        catch (error) {
            res.status(500).json({ message: "Hobby created successfully" });
        }
    });
}
exports.createHobby = createHobby;
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Inside getAll", getAll);
        try {
            const users = yield dbClient_1.default.hobby.findMany({});
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
exports.getAll = getAll;
function getOneById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        try {
            const userData = yield dbClient_1.default.hobby.findUnique({
                where: {
                    id: userId,
                },
            });
            res.json(userData);
        }
        catch (error) {
            console.error("[ERROR] getAll: ", { error });
            res.status(500).json({ error });
        }
    });
}
exports.getOneById = getOneById;
function deleteHobby(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetId = parseInt(req.params.id);
        try {
            const hobbyToDelete = yield dbClient_1.default.hobby.delete({
                where: {
                    id: targetId,
                }
            });
            res.json({ hobbyToDelete });
        }
        catch (error) {
            res.status(500).json({ message: "Delete successful" });
        }
    });
}
exports.deleteHobby = deleteHobby;
