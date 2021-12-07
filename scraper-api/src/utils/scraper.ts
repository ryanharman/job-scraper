import axios from "axios";
import { Config, config, GenericConfig, IndeedResponseObject } from "./config";
import { SearchRequest } from "types/SearchRequest";
import * as cheerio from "cheerio";

const Cheerio = cheerio.default;

export const scraper = async (request: SearchRequest) => {
  const { query } = request;
  const role = query.role.split(" ").join("+");
  const location = query.location.split(" ").join("+");

  const jobsArray = await config.reduce(async (acc, curr) => {
    let jobResults: Config = [];

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

const parseHtml = (html: cheerio.CheerioAPI, cfg: GenericConfig) =>
  html(cfg.mainContainer)
    .map((_, item) => {
      const jobResult = Cheerio.load(item);
      return cfg.responseObject(jobResult);
    })
    .toArray();
