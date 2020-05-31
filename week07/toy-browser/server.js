/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-05-10 15:29:40
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-05-31 23:01:16
 */
const http = require('http')
const server = http.createServer((req, res) => {
  console.log('request received')
  console.log(req.headers)
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(`<html maaa=a>
  <head>
      <style>
          #main{
              display: flex;
              flex-direction: row;
              width: 500px;
              height: 300px;
              background-color: rgb(255,255,255);
          }
          #one {
              width: 200px;
              height: 40px;
              background-color: rgb(100,0,0);
          }
          #two{
              width: 200px;
              height: 100px;
              background-color: rgb(0,100,0);
          }
      </style>
  </head>
  <body>
      <div id="main">
          <div id="one"></div>
          <div id="two"></div>
      </div>
  </body>
  </html>`)
})

server.listen(8088)
