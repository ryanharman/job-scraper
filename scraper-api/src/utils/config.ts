import * as cheerio from "cheerio";
import { formatJobTitle, formatLocation } from "./formatters";

export interface IndeedConfig {
  url: (index: number) => string;
  maxPages: number;
  incrementBy: number;
  responseObject: (jobResult: cheerio.CheerioAPI) => IndeedResponseObject;
  mainContainer: string;
}

export type IndeedResponseObject = {
  jobTitle: string;
  salary: string;
  company: string;
  location: string;
  listedDate: string;
  otherLocations: string;
  otherLocationsLink: string;
  jobSiteLink: string;
};

export const config: Array<IndeedConfig> = [
  {
    url: (index) =>
      `https://uk.indeed.com/jobs?q=software+engineer&l=Manchester&start=${10 * index}`,
    maxPages: 3,
    incrementBy: 10,
    responseObject: (jobResult) => ({
      jobTitle: formatJobTitle(jobResult(".jobTitle").text()),
      salary: jobResult(".salary-snippet").text(),
      company: jobResult(".companyName").text(),
      location: formatLocation(jobResult(".companyLocation").text()),
      listedDate: jobResult(".date").text(),
      otherLocations: jobResult(".companyLocation span a").text(),
      otherLocationsLink: `https://uk.indeed.com${jobResult(".companyLocation a").attr("href")}`,
      jobSiteLink: `https://uk.indeed.com${jobResult("a").attr("href")}`,
    }),
    mainContainer: ".result", // Container for the list of job results
  },
];
