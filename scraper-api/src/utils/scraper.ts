import axios from "axios";
import { config, IndeedResponseObject } from "./config";
import * as cheerio from "cheerio";
import { Request } from "express";

const Cheerio = cheerio.default;

// TODO: Refine this and export from somewhere else possibly
export interface searchParams {
  role: string;
  location: string;
}

export type SearchRequest = Request<{}, {}, {}, searchParams>;

export const scraper = async (request: SearchRequest) => {
  const { query } = request;
  const role = query.role.split(" ").join("+");
  const location = query.location.split(" ").join("+");

  const jobsArray = await config.reduce(async (acc, curr) => {
    let jobResults: Array<IndeedResponseObject> = [];

    for (let i = 0; i < curr.maxPages; i++) {
      const url = curr.url(i, role, location);
      const { data } = await axios.get(url);
      const page = Cheerio.load(data);
      const parsedPage = parseHtml(page, curr);
      jobResults = [...acc, parsedPage];
    }

    return jobResults;
  }, [] as any);

  return jobsArray;
};

const parseHtml = (html: cheerio.CheerioAPI, cfg: any) =>
  html(cfg.mainContainer)
    .map((_, item) => {
      const jobResult = Cheerio.load(item);
      return cfg.responseObject(jobResult);
    })
    .toArray();
