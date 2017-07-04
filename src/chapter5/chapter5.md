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

## Array类型

- 构造创建，在构建的时候可以省略 `new`
```js
var colors = new Array(3);
var colors1 = Array(3);

var names = new Array('Greg');
var names1 = Array('Greg');
```

- 数组字面量表示法

```js
var color = ['red', 'blue', 'green'];
```

利用 `length`属性可以方便给数组末尾添加新项
```js
color[color.length] = 'may';
color[99] = 'ufo'
console.log(color.length); // 100
```
新数组长度是100，而4-99不存在，访问是 `undefined`

### 检测数组

`instanceof`问题在于假定只有一个全局执行环境，在两个以上不同的全局执行环境，会存在不同笨笨的`Array`构造函数
可以使用 `Array.isArray()`来判断是否是数组

```js
if(Array.isArray(colors)) {
    console.log(true);
}
```

### 转换方法

所有对象都有 `toLocaleString()`、`toString()`、`valueOf()`

```js
var colors = ['red', 'blue', 'green'];
console.log(colors.toString()); // red, blue,green
console.log(colors.valueOf()); // red, blue,green
```

```js

var person1 = {
    toLocaleString : function () {
        return "Nikolaos";
    },
    toString : function() {
        return "Nicholas";
    }
};
var person2 = {
    toLocaleString : function () {
        return "Grigorios";
    },
    toString : function() {
        return "Greg";
    }
};
var people = [person1, person2];
console.log(people); //Nicholas,Greg
console.log(people.toString(), 'toString'); //Nicholas,Greg
console.log(people.valueOf(), 'valueOf');
console.log(people.toLocaleString()); //Nikolaos,Grigorios
```

调用数组的每一项用的 `toString`

`join()`可以使用不同的分隔符重构字符串

```js
console.log(colors.join('|')) // red|green|blue
```

### 栈方法

后进先出

`push()`逐个添加到数组末尾
`pop()`移除数组末尾最后一项

### 队列方法

`shift()`删除数组第一项
`unshift()`在数组第一项的位置插入

### 重排序方法
`revers()` 反转原来数组的顺序

```js
var values= [1,2,3,4,5];
values.reverse();
console.log(values); // 5,4,3,2,1
```
`sort()`升序方法，但是因为对每一项调用 `toString()`以后排序，数字的排序就不是很好，`sort()`方法接受一个比较函数作为参数，制定那个值位于那个值的前面

`比较函数`接受两个参数，如果第一个参数位于第二个参数之前应该返回负数，如果相等返回0，如果第一个参数在第二个参数后面返回1

```js
function compare(value1, value2) {
    if(value1 < value2) {
        return -1
    } else if(value1 > value2) {
        return 1
    } else {
        return 0;
    }
}

var values = [0,1,5,10,15];
values.sort(compare);
console.log(values);  // [0,1,5,10,15]
```

升序排列的比较函数简易写法

```js
function compare(value1, value2) {
    return value1 - value2;
}
```

### 操作方法

`concat()` 基于当前所有项创建一个新数组，不会影响原始数组

```js
var colors3 = ['red', 'green']; 
var colors4 = colors3.concat('yellow', ['brown']); 
console.log(colors3, colors4);// ['red', 'green']  ['red', 'green', 'yellow', 'brown']
```

`slice()`基于当前数组中的一个或者多个项创建一个新数组,不会影响原始数组

```js
var colors5 = ['red', 'green', 'yellow', 'brown', 'pink', 'blue'];

console.log(colors5.slice(1), 11); // ['green', 'yellow', 'brown', 'pink', 'blue']
console.log(colors5.slice(1, 4), 44); // [ 'green', 'yellow', 'brown']
```

`splice()`数组操作

- 删除 两个参数，要删除的第一项的位置，要删除的项数

- 插入 三个参数，起始位置，要删除的项数，要插入的项数

- 替换 可以指向位置插入任意数量的项，且同事删除任意数量的项

`splice()`始终都返回一个数组，从原始数组中删除的项，如果没有删除的项返回一个空数组

```js
var color7 = ['red', 'green', 'blue'];
var removed = color7.splice(0,1);
console.log(color7, removed); // ['green', 'blue']   ['red']
```

### 位置方法

`indexOf()`从数组的开头向后查找
`lastIndex()` 从数组的末尾开始向前查找

没有找到返回 `-1`


### 迭代方法

每个方法都接收两个参数，对每一项上运行的函数，运行该函数的作用域对象
传入这些方法的函数接受三个参数，数组项的值，该数组的位置，数组对象本身

`every()`如果每一项都返回true,则返回true
`filter()`返回该函数返回true的项组成的数组
`forEach()`没有返回
`map()`每次函数调用的结果组成数组
`some()`任意一项返回true,则返回true

