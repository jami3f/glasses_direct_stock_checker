import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

export enum Status {
  in_stock,
  out_of_stock,
}

export async function checkGlasses(glassesName: string) {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
  });
  const page = await browser.newPage();

  await page.goto(
    `https://www.glassesdirect.co.uk/glasses/${glassesName}/?prca=PRCA50039128&aspect=front`
  );

  await page.waitForSelector("div#product-actions");
  const outOfStockDiv = await page.$("div#product-out-of-stock");
  const outOfStockClass = await outOfStockDiv?.getProperty("className");
  const inStock = (await outOfStockClass?.jsonValue()).includes("hidden");
  let status;
  if (inStock) {
    status = Status.in_stock;
  } else {
    status = Status.out_of_stock;
  }

  await page.screenshot({ path: "grayson_page.png" });

  await browser.close();
  return status;
}
