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
exports.sendRequest = exports.getAll = void 0;
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Inside getAll", getAll);
        try {
            const usersReq = yield dbClient_1.default.usersOnUsers.findMany({});
            res.json(usersReq);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
exports.getAll = getAll;
function sendRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Inside sendRequest", sendRequest);
        try {
            const usersReq = yield dbClient_1.default.usersOnUsers.create({
                data: {
                    senderId: 5,
                    receiverId: req.body.receiverId,
                }
            });
            res.json(usersReq);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
exports.sendRequest = sendRequest;
