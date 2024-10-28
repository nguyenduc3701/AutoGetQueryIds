const colors = require("colors");
const fs = require("fs");
const readline = require("readline");
const { DateTime } = require("luxon");
const figlet = require("figlet");
const { chromium } = require("playwright");
const { test, expect } = require("@playwright/test");
const { applications } = require("./config");

class AutoGetQueryIds {
  constructor() {}
  main() {}
}

const client = new AutoGetQueryIds();
client.main().catch((err) => {
  client.log(err.message, "error");
});
