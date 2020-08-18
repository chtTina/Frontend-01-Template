/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-08-18 22:52:20
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-18 23:39:52
 */
var express = require("express");
var router = express.Router();
const fs = require("fs");
const { request } = require("http");

/* GET home page. */
router.post("/", function (request, res, next) {
  fs.writeFileSync(
    "../server/public/" + request.query.filename,
    request.body.msg
  );
  res.send("");
  res.end();
});

module.exports = router;
