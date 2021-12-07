import * as cheerio from "cheerio";
import { formatJobTitle, formatLocation, formatSalary } from "./formatters";

export type GenericConfig<ResObject = any> = {
  url: (index: number, role: string, location: string) => string;
  maxPages: number;
  incrementBy: number;
  mainContainer: string;
  responseObject: (jobResult: cheerio.CheerioAPI) => ResObject;
};

export type Config = GenericConfig<IndeedResponseObject>[];

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

export const config: Config = [
  {
    url: (index, role, location) =>
      `https://uk.indeed.com/jobs?q=${role}&l=${location}&start=${10 * index}`,
    maxPages: 3,
    incrementBy: 10,
    mainContainer: ".result", // Container for the list of job results
    responseObject: (jobResult) => ({
      jobTitle: formatJobTitle(jobResult(".jobTitle").text()),
      salary: formatSalary(jobResult(".salary-snippet").text()),
      company: jobResult(".companyName").text(),
      location: formatLocation(jobResult(".companyLocation").text()),
      listedDate: jobResult(".date").text(),
      otherLocations: jobResult(".companyLocation span a").text(),
      otherLocationsLink: `https://uk.indeed.com${jobResult(".companyLocation a").attr("href")}`,
      jobSiteLink: `https://uk.indeed.com${jobResult("a").attr("href")}`,
    }),
  },
];
