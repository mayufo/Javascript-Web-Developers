# 变量、作用域和内存问题

## 基本类型和引用类型的值

**基本类型**指简单的数据段，可以操作保存在变量中的实际值
**引用类型**多个值构成的对象，保存在内存对象中，不能操作实际的位置而是引用访问

### 动态属性

只能给引用类型的值添加方法

### 复制变量值

基本类型的复制是完全独立的操作后互不影响

引用类型的复制实际上用的是一个指针，改变一个就会影响另一个

### 传递参数

基本类型的传递如同基本类型复制一样，而引用传递也和引用类型复制一样

```js
function addTen(num) {
    num += 10;
    return num;
}
var count = 20;
var result = addTen(count);
console.log(result); // 30
console.log(count); // 20
```

```js
function setName(obj) {
    obj.name = 'mayufo';
}

var person = new Object();
person.name = 'may';

setName(person);

console.log(person.name); //mayufo
```

```js
function setName(obj) {
    obj.name = 'mayufo';
    obj = new Object();
    obj.name = "zhang"
}

var person = new Object();
person.name = 'may';

setName(person);

console.log(person.name); //mayufo 
```
在函数中的赋值只是局部变量的赋值，不会影响到外面的变量

### 检验一个类型

`typeof` 对基本类型的检验，无法对引用类型检查
`instanceof` 对引用类型的检查，什么类型的对象

```js
result = variable instanceof constructor  // true/false
```

## 执行环境及作用域 p73



