<!--
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-04-13 22:56:46
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-19 01:11:13
-->

# 每周总结可以写在这里

MIT 协议

## 发布系统流程

1. pushlish-server 里面添加一些文件；
2. 通过 http 请求指定文件的内容；
3. 在 pushlish-tool 访问 publish-server;
4. 再通过 pushlish-server 根据 pushlish-tool 的东西给 server 里面添加文件；
