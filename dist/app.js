"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./App/Middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./App/Middlewares/notFound"));
const routes_1 = __importDefault(require("./App/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send({
        Message: "Hello",
    });
});
app.use("/api", routes_1.default);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
