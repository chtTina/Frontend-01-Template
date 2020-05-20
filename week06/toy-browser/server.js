/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-05-10 15:29:40
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-05-19 16:51:33
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
        body div #myid{
          width: 100px;
          background-color: #ff5000
        }
        body div img{
          width: 30px;
          background-color: #ff1133;
        }
      </style>
    </head>
    <body>
      <div>
        <img id="myid"/>
        <img/>
      </div>
    </body>
  </html>`);
});

server.listen(8088);
