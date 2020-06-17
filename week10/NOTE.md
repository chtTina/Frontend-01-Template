<!--
 * @Descripttion: 
 * @version: 
 * @Author: tina.cai
 * @Date: 2020-04-13 22:56:46
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-06-18 02:57:07
--> 
# 每周总结可以写在这里

## Range API

### 必要的Range API

* var range = new Range()
* range.setStart(element, 9)
* range.setEnd(element, 3)
* var range = document.getSelection().getRangeAt(0);

### 辅助Range API

* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents

### 摘出对应的片段

* var fragment = range.extractContents()  //得到一个片段
* range.insertNode(document.createTextNode('aaa')) //插入一个节点；

## CSSOM

### CSS Rules

* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p { color: pink; }", 0);
* document.styleSheets[0].removeRule(0);

### Rule

* CSSStyleRule
  + selectorText
  + style key-v结构

* getComputedStyle(element, pseudoElt) - pseudoElt伪元素，可选；
 



 
