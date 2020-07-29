// /*
//  * @Descripttion:
//  * @version:
//  * @Author: tina.cai
//  * @Date: 2020-07-18 13:29:33
//  * @LastEditors: tina.cai
//  * @LastEditTime: 2020-07-29 00:17:37
//  */
// var parser = require("./parser.js");

// module.exports = function (source, map) {
//   // console.log(source);
//   let tree = parser.parseHTML(source);
//   console.log(tree);
//   console.log("my loader is runnning!!!\n", this.resourcePath);
//   let template = null;
//   let script = null;
//   for (let node of tree.children) {
//     if (node.tagName == "template") {
//       template = node.children.filter((e) => e.type != "text")[0];
//     }

//     if (node.tagName == "script") {
//       script = node.children[0].content;
//     }
//   }

//   let createCode = "";

//   // console.log(template);

//   let visit = (node) => {
//     if (node.type == "text") {
//       return JSON.stringify(node.content);
//     }
//     let attrs = {};
//     for (let attribute of node.attributes) {
//       attrs[attribute.name] = attribute.value;
//     }
//     let children = node.children.map((node) => visit(node));
//     return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`;
//   };

//   visit(template);

//   let r = `
//     import { create, Text, Wrapper } from "./createElement";
//     export class Carousel{
//       setAttribute(name, value) {
//         this[name] = value;
//       }
//       render(){
//         return ${visit(template)}
//       }
//       mountTo(parent) {
//         this.render().mountTo(parent);
//       }
//     }
//   `;

//   console.log(r);

//   return r;
// };

var parser = require("./parser");

module.exports = function (source, map) {
  let tree = parser.parseHTML(source);
  // console.log(tree.children[1].children[0].content);

  let template = null;
  let script = null;

  for (const node of tree.children) {
    if (node.tagName == "template")
      template = node.children.filter((e) => e.type !== "text")[0];
    if (node.tagName == "script") script = node.children[0].content;
  }
  let visit = (node, depth) => {
    if (node.type === "text") {
      return JSON.stringify(node.content);
    }
    let attrs = {};
    for (const attribute of node.attributes) {
      attrs[attribute.name] = attribute.value;
    }
    let children = node.children.map((node) => visit(node));
    return `createElement("${node.tagName}",${JSON.stringify(
      attrs
    )},${children})`;
  };
  visit(template, 0);
  let r = `
    import { createElement, Text, Wrapper } from './createElement.js'
    export class Carousel{
        setAttribute(name, value) { //attribute
           this[name] = value
         }
        render(){
            return ${visit(template)}
        }
        mountTo(parent){
            this.render().mountTo(parent)
        }
    }
    `;
  console.log(r);
  return r;
};
