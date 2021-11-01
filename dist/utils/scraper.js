"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraper = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const cheerio = __importStar(require("cheerio"));
const Cheerio = cheerio.default;
const scraper = async () => {
    const jobsArray = await config_1.config.reduce(async (acc, curr) => {
        let jobResults = [];
        for (let i = 0; i < curr.maxPages; i++) {
            const url = curr.url(i);
            const { data } = await axios_1.default.get(url);
            const page = Cheerio.load(data);
            const parsedPage = parseHtml(page, curr);
            jobResults = [...acc, parsedPage];
        }
        return jobResults;
    }, []);
    return jobsArray;
};
exports.scraper = scraper;
const parseHtml = (html, cfg) => html(cfg.mainContainer)
    .map((_, item) => {
    const jobResult = Cheerio.load(item);
    return cfg.responseObject(jobResult);
})
    .toArray();
//# sourceMappingURL=scraper.js.map