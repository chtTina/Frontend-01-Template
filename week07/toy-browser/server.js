/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-05-10 15:29:40
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-05-27 23:45:16
 */
const http = require("http");
const server = http.createServer((req, res) => {
  console.log("request received");
  console.log(req.headers);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("X-Foo", "bar");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`<html maaa=a >
    <head>
      <style>
        body div{
          display: flex;
          width: 500px;
          height: 100px;
          background-color: rgb(255, 0, 0);
        }
        body div #myid{
          display: flex;
          width: 100px;
          height: 30px;
          background-color: rgb(0, 255, 0);
        }
        body div .myclass{
          display: flex;
          width: 30px;
          height: 50px;
          background-color: rgb(0, 0, 255);
        }
      </style>
    </head>
    <body>
      <div>
        <div id="myid"></div>
        <div class="myclass"></div>
      </div>
    </body>
  </html>`);
});

server.listen(8088);
