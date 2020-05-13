/*
 * @Descripttion: 
 * @version: 
 * @Author: tina.cai
 * @Date: 2020-05-10 15:29:40
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-05-10 17:37:49
 */
const http = require('http')
const server = http.createServer((req, res) => {
  console.log('request received')
  console.log(req.headers)
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('ok')
})

server.listen(8088)
