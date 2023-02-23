import "https://deno.land/std@0.177.0/dotenv/load.ts";

import {
  Intents,
  Client,
  MessageAttachment,
} from "https://deno.land/x/harmony@v2.8.0/mod.ts";

import { Status, checkGlasses } from "./scraper.ts";

const client = new Client({
  intents: Intents.None,
});

client.on("ready", () => {
  console.log("ready");
  Deno.exit();
});

client.connect();
