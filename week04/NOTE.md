<!--
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-04-13 22:56:46
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-05-04 18:42:56
 -->

# 每周总结可以写在这里

#### 事件循环: 不属于 js 引擎的东西，属于 node 和浏览器范凑

### 能放到 code 里执行的方式有几种： 3 种

1. 代码片段

```
  <script>
    var a = 1;
    a++;
  </script>
```

2. 代码模块

```
  <script type="module">
    var a = 1;
    a++;
  </script>
```

3. setTimeout

```
  <script type="module">
    setTimeout(function(){}, 500);
  </script>
```

### js 代码都是微任务，setTimeout 和 setInterval 是 js 数组浏览器提供的 API 所以是宏任务，promise 是 js 自带的 API 所以是微任务

### job quque

https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
