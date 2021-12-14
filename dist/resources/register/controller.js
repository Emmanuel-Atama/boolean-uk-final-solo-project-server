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
exports.register = void 0;
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
const client_1 = require(".prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, username, gender, city, area, sexuality } = req.body;
        console.log("Request Body: ", req.body);
        const userToCreate = {
            email,
            password,
        };
        if (!userToCreate.email || !userToCreate.password) {
            res.status(400).json({ error: "Missing email or password." });
        }
        const hashedPassword = yield bcrypt_1.default.hash(userToCreate.password, 8);
        console.log({
            plainPassword: userToCreate.password,
            securePassword: hashedPassword,
        });
        try {
            //Use brcypt to hash password on DB before storing it
            const user = yield dbClient_1.default.user.create({
                data: Object.assign(Object.assign({}, userToCreate), { password: hashedPassword, profile: {
                        create: {
                            username: req.body.username,
                            gender: req.body.gender,
                            city: req.body.city,
                            area: req.body.area,
                            sexuality: req.body.sexuality,
                        },
                    } }),
            });
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRETE, { expiresIn: "1hr" });
            res.status(201).json({ token });
        }
        catch (error) {
            console.error(error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    res.status(501).json({
                        error: Object.assign(Object.assign({}, error), { message: "User already exists." }),
                    });
                }
                else {
                    res.status(500).json({ error });
                }
            }
        }
    });
}
exports.register = register;
