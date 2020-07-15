/*
 * @Descripttion: 
 * @version: 
 * @Author: tina.cai
 * @Date: 2020-07-14 00:13:46
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-07-15 00:57:54
 */ 
import('./foo.js')

function create(Cls, attributes, ...children){
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

  for(let child of children){
    if (typeof child === 'string') {
      child = new Text(child);
    }
    o.appendChild(child);
  }
  // console.log(children);
  
  return o;
}

class MyComponent {

  constructor() {
    this.children = [];
  }

  //attribute
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    this.slot = <div></div>
    for(let child of this.children){
      this.slot.appendChild(child)
      // child.mountTo(this.slot);
    }
    this.render().mountTo(parent)
    
  }

  render() {
    return <article>
      <header>i'm header</header>
      {this.slot}
      <footer>i'm footer</footer>
    </article>
  }
}

class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }

}

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  //attribute
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for(let child of this.children){
      child.mountTo(this.root);
    }
  }
}

// let componet = <div id="a" class="b" style="width: 100px; height: 100px; background: #333">
//   <div></div>
//   <div></div>
//   <p></p>
//   <div></div>
// </div>
let componet = <MyComponent><p>test67</p></MyComponent>


componet.mountTo(document.body);

// let componet = create(
//   Parent, {
//     id: "a",
//     "class": "b"
//   }, create(Child, null),
//      create(Child, null), 
//      create(Child, null),
//      create(Child, null)
// );
console.log(componet);
// component.setAttribute("id", "a");
