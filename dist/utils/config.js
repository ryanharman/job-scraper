"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const formatters_1 = require("./formatters");
exports.config = [
    {
        url: (index) => `https://uk.indeed.com/jobs?q=software+engineer&l=Manchester&start=${10 * index}`,
        maxPages: 3,
        incrementBy: 10,
        responseObject: (jobResult) => ({
            jobTitle: (0, formatters_1.formatJobTitle)(jobResult(".jobTitle").text()),
            salary: jobResult(".salary-snippet").text(),
            company: jobResult(".companyName").text(),
            location: (0, formatters_1.formatLocation)(jobResult(".companyLocation").text()),
            listedDate: jobResult(".date").text(),
            otherLocations: jobResult(".companyLocation span a").text(),
            otherLocationsLink: `https://uk.indeed.com${jobResult(".companyLocation a").attr("href")}`,
            jobSiteLink: `https://uk.indeed.com${jobResult("a").attr("href")}`,
        }),
        mainContainer: ".result",
    },
];
//# sourceMappingURL=config.js.map