# 面向对象的程序设计


## Function 类型

- 函数声明
```js
function sum (num1, num2) {
    return num1 + num2;
}
```

- 在使用函数表达式定义函数时，没有必要使用函数名

```js
var sum = function(sum1, sum2) {
  return num1 + num2;
}
```
- Function构造函数 (不推荐)

```js
var sum = new function('num1', 'num2', 'return num1 + num2')
```

函数名仅仅只指向函数的指针
使用不带圆括号的函数名是访问函数指针，而非调用函数

### 没有重载

同名函数的第二个函数，会覆盖引用第一个函数的变量


### 函数声明与函数表达式

解析器在执行加载数据时，函数声明会先被读取声明，并使其在执行任何代码之前可用，表达式等到解析器执行到他所在的代码行，才会被解析

```js
console.log(sum(10, 10));  // 被提前读取声明
function sum(num1, num2) {
    return num1 + num2;
}
```

```js
// console.log(sum1(10, 10));  这里会产生错误，初始化语句不会提前读取函数的引用

var sum1 = function (num1, num2) {
    return num1 + num2;
}
```


### 作为值的函数

像传递参数一样把函数传递给另一个函数，将一个函数作为另一个函数的结果返回

```js
function callSomeFunction(someFunction, someArgument) {
    return someFunction (someArgument);
}
function add10(num) {
    return num + 10;
}

var result = callSomeFunction (add10, 10);
console.log(result); //10
```

从一个函数中返回一个函数

```js

function createComparisonFunction (propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        if (value1 < value2) {
            return -1
        } else if (value1 > value2) {
            return 1
        } else {
            return 0
        }
    }
}

var data = [{name: 'may', age: '18'}, {name: 'zhang', age: '28'}];
data.sort(createComparisonFunction('name'));
data.sort(createComparisonFunction('age'));
console.log(data[0].name); //may
console.log(data[0].age); // 18
```

### 函数内部属性

- argument 保存函数参数，此对象有个 `callee的属性`，指向拥有这个 `arguments`对象的函数

计算阶乘

```js
function factorial(num) {
    if(num <= 1) {
        return 1
    } else {
        return num * factorial(num - 1)
    }
}
```

但是如果函数的执行和函数名就仅仅耦合在一起, 可以使用 `arguments.callee`

```js
function factorial(num) {
    if(num <= 1) {
        return 1
    } else {
        return num * arguments.callee(num - 1)
    }
}
```

- `this` 引用函数执行的环境对象

函数名仅仅是一个包含指针的变量

- `caller`  保存着调用当前函数的函数的引用，如果在全局作用域中调用当前函数，值为`null`

```js
function outer() {
    inner();
}

function inner() {
    console.log(inner.caller, 111); // 也可可以写成console.log(argument.callee.caller, 111);
}

outer();
//  function outer() {
//       inner();
//    } 111
```

严格模式中访问 `argument.callee`会错误

`argument.caller` 严格模式错误，非严格模式`undefined`
严格模式不能为函数的caller赋值

### 函数属性和方法

每个函数都包含两个属性

- length  表示函数希望接收的参数个数

```js
function sayName(name) {
    conole.log(name);
}

console.log(sayName.length); //1
```

- prototype 保存所有实例方法的真正所在 不可枚举，使用 `for in`无法发现

每个函数还包含两个非继承方法 
在特定的作用域中调用函数，设置函数体内`this`对象的值
- apply() 接收两个参数，一个是其中运行函数的作用域，第二个数参数数组，可以是 `Array`的实例，也可以是 `arguments`对象

这里传入的`this`,实际就是 `window`对象
```js
function callSum1(num1, num2) {
    return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);
}

console.log(callSum1(10, 10)); //20
console.log(callSum2(10, 10)); //20

```


- call()

```js
function callSum3(num1, num2) {
    return sum.call(this, num1, num2);
}
console.log(callSum3(10, 10)); //20
```

实际应用 - 扩充作用域，对象不需要与方法有任何耦合关系

```js
window.color = 'red';

var o = {color: 'blue'};

function sayColor() {
    console.log(this.color)
}

console.log(sayColor()); // red

console.log(sayColor(this)); //red

console.log(sayColor(window)); //red

console.log(sayColor(o)); //blue
```

- `bind()` 创建一个函数实例，`this`值会被绑定给传给 `bind()`函数的值

```js
window.color = 'red';
var o = {color : 'blue'};
function sayColor() {
    console.log(this.color);
}

var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue
```

- `toLocaleString()`和`toString()`方法始终返回函数的代码，格式根据浏览器。`valueOf()`也只返回函数代码

## 基本包装类型

