/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-08-18 23:52:54
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-19 01:39:45
 */
const http = require("http");
const fs = require("fs");
const unzip = require("unzipper");

const server = http.createServer((req, res) => {
  // let matched = req.url.match(/filename=([^&]+)/);
  // let filename = matched && matched[1];
  // if (!filename) return;
  // let steam = fs.createWriteStream("../server/packages/package");

  let steam = unzip.Extract({ path: "../server/public/package" });
  req.pipe(steam);

  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("okay");
  });
});

server.listen(8081);
