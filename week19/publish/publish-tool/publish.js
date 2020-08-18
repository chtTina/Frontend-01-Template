/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-08-18 23:01:00
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-19 01:19:34
 */
const http = require("http");
const querystring = require("querystring");
var archiver = require("archiver");

const fs = require("fs");

let packname = "./package";

// fs.stat(filename, (error, stat) => {
// console.log(stat);

const options = {
  host: "localhost",
  port: 8081,
  path: "/?filename=" + "package.zip",
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
  },
};

var archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

archive.directory(packname, false);
archive.finalize();

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});
archive.pipe(req);

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

archive.on("end", () => {
  req.end();
});
