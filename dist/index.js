"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scraper_1 = require("./utils/scraper");
const app = (0, express_1.default)();
const port = 3000;
const main = async () => {
    app.get("/", async (req, res) => {
        const response = await Promise.all(await (0, scraper_1.scraper)());
        res.send(response);
    });
    app.listen(port, () => {
        console.log(`🚀 Server started on http://localhost:${port}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map