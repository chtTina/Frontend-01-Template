/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-08-16 20:59:37
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-16 23:52:51
 */
// const assert = require("assert");
// const mod = require("../dist/add.js");

import { add } from "../src/add.js";
// import assert from "assert";

// it("add(3 + 4) should be 7", function () {
//   assert.equal(add(3, 4), 7);
// });

import test from "ava";
test("foo", (t) => {
  if (add(3, 4) === 7) {
    t.pass();
  }
});
