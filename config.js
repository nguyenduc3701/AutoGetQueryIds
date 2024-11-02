const applications = [
  {
    name: "BahneAiBot",
    rootPath: `D:\\Works\\Tools`,
    url: `https://web.telegram.org/k/#@BahneAIBot`,
    queryIds: [],
    getFromSession: null,
  },
  {
    name: "PawsBot",
    rootPath: `D:\\Works\\Tools`,
    url: `https://web.telegram.org/k/#@PAWSOG_bot`,
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
  dc: "5",
  dc5_auth_key:
    '"0145b4d00f952a856c14042b5c4c9e3e378ef744da16f5710f49e63d699d50ffc611b10815cf09b16e89a3d665bf099e807d32d129a4b3ae325b8bffeb3f7f983a5e0a8b95844f903a3fd92160d1b5a2f65b372df691acc8fef116f443d85d92e3cf9bdd82bfe45e9589a5034fcc9cc6b9b8120ff81db77a1270bdabf292131ab3e96baba2c93df7ae7aadc20f5a1685cde08764ec10377781b9c76a84411edd4e769354dd8345db69e5009b281a75f733769bcfb8652e91243881fdb4db07bef772adbbf87ab6f437c7fe94b4318e79cc47c2b65d28122caf32792fa98c40ccb48e62175848d5789d739225f80917f4ea38bbef77f6ca61131e8f3b78543409"',
  dc5_hash: '"1c06f7272f16faba2db84f7c90c9f3f7bead88ff"',
  dc5_server_salt: '"dd2ea32dfbb04b01"',
  user_auth: `{"dcID":5,"date":1730224554,"id":1626918036}`,
};

const Cookie = [
  {
    name: "stel_web_auth",
    value: "https%3A%2F%2Fweb.telegram.org%2Fa%2F",
    domain: "t.me",
    path: "/",
    size: 50,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  },
  {
    name: "stel_web_auth",
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
