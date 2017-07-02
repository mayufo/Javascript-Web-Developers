# 引用类型

是一种数据结构

## object类型

- new操作符后跟Object构造函数
```js
var person = new Object(); // var person = {} 等价
```
- 对象字面量表示法(推荐)

```js
var person = {
    name: 'mayufo'
}
```

访问对象
- 点表示法
- 方括号表示法来访问对象属性

除非必须使用变量访问属性，否则建议使用点表示法