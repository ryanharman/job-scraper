"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJobTitle = exports.formatLocation = void 0;
const formatLocation = (location) => {
    let formattedLocation = location;
    if (location.includes("•")) {
        const items = formattedLocation.split("•");
        formattedLocation = `${items[0]} / ${items[1]}`;
    }
    if (location.includes("+")) {
        formattedLocation = location.split("+")[0];
    }
    return formattedLocation;
};
exports.formatLocation = formatLocation;
const formatJobTitle = (jobTitle) => {
    if (jobTitle.includes("new"))
        return jobTitle.split("new")[1];
    return jobTitle;
};
exports.formatJobTitle = formatJobTitle;
//# sourceMappingURL=formatters.js.map