```js
var numbers = [1,2,3,4,5,4,3,2,1];
var everyResult = numbers.every(function(item, index, array){
    return (item > 2);
});
console.log(everyResult); //false

var someResult = numbers.every(function(item, index, array){
    return (item > 2);
});
console.log(someResult); //true

var filterResult = numbers.every(function(item, index, array){
    return (item > 2);
});
console.log(filterResult); [3,4,5,4,3]

var mapResult = numbers.map(function(item, index, array){
return item * 2;
});

console.log(mapResult); //[2,4,6,8,10,8,6,4,2]
```
### 归并方法

`reduce()`从数组第一项开始逐个遍历到最后
`reduceRight()` 从数组第一项开始逐个到第一项

两个参数 调用函数和作为归并基础的初始值

给`reduce()`和 `reduceRight()`的函数接收4个参数  前一个值、当前值、索引值、数组对象

```js
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
    return prev + cur;
});
console.log(sum); //15
```

## Date类型
创建日期

```js
var now = new Date();
```
`Date.parse()` 接收一个表示日期的字符串参数，根据这个字符串返回相应日期的毫秒数，接收以下参数

- 6/13/2004
- january 12,2004
- Tue May 25 2004 00:00:00 GMT-0700
- 2004-05-25T00:00:00


创建一个2004年5月25日的日期对象

```js
var someDate = new Date(Date.parse("May 25, 2004"));
var someDate1 = new Date("May 25, 2004")
```
如果字符串不能表示为日期，返回NaN，也可以将字符串传递给构造函数`Date`,也会调用`Date.parse()`

`Date.UTC()` 也是返回日期的毫秒数，

- 参数分别是年份、基于0的月份、月中的那一天、小时数、毫秒数，
- 如果省略参数，则统统为0

```js
new Date(Date.UTC(2000, 0));  2000/1/1

new Date(Date.UTC(2005,4,5,17,55,55)); // 200/5/5 下午5:55:55
```

两者的区别在于，`Date.parse()`是基于本地时区而非GMT来创建，`Date()`构造函数参数与`Date.UTC`相同

`Data.now()`调用这个方法时的日期和时间的毫秒数
```js
var start = Date.now(); //取得开始时间
```

用 `Date`对象分析代码的工作

```js
var start = Date.now();
doSomthing();
var stop = Date.now(),
result = stop - start;
```

### 继承方法

`toString()`和 `toLocaleString()`在各个浏览器中返回的日期格式大相径庭
`valueOf()`不返回字符串，而是返回日期的毫秒表示，可以方便比较日期

### 日期格式化方法

```js
console.log(new Date().toDateString()); // Mon Jul 03 2017

console.log(new Date().toTimeString()); // 14:51:34 GMT+0800 (中国标准时间)

console.log(new Date().toLocaleDateString()); // 2017-7-3

console.log(new Date().toLocaleTimeString()); // 14:51:58

console.log(new Date().toUTCString()); // Mon, 03 Jul 2017 06:52:05 GMT

console.log(new Date().toLocaleString()); // 2017-7-3 14:53:09
```

`toLocalString()`与 `toString()`方法一样

### 日期、时间组件方法

方法 | 说明 
----|------
getTime() | 返回日期的毫秒数，与valueOf()返回的值相同
setTime(毫秒) | 以毫秒数设置日期，改变整个日期
getFullYear() | 获取四位年份
setFullYear(年) | 设置日期的年份  
getMonth() | 返回日期的月份0位1月份 
setMonth(月) | 设置日期的月份
getDate() | 返回日期月份中的天数  
setDate(日) | 设置日期月份中的天数
getDay() | 返回日期中星期的星期几 0 代表周日
setDay(日) |　设置日期中星期的星期几
getHours() | 返回日期中的小时数（0-23）
setHours(时) | 设置日期中的小时数
getMinutes() | 返回日期中的分钟数（0-59）
setMinutes(分) |　设置日期中的分钟数
getSeconds() | 返回日期中的秒数
setSeconds(秒) |　设置日期中的秒数
getMilliseconds() | 返回日期中的毫秒数
setMilliseconds(毫秒数) |　设置日期中的毫秒数

除了 `getTime()`和 `setTime()`其他的都含有`setUTCxxx()` 和 `getUTCxxx()`方法
UTC是标准时间
`getTimezoneOffset()` 返回本地和UTC时间相差的分钟数

## RegExp类型

- g 表示全局模式，应用于所有字符串
- i 表示不区分大小写模式
- m 多行模式达到下一行末尾时，还会继续查找下一行中是否存在匹配项

- 字面量创建

```js
var pattern1 = /at/g; //匹配所有at的实例

var pattern2 = /[bc]at/i; //匹配一个 bat 或cat,不区分大小写
 
var pattern3 = /.at/gi; //匹配所有以at结尾的3个字符的组合，不区分大小写
```

转义

```js
var pattern1 = /\[bc\]at/i; // 匹配一个[bc]at,不区分大小写

var pattern2 = /\.at/gi; //匹配所有.at
```

- 使用构造创建

```js
var pattern = new RegExp('[bc]at', 'i');
```

