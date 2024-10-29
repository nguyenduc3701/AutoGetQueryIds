const colors = require("colors");
const fs = require("fs");
const figlet = require("figlet");
const { chromium } = require("playwright");
const { applications, Local, Cookie } = require("./config");
const path = require("path");

class AutoGetQueryIds {
  constructor() {}

  renderFiglet(name, version) {
    figlet(`${name} Tools by Nguyen Duc`, function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log("\n");
      console.log("\n");
      console.log(data);
      console.log("\n");
      console.log("\n");
      console.log(
        colors.cyan(
          `Auto get query_id of mini app on telegram version ${version}`
        )
      );
      console.log(colors.cyan(`Author: Nguyen Duc`));
      console.log(
        colors.cyan(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
      );
      console.log("\n");
    });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  addHoursToDatetime = (hours) => {
    const addinghours = hours * 60 * 60 * 24;
    const expiresInDays = Math.floor(Date.now() / 1000) + addinghours;
    return expiresInDays;
  };

  log = (msg, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    switch (type) {
      case "success":
        console.log(`\n[${timestamp}] [*] ${msg}`.green);
        break;
      case "custom":
        console.log(`\n[${timestamp}] [*] ${msg}`.magenta);
        break;
      case "error":
        console.log(`\n[${timestamp}] [!] ${msg}`.red);
        break;
      case "warning":
        console.log(`\n[${timestamp}] [*] ${msg}`.yellow);
        break;
      default:
        console.log(`\n[${timestamp}] [*] ${msg}`.blue);
    }
  };

  openBrowser = async (browser, url) => {
    this.log(colors.yellow(`====== [Open Page] ======`));
    const page = await browser.newPage();
    await page.goto(url);
    await this.writeLocalStorage(page);
    await this.sleep(1000);
    await page.reload();
    return page;
  };

  writeLocalStorage = async (page) => {
    if (Local) {
      await page.evaluate((localData) => {
        Object.keys(localData).forEach((k) => {
          if (localData[k]) {
            localStorage.setItem(k, localData[k]);
          } else {
            this.log(colors.red(`Fill your local storage in config.js first!`));
          }
        });
      }, Local);
    }
    if (Cookie && Cookie.length) {
      Cookie.forEach(async (c) => {
        await page.context().addCookies([
          {
            name: c.name,
            value: c.value,
            domain: c.domain,
            path: c.path,
            expires: this.addHoursToDatetime(96),
            size: c.size,
            httpOnly: c.httpOnly,
            secure: c.secure,
            sameSite: c.sameSite,
          },
        ]);
      });
    }
  };

  openApplicationInBrowser = async (page) => {
    this.log(colors.yellow(`====== [Open iframe] ======`));

    const divSelector = "div.new-message-bot-commands.is-view";
    await page.waitForSelector(divSelector);
    await page.click(divSelector);

    await page.waitForTimeout(10000);

    const buttonSelector = "button.popup-button.btn.primary.rp";
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);

    await page.waitForTimeout(15000);
  };

  getBaseUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.host}/`;
    } catch (error) {
      console.error(`Invalid URL: ${url}`);
      return null;
    }
  };

  findIframeElement = async (page) => {
    const maxRetries = 5;
    let retryCount = 0;
    let iframe;

    while (!iframe && retryCount < maxRetries) {
      try {
        // Attempt to find the iframe element
        const iframeElement = await page.waitForSelector(
          "iframe.payment-verification",
          { timeout: 5000 }
        );
        const iframeUrl = await iframeElement.getAttribute("src");

        // Get all frames and find the one matching the iframe URL
        const frames = page.frames();
        iframe = frames.find(
          (frame) => this.getBaseUrl(frame.url()) === this.getBaseUrl(iframeUrl)
        );

        if (!iframe) {
          this.log(
            colors.yellow(
              `Iframe not found, retrying... [Attempt ${retryCount + 1}]`
            )
          );
          retryCount++;
          await page.waitForTimeout(1000); // Wait before retrying
        }
      } catch (error) {
        this.log(colors.red(`Error finding iframe: ${error.message}`));
        retryCount++;
        await page.waitForTimeout(1000); // Wait before retrying
      }
    }

    if (!iframe) {
      this.log(
        colors.red(`Iframe could not be found after ${maxRetries} attempts.`)
      );
    } else {
      this.log(colors.green(`Iframe found successfully!`));
    }

    return iframe;
  };

  handleWriteData = async (application) => {
    if (!application || !application.queryIds.length) return;

    const { name, rootPath, queryIds } = application;
    const targetFolder = path.join(rootPath, name);
    const dataPath = path.join(targetFolder, "data.txt");
    const queryPath = path.join(targetFolder, "query.txt");
    const newQueryIds = queryIds.join("\n");

    try {
      this.log(colors.green(`Checking files in folder "${name}"...`));

      if (fs.existsSync(queryPath)) {
        fs.writeFileSync(queryPath, newQueryIds, "utf8");
        this.log(colors.green(`Updated "query.txt" in "${targetFolder}".`));
      } else if (fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, newQueryIds, "utf8");
        this.log(colors.green(`Updated "data.txt" in "${targetFolder}".`));
      } else {
        fs.writeFileSync(dataPath, newQueryIds, "utf8");
        this.log(colors.green(`Created "data.txt" in "${targetFolder}".`));
      }
    } catch (error) {
      this.log(colors.red(`Error writing data to file: ${error.message}`));
    }
  };

  async main() {
    await this.renderFiglet(`AutoGetQueryIds`, 0.1);
    while (true) {
      for (let i = 0; i < applications.length; i++) {
        this.log(
          colors.cyan(
            `Working with aplication #${i + 1} | ${applications.name}`
          )
        );
        const browser = await chromium.launch({ headless: false });
        const app = applications[i];
        let page = await this.openBrowser(browser, app.url);
        await page.waitForTimeout(1000);
        if (page) {
          await this.openApplicationInBrowser(page);
          const iframe = await this.findIframeElement(page);
          if (iframe) {
            const result = await iframe.evaluate(() => {
              if (Telegram.WebApp.initData) {
                return Telegram.WebApp.initData;
              }
              return null;
            });
            if (!result || !app) {
              this.log(colors.yellow(`====== [Iframe not found] ======`));
              await page.close();
            }
            app.queryIds.push(result);
          } else {
            this.log(colors.yellow(`====== [Iframe not found] ======`));
            await page.close();
          }
          this.log(colors.yellow(`====== [Get query_id successfully!] ======`));
        }
        await this.sleep(3000);
        await this.handleWriteData(app);
        await browser.close();
        await this.sleep(3000);
      }
      this.log(colors.cyan(`Get query_id done! Wait 24h to rerun...`));
      await this.sleep(24 * 60 * 60 * 1000);
    }
  }
}

const client = new AutoGetQueryIds();
client.main().catch((err) => {
  client.log(err.message, "error");
});
