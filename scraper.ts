import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(
  "https://www.glassesdirect.co.uk/glasses/grayson/?prca=PRCA50039128&aspect=front"
);

await page.waitForSelector("div#product-actions");
const outOfStockDiv = await page.$("div#product-out-of-stock");
const outOfStockClass = await outOfStockDiv?.getProperty("className");
const inStock = (await outOfStockClass?.jsonValue()).includes("hidden");
if (inStock) {
  console.log("In stock");
} else {
  console.log("Out of stock");
}

await browser.close();