转义

所有的转义符必须是双重转义

```js
var pattern = new RegExp('\\[bc\\]at', 'i');
```

使用字面量始终会共享一个RegExp实例，而使用构造函数创建每一个RegExp实例都是一个新实例
第一个循环因为上次已经索引到 `cat`,第二次从索引为3的地方开始，所以后面方法都是失败
第二个循环每次都是创建新的实例，因此返回true

```js
var re = null;
for (var i = 0; i < 10; i++ ) {
    re = /cat/g;
    re.test('catastrophe');
}

for (var i = 0; i < 10; i++ ) {
    re = new RegExp('cat', 'g');
    re.test('catastrophe');
}
```

### RegExp实例属性

- global布尔值 是否设置了g
- ignoreCase 布尔值 是否设置了i
- lastIndex 整数  表示开始搜索下一个匹配项的字符位置，从0开始
- multiline 是否设置了m标志
- source 正则表达式的字符串表示

```js
console.log(pattern1.ignoreCase); // true
console.log(pattern1.ignoreCase); // true
console.log(pattern1.multiline); // false
console.log(pattern1.lastIndex); // 0
console.log(pattern1.source); // \[bc\]at
```


### RegExp构造函数属性

正则的一些表达式操作

```js
if(patterns.test(text)) {
    console.log(RegExp.input, RegExp['$_']); //this has benn a short summer
    console.log(RegExp.leftContext, RegExp['$`']); // this has benn a
    console.log(RegExp.rightContext,RegExp["$'"]); // summer
    console.log(RegExp.lastMatch, RegExp['$&']); //short
    console.log(RegExp.lastParen, RegExp['$+']); //s
    console.log(RegExp.multiple, RegExp['$*']); // 浏览器显示undefined
}
```

用于存储捕获组的构造函数，最多有9个

```js
if(pattern.test(text)) {
    console.log(RegExp.$1); //sh
    console.log(RegExp.$2); //t
}
```

### 模式的局限性

缺少某些语言所支持的高级正则表达式特性



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

3种特殊的引用类型： `Boolean`、`Numner`、`String`
每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象

```js
var s1 = 'mayufo';
var s2 = s1.substring(2);
```
基本类型值不是对象，逻辑上讲他们不应该有方法，但确实有方法

在后台完成如下处理
- 创建 `string`的一个实例
- 实例上调用指定的方法
- 销毁这个实例

```js
var s1 = new String('myaufo');
var s2 = s1.substring(2);
s1 = null;
```

上面的步骤适用于 `Boolean`和 `Number`

`引用类型`和`基本包装类型`主要区别就是对象的生存期
引用类型 当执行流离开当前作用域之前一直保存在内存中
基本包类型 只存在于一行代码的执行瞬间，然后立即被销毁，无法在基本类型值添加属性和方法


也可以显示调用 `Boolean`、`Number`、`String`来创建基本包装类型的对象，但是应该在必要的情况下

`Object`构造函数就想工厂一样，根据传入值的类型返回相应基本保证类型的实例

```js
var obj = new Object('some text');
console.log(obj instanceof String); //true
```

使用`new`调用基本包装构造函数和同名转型函数是不一样的

```js
var value = '25';
var number = Number(value); // 转型函数
console.log(typeof number)// number

var obj = new Number(value); //构造函数
console.log(typeof obj); // object
```

### Boolean类型

```js
var falseObject = new Boolean(false);
var result = falseObject && true;
console.log(result); // true


var falseValue = false;
var result1 = falseValue && true;
console.log(result1)  // false
```


`Boolean()`类型的实例重写了`valueOf()`、`toString()`返回字符串`true`和`false`,
不建议直接实例化`Boolean`

```js
var falseValue = false;
var result1 = falseValue && true;
console.log(result1)  // false
console.log(typeof falseValue); //boolean
console.log(falseValue instanceof Boolean); //false
```

### Number 类型

`toString()`方法传递一个表示基数的参数，返回几进制的字符串形势

```js
var num = 10;
console.log(num.toString()); // '10'
console.log(num.toString(2)); // '1010'
console.log(num.toString(8)); // '12'
```

`toFixed()` 按照指定的小数位数返回数值的字符串表示,能够四舍五入，适用于货币，但是每个浏览器又有所不同
可以表示 0 - 20个小数位

```js
var numFix = 10;
console.log(numFix.toFixed(2)) // 10.00
```

`toExponentail()`返回以指数表示

```js
var numEx = 10;
console.log(numEx.toExponential(1)); //1.0e+1
```

`toPrecision`返回固定大小格式，也可能返回指数格式，表示0 - 21位小数

```js
var numPre = 99;
console.log(num.toPrecision(1)); // 1e+2 用一位表示99，无法精准用1e+2即100
console.log(num.toPrecision(2)); //'99'
console.log(num.toPrecision(3)); // '99.0'
```

不建议直接实例化`Number`,同`Boolean`

