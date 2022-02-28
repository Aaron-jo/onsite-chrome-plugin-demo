> 该插件是针对[该页面](https://www.fashionnova.com/collections/new?view=one-image&product_type=Shoes)进行开发的, 测试时请访问该页面

## 实时的获取页面信息逻辑

根据popup、content的生命周期:
- popup: 在弹出框弹出时执行相应的脚本, 弹出框关闭时生命周期结束
- content: 在插件加载完毕, 一直存在于页面

## 获取数据实时更新
通过消息传递, content向popup发送消息, 消息传递分为: 简单的一次性请求(`chrome.runtime.sendMessage`) 和 长时间的连接(`chrome.runtime.connect`);
但是: content_scripts向popup主动发消息的前提是popup必须打开, 否则需要利用background作中转; 因为我这里之前没有用到background, 所以消息传递没有应用

通过`MutationObserver`监听页面中的某个节点的`attributes`, 然后发送消息, 在`background`中组装数据, 转发给`popup`是比较友好的解决方案

目前是通过storage去存储、中转数据, 在`MutationObserver`频繁触发时, 会出现性能问题


## `popup`页面的样式修改思路
可以通过content_script插入自己的dom到页面中, 将popup的页面隐藏, 从而替换原生的popup页面, 这样页面的样式就可以做到定制.
具体插入的时机, 可以通过popup发送消息, 模拟页面的显示与popup点击出现的时机
