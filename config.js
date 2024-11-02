const applications = [
  {
    name: "BahneAiBot",
    rootPath: `D:\\Works\\Tools`,
    url: `https://web.telegram.org/k/#@BahneAIBot`,
    queryIds: [],
    getFromSession: null,
  },
  {
    name: "PinGoBot",
    rootPath: `D:\\Works\\Tools`,
    url: `https://web.telegram.org/k/#@PinGo_MiniBot`,
    queryIds: [],
    getFromSession: "telegram-apps/launch-params",
  },
];

const Local = {
  dc: "xxxxxxxxxxx",
  dc5_auth_key: "xxxxxxxxxxx",
  dc5_hash: '"xxxxxxxxxxx"',
  dc5_server_salt: '"xxxxxxxxxxx"',
  user_auth: `xxxxxxxxxxx`,
};
const Cookie = [
  {
    name: "xxxxxxxxxxx",
    value: "https%3A%2F%2Fweb.telegram.org%2Fa%2F",
    domain: "t.me",
    path: "/",
    size: 50,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  },
  {
    name: "xxxxxxxxxxx",
    value: "https%3A%2F%2Fweb.telegram.org%2Fa%2F",
    domain: "telegram.me",
    path: "/",
    size: 50,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  },
];
module.exports = { applications, Local, Cookie };
