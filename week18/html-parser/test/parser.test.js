/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-08-16 23:41:27
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-17 02:01:18
 */
import { parseHTML } from "../src/parser.js";
import test from "ava";

test("parse a single element", (t) => {
  let doc = parseHTML("<div></div>");
  let div = doc.children[0];
  if (div.tagName == "div") {
    t.pass();
  }

  if (div.children.length === 0) {
    t.pass();
  }

  if (div.type === "element") {
    t.pass();
  }

  if (div.attributes.length === 2) {
    t.pass();
  }
});

test("parse a single element with text content", (t) => {
  let doc = parseHTML("<div>hello</div>");
  let text = doc.children[0].children[0];
  if (text.content === "hello") {
    t.pass();
  }
  if (text.type === "text") {
    t.pass();
  }
});

test("tag mismatch", (t) => {
  try {
    const doc = parseHTML("<div></p>");
  } catch (e) {
    if (e.message === "Tag start end doesn't match!") {
      t.pass();
    }
  }
});

test("test with <", (t) => {
  const doc = parseHTML("<div>a < b</div>");
  let text = doc.children[0].children[0];
  if (text.content === "a < b") {
    t.pass();
  }
  if (text.type === "text") {
    t.pass();
  }
});

test("with property", (t) => {
  const doc = parseHTML("<div id=a class='cls' data=\"abc\" ></div>");
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === "id") {
      if (attr.value === "a") {
        count++;
        t.pass();
      }
    }

    if (attr.name === "class") {
      if (attr.value === "cls") {
        count++;
        t.pass();
      }
    }

    if (attr.name === "data") {
      if (attr.value === "abc") {
        count++;
        t.pass();
      }
    }
  }
});

test("with double quoted property", (t) => {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === "id") {
      if (attr.value === "a") {
        count++;
        t.pass();
      }
    }

    if (attr.name === "class") {
      if (attr.value === "cls") {
        count++;
        t.pass();
      }
    }

    if (attr.name === "data") {
      if (attr.value === "abc") {
        count++;
        t.pass();
      }
    }
  }
});

test("with self close", (t) => {
  let doc = parseHTML(`<div id=a class='cls'  data=\"abc\"
  />`);
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === "id") {
      if (attr.value === "a") {
        count++;
        t.pass();
      }
    }

    if (attr.name === "class") {
      if (attr.value === "cls") {
        count++;
        t.pass();
      }
    }

    if (attr.name === "data") {
      if (attr.value === "abc") {
        count++;
        t.pass();
      }
    }
  }
});

test("script", (t) => {
  let content = `
  <div>abcd</div>
  <span>x/span>
  /script>
  <script
  <
  </
  </sc
  </scr
  </scri
  </scrip 
  </scrip
  </script`;
  let doc = parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];
  if (text.content === content) {
    t.pass();
  }
  if (text.type === "text") {
    t.pass();
  }
});

test("attribute with no value", (t) => {
  let doc = parseHTML("<div class/>");
  t.pass();
});

test("attribute with no value 2", (t) => {
  let doc = parseHTML("<div class id/>");
  t.pass();
});

test("self", (t) => {
  let doc = parseHTML("<div/>");
  t.pass();
});

test("tolowcase", (t) => {
  let doc = parseHTML("<DIV></DIV>");
  t.pass();
});

test("currentAttribute", (t) => {
  let doc = parseHTML("<div width=width></div>");
  t.pass();
});
