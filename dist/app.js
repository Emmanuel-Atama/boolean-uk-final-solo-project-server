"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
// load the environment variables from the .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
/* SETUP ROUTES */
app.get("*", (req, res) => {
    res.json({ Test: true });
});
((port = process.env.APP_PORT || 4000) => {
    app.listen(port, () => console.log(`\n🚀 Server is running on http://localhost:${port}/\n`));
});
