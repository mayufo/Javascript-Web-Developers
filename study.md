# 使用props传递数据


# 特殊is属性扩展原生htnl元素

组件中的数据必须在data,所返回的对象里面

当遇到受限的 `table`的标签的时候可以使用 `is`
```
<table>
    <tr is="custom-select"></tr>
</table>
```

# 利用自定义事件通信

在jq中自定义事件的定义和使用，也就是订阅发布模式
```js
$(document).on('changeValue', function() {
  alert(123);
})

$(document).trigger('changeValue')
```

