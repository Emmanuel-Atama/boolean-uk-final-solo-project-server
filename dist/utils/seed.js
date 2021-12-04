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
Object.defineProperty(exports, "__esModule", { value: true });
const dbClient = require("./dbClient");
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient;
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dbClient.user.deleteMany();
        console.log(`Start Seeding`);
        const user = yield dbClient.user.create({
            data: {
                email: 'Emmanuel',
                password: 'qwerty'
            }
        });
        console.log("Created User and Seeding finished:", user);
    });
}
seed()
    .catch((error) => {
    console.error(error.message);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbClient.$disconnect();
    process.exit(1);
}));
