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
exports.deleteProfile = exports.updateProfile = exports.getOneProfileById = exports.getMyProfile = exports.getAllProfile = void 0;
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
function getAllProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Inside getAll", getAllProfile);
        try {
            const userProfile = yield dbClient_1.default.profile.findMany({
                include: {
                    Images: true,
                }
            });
            res.json(userProfile);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
exports.getAllProfile = getAllProfile;
function getMyProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Inside getAll", getMyProfile);
        try {
            const userProfile = yield dbClient_1.default.user.findUnique({
                where: {
                    id: 1,
                },
                include: {
                    profile: true,
                    sentRequest: true,
                    receivedRequest: true,
                }
            });
            res.json(userProfile);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
exports.getMyProfile = getMyProfile;
function getOneProfileById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        try {
            const userProfile = yield dbClient_1.default.profile.findUnique({
                where: {
                    id: userId,
                },
            });
            res.json(userProfile);
        }
        catch (error) {
            console.error("[ERROR] getAll: ", { error });
            res.status(500).json({ error });
        }
    });
}
exports.getOneProfileById = getOneProfileById;
function updateProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateOneProfile = yield dbClient_1.default.profile.update({
                where: {
                    id: parseInt(req.params.id)
                },
                data: {
                    username: req.body.username,
                    city: req.body.city,
                    area: req.body.area,
                    sexuality: req.body.sexuality,
                }
            });
            res.json({ data: updateOneProfile });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
exports.updateProfile = updateProfile;
function deleteProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetId = parseInt(req.params.id);
        try {
            const profileToDelete = yield dbClient_1.default.profile.delete({
                where: {
                    id: targetId,
                }
            });
            res.json({ profileToDelete });
        }
        catch (error) {
            res.status(500).json({ message: "Delete successful" });
        }
    });
}
exports.deleteProfile = deleteProfile;
