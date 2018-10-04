const puppeteer = require("puppeteer");

const proj1 = "../img/project" + 1 + ".png";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://codepen.io/jessfonseca/pen/QVMXaE");
  await page.screenshot({ path: proj1 });

  await browser.close();
})();
