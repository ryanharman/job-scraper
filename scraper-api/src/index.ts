import express, { Request, Response } from "express";
import { scraper } from "./utils/scraper";
import cors from "cors";

const app = express();
const port = 3001;

const main = async () => {
  app.use(cors());

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
