# 拖拽

拖拽元素分为两部分：拖拽源 `origin`和拖拽目标 `target`。

拖拽相关事件涉及到：

- 拖拽源：`dragstart`、`drag`、`dragend`
- 拖拽目标：`dragenter`、`dragover`、`dragleave`、`drop`

## 实现拖拽

1. `img` 图片元素默认是能够拖拽的，其他元素需要设置 `DOM` 标签上的 `draggable` 属性为 `true`。

2. 另外为了保证 `drop` 事件的触发，需要在 `dragover` 事件中调用 `event.preventDefault()` 方法，已阻止默认事件。

## 数据通信

事件对象 `event` 中的 `dataTransfer` 属性用于在拖拽源和拖拽目标之间传递数据。

`dataTransfer` 属性中的 `setData` 方法用于设置数据，`getData` 方法用于获取数据。

另外，要注意的是，`setData` 方法只能设置字符串类型的数据，如果需要传递对象，需要使用 `JSON.stringify` 方法将对象转换为字符串。

譬如：

```js
// 拖拽源
event.dataTransfer.setData('text/plain', JSON.stringify({ name: '张三' }))

// 拖拽目标
const data = JSON.parse(event.dataTransfer.getData('text/plain'))
```

