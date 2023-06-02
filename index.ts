import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import {
  getLatest,
  search,
  getOngoing,
  animeInfo,
  getVideo,
  getGenre,
} from "elevenime-api";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 2000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req: Request, res: Response, next: NextFunction) => {
//   const token = req.header("api-token") || "";

//   if (token === process.env.API_KEY) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// });

app.get("/detail/:id", async (req: Request, res: Response) => {
  const data = await animeInfo(req.params.id);

  res.json(data);
});

app.get("/video/:id", async (req: Request, res: Response) => {
  const data = await getVideo(req.params.id);

  res.json(data);
});

app.get("/ongoing", async (req: Request, res: Response) => {
  const data = await getOngoing();

  res.json(data);
});

app.get("/latest/:page", async (req: Request, res: Response) => {
  const data = await getLatest({ page: Number(req.params.page) });

  res.json(data);
});

app.get("/genre/:id/:page", async (req: Request, res: Response) => {
  const data = await getGenre({
    page: Number(req.params.page),
    id: req.params.id,
  });

  res.json(data);
});

app.get("/search/:page", async (req: Request, res: Response) => {
  const data = await search({
    query: (req.query.s as string) || "",
    page: Number(req.params.page),
  });

  res.json(data);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
