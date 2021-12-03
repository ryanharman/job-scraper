import axios from "axios";
import { config, IndeedResponseObject } from "./config";
import * as cheerio from "cheerio";

const Cheerio = cheerio.default;

export const scraper = async () => {
  const jobsArray = await config.reduce(async (acc, curr) => {
    let jobResults: Array<IndeedResponseObject> = [];

    for (let i = 0; i < curr.maxPages; i++) {
      const url = curr.url(i);
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
