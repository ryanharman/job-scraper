import express, { Request, Response } from "express";
import { scraper } from "./utils/scraper";

const app = express();
const port = 3000;

const main = async () => {
  app.get("/", async (req: Request, res: Response) => {
    const response = await Promise.all(await scraper());
    res.send(response);
  });

  app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
