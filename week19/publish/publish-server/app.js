/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-08-18 21:50:32
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-18 23:50:03
 */
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/users', usersRouter)

module.exports = app;
