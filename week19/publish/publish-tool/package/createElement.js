/*
 * @Descripttion: 
 * @version: 
 * @Author: tina.cai
 * @Date: 2020-07-16 02:28:17
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-07-16 02:42:41
 */ 
export function create(Cls, attributes, ...children){
  let o;
  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({
      timer: 0
    });
  }

  // console.log(arguments);
  for(let name in attributes){
    o.setAttribute(name, attributes[name]);
  }

  let visit = (children) => {
    for(let child of children){
      if (typeof child === 'object' && child instanceof Array) {
        visit(child);
        continue;
      }
      if (typeof child === 'string') {
        child = new Text(child);
      }
      o.appendChild(child);
    }
  }
  visit(children);
  
  return o;
}

export class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }

}

export class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  //attribute
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  get style() {
    return this.root.style
  }

  appendChild(child) {
    this.children.push(child);
  }

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for(let child of this.children){
      child.mountTo(this.root);
    }
  }
}
