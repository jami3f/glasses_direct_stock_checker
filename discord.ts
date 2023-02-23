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

client.on("ready", async () => {
  const glassesName = "grayson";
  const in_stock = (await checkGlasses(glassesName)) == Status.in_stock;
  const stockMessage = in_stock
    ? "in stock <@626438519065149460> <@793222595800989807>"
    : "out of stock";
  const statusMessage = `${glassesName} is ${stockMessage}`;

  const channels = client.channels;

  const image = await MessageAttachment.load("./grayson_page.png");

  const testChannelID = "1078382288565444630";
  const importantChannelID = "1078377336266817606";
  const channelToUse = in_stock ? importantChannelID : testChannelID;

  await channels.sendMessage(channelToUse, statusMessage);
  await channels.sendMessage(channelToUse, { file: image });

  Deno.exit();
});

client.connect();
