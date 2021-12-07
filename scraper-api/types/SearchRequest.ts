import { Request } from "express";

interface searchParams {
  role: string;
  location: string;
}

export type SearchRequest = Request<{}, {}, {}, searchParams>;
