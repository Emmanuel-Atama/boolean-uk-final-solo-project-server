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
exports.protect = exports.login = void 0;
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Inside login function:", req.body);
        const userCredentials = Object.assign({}, req.body);
        if (!userCredentials.email || !userCredentials.password) {
            res.status(400).json({ error: "Missing email or password." });
        }
        try {
            const user = yield dbClient_1.default.user.findUnique({
                where: {
                    email: userCredentials.email,
                },
            });
            if (user) {
                const match = yield bcrypt_1.default.compare(userCredentials.password, user.password);
                console.log({
                    passwordFromRequest: userCredentials.password,
                    passwordFromDatabase: user.password,
                });
                if (match) {
                    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
                    res.status(201).json({ token });
                }
                else {
                    res.status(401).json({ error: "Authentication failed." });
                }
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    });
}
exports.login = login;
;
function protect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("INSIDE MIDDLEWARE: ", { headers: req.headers });
        const token = req.headers.authorization;
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, payload) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({ error: "Not Authorized" });
            }
            if (payload === undefined) {
                res.status(401).json({ error: "Not Authorized" });
                return;
            }
            console.log({ payload });
            // Find the authenticated user in our DB
            const user = yield dbClient_1.default.user.findUnique({
                where: {
                    id: payload.id,
                },
            });
            console.log({ userInMiddleware: user });
            // Attach to request object in order to use in controllers
            req.user = user;
            next();
        }));
    });
}
exports.protect = protect;
