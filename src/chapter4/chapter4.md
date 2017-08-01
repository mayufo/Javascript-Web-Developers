# 变量、作用域和内存问题

## 基本类型和引用类型的值

**基本类型**指简单的数据段，可以操作保存在变量中的实际值，保存在栈内存中
**引用类型**多个值构成的对象，保存在内存对象中，操作对象的引用而不是实际的对象，保存在堆内存中

### 动态属性

只能给引用类型的值添加方法

### 复制变量值

`基本类型`的复制是完全独立的操作后互不影响

![](images/jingtong_34.png)

`引用类型`的复制实际上用的是一个指针，改变一个就会影响另一个

![](images/jingtong_35.png)


### 传递参数

所有的函数的参数都是值传递的

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
函数addTen中参数的引用`num`是基本类型的引用，否则num就应该和count一样了

```js
function setName(obj) {
    obj.name = "Nicholas";
}
var person = new Object();
setName(person);
console.log(person.name); //"Nicholas"
```

函数内部obj添加name属性后，函数外部的person也有所反应，因为对象在堆内存中只有一个，而且是全局对象


```js
function setName(obj) {
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Greg";
}
var person = new Object();
setName(person);
console.log(person.name); //"Nicholas"
```

函数内部修改了参数的值，但是原始的引用仍然保持未变，在重写obj时，变量引用就是一个局部对象，局部对象会在函数执行完毕后立即销毁

### 检测类型

`typeof` 对基本类型的检验，无法对引用类型检查
`instanceof` 对引用类型的检查，什么类型的对象

```js
result = variable instanceof constructor  // true/false
```

## 执行环境及作用域

执行环境定义了变量或者函数有权访问的其他数据，每个环境有与之关联的`变量对象`
全局执行环境是最外围的执行环境，在浏览器中，全局环境就是 `window`对象
每个函数都有自己的执行环境，当执行流进入一个函数时，函数环境被推入一个环境栈中，函数执行后栈将其环境弹出，把控制权交给之前的环境
当代码在一个环境变量执行，会创建对象对象的 **作用域链**保证执行环境有权访问所有变量和函数的有序访问


如果环境是函数，则将其活动对象作为变量对象。活动对象在最开始时值包含一个变量，即 `arguments`(全局不存在)，下一个变量对象来自包含环境，再下一个变量来自下一个包含环境，一直延续到全局。

全局执行环境的变量对象始终都是作用域中的最后一个对象。

```js
var color = "blue";
function changeColor(){
    var anotherColor = "red";
    function swapColors(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        // 这里可以访问color、anotherColor和tempColor;
        }
        // 这里可以访问color和anotherColor但不能访问tempColor
        swapColors();
}
// 只能访问color
changeColor();
```
内部环境可以通过作用域访问所有的外部环境，但外部环境不能访问内部环境中任何的变量和函数


### 延长作用域链

当执行流进入下列语句，作用域链就会得到加长

- try...catch

catch语句会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明

- with

会将指定的对象添加到作用域中

```js
function buildUrl() {
    var qs = "?debug=true";
    with(location){
        var url = href + qs;
    }
    return url;
}
```
`url`成了函数执行环境的一部分，可以作为函数的值被返回

### 没有块级作用域

`if`语句中的变量声明会将变量添加到当前的执行环境（全局环境中）

```js
if(true) {
    var color1 = 'blue';
}

console.log(color1); // blue
```
`for`语句初始化变量的表达式所定义的变量，在 `for`循环执行后，存在在循环外部的执行环境中

- 变量声明

`var`声明会被自动添加到最接近的环境中，如果初始化没有`var`，则被添加到全局环境

- 查询标识符

在某个环境中引用一个标识符，必须通过搜索，从作用域链的前端开始，向上逐级查询与给定名字匹配的标识符，如果遇到存在一个同名的局部变量，搜索会自动停止

```js
var color = "blue";
function getColor(){
    return color;
}
alert(getColor()); //"blue"

var color = "blue";
function getColor(){
    var color = "red";
    return color;
}
alert(getColor()); //"red"
```

## 垃圾回收

垃圾回收器按照固定的时间间隔，周期性操作

### 标记清除

主流的浏览器实现都是标记清除式的垃圾收集策略，只是时间间隔互有不同

进入环境将变量标记为进入环境，当离开环境，标记为离开环境

### 引用计数

跟踪记录每个值被引用的次数

当被引用就加1，当这个值的引用取得另外一个值，这个引用次数减1，当值的引用次数为0，被收回

`BOM`和`DOM`使用了COM(组件对象模型)都是引用计数策略

当一个`DOM`与原始js对象创建了循环引用，即使DOM在页面移除，也不会被回收

最好在不用的时候手工断开原生，将其设为`null`

### 性能问题

垃圾回收的事件间隔是一个非常重要的问题
IE之前设定了一些临界值，一旦一个页面超过某些变量或者对象，就会被触发
而新的IE7，当回收分配低于 15%，临界值会加倍，当超过85%，则会恢复默认
```js
window.CollectGarbage() // IE立即执行垃圾回收
```

### 管理内存

分配给web浏览器的内存数比分配给桌面应用的少，主要是防止网页耗尽系统内存导致系统崩溃
执行代码要保存必要的数据，一旦数据不在有，要通过 `null`来释放其中引用 **解除引用**

```js
function createPerson(name){
    var localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}
var globalPerson = createPerson("Nicholas");
// 手工解除引用
globalPerson = null;
```




