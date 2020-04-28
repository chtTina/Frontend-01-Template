# 第三周学习总结

## 0423 学习总结

1、JS 浮点数问题刨析
参考：https://jsfiddle.net/pLh8qeor/19/
检查数字正负

```
function check(zero){
	if(1/zero === Infinity){
		return 1;
	}
	if(1/zero === -Infinity){
		return -1;
	}
}
function sign(number){
	return number / Math.abs(number);
}

```

2、Javascript 语法

- 树和优先级
- 对象
  a.b
  a[b] 动态获取属性，相当于反射
  super.b 只能在构造函数中使用
  super['b']
  new.target 只能在构造函数中使用，判断一个对象是否根据 new 关键字创建的
- Expression
  - 对象成员
  - 对象创建
  - 函数调用
    - foo()
      _ super()
      _ foo()['b'] \* foo().b
  - Left Handside & Right Handside
    - 等号左边永远是一个 Reference 类型 \* eg: foo() = 1 foo()["a"] = 1 new foo = 1
    - Update Expression
      _ Unary 单位运算符  
       _ delete a.b
      _ void _ \* typeof null function
- Reference
- Boxing & Unboxing

  - String Number Boolean Symbol undefined null
  - 7 中基本类型 中的 4 种可以包装成对象
  - Boxing 之后的基本对象可以通过 typeof 判断，转其他类型规则也不一样
  - Unboxing
    - 1+ {}
      _ 1 + {toString(){return 2}}
      _ 1 + {toString(){return "2"}}
      _ 1 + {valueOf(){return 2}, toString(){return 2}}
      _ 1 + {valueOf(){return 2}, toString(){return "2"}}
      _ 1 + {valueOf(){return {}}, toString(){return "2"}}
      _ 1 + {valueOf(){return 2}, toString(){return "3"}, [Symbol.toPrimitive](){ return 4}} \* 1 + {valueOf(){return 2}, toString(){return "3"}, [Symbol.toPrimitive](){ return "4"}}

```
// 如何判断一个对象是否根据new关键字创建的
function foo(){
	console.log(this);
}
var fakeObject = {};
Object.setPrototypeOf(fakeObject, foo.prototype);
fakeObject.constructor = foo;
foo.apply(fakeObject);
fakeObject instanceof foo;

// super的使用
class Parent{
	constructor(){
		this.a = 1;
	}
}
class Child extends Parent{
	constructor(){
	    // 调用super关键字之前一定先要执行super方法
		super();
		console.log(super.a);
	}
}

// string template

var name = "Alex";
function foo(){
	console.log(arguments);
}
foo `Hello ${name}`;

var name = "Alex";
function foo(){
	console.log("outer....");
	console.log(arguments);
	return function(){
		console.log("inner....");
		console.log(arguments);
	}
}
foo() `Hello ${name}`;

// new的优先级考虑
function cl1(s){
	console.log("cl1:"+s)
}
function cl2(s){
	console.log("cl2:"+s);
	return cl1;
}
new cl2 //直接返回cl1哦
new (cl2)
new new cl2()

// 函数调用
class foo {
	constructor(){
		this.b = 1;
	}
}
new foo()['b'];
foo["b"] = function(){}
new (foo["b"])

// Update Expression - LeftHandside - no LineTerminator
var a = 1, b =2, c =3;
a
++
b
++
c

// 立即执行函数 IIFE Immediately invoked function expression
for(var i = 0; i < 10; i ++){
	var button = document.createElement("button");
	document.body.append(button);
	button.innerHTML = i;
	button.onclick = function(){
		console.log(i);
	}
}

for(var i = 0; i < 10; i ++){
	var button = document.createElement("button");
	document.body.append(button);
	button.innerHTML = i;
	+ function(i){
		button.onclick = function(){
			console.log(i);
		}
	}(i)
}
for(var i = 0; i < 10; i ++){
	var button = document.createElement("button");
	document.body.append(button);
	button.innerHTML = i;
	void function(i){
		button.onclick = function(){
			console.log(i);
		}
	}(i)
}

// StringToNumber
function convertStringToNumber(str){
	var chars = str.split('');
	var number = 0;
	for(var i = 0; i < chars.length; i ++){
		number *= 10;
		number += chars[i].codePointAt(0) - '0'.codePointAt(0);

	}
	return number;
}
```

## 0425 学习总结

1、Completion

- Completion Record
  - [[type]]: normal, break, continue, return or throw
  - [[value]]: Types
  - [[target]]: label
- 作用域
  - Block BlockStatement
  - Iteration 作用域在 block 之外
    _ for in
    _ for of generate
- 声明
  1、有 var 一定要写在 function 范围内
  2、不要在类似 with 的 block 中写 var
  2、对象
- ObjectAPI/Grammar
  - {}.[] Object.defineProperty
  - Object.create / Object.setPrototypeOf / Object.getPrototypeOf
  - new / class / extends
  - new / function / prototype
- Function Object

## JS 标准里面有哪些对象是我们无法实现的，都有哪些特性

- Function Object

  - [[call]] 视为函数 Function

  - [[Construct]] 可以被 new 操作符调用，根据 new 的规则返回对象

- Array Object

  - Property == length
    设置对象的 length 属性，根据 length 的变化对对象进行操作

  newLength > length 用空扩充数组

  ewLength < length 截取数组

- String Object

string 的 length 是不可写不可配的。

- Arguments Object

[[callee]] 视为函数参数对对象，伪数组 caller

- Object

[[Get]] property 被访问时调用 get

[[Set]] property 被赋值时调用 set

[[GetPrototypeOf]] 对应 getPrototypeOf 方法 获取对象原型

[[SetPrototypeOf]] 对应 setPrototypeOf 方法 设置对象原型

[[GetOwnProperty]] getOwnPropertyDescriptor 获取对象私有属性的描述列表

[[HasProperty]] hasOwnProperty 私有属性判断

[[IsExtensible]] isExtensible 对象是否可扩展

[[PreventExtensions]] preventExtension 控制对象是否可以添加属性

[[DefineOwnProperty]] defineProperty 定义对象属性

[[Delete]] delete 操作符

[[OwnPropertyKeys]] Object.keys() Object.entries() Object.values()

[[Call]] 能够调用 call

- Module Namespece

[[Module]] 视为一个引入的模块
[[Exports]] 视为一个导出的模块
