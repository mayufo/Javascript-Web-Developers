# 引用类型

是一种数据结构

## Object类型

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
对象字面量也可以向函数传递大量可选参数

```js
function displayInfo(args) {
  var output = '';
  if (typeof args.name == 'string') {
      output += 'Name' + args.name +'\n'
  }
  if (typeof args.age == 'number') {
      output += 'Age' +args.age + '\n';
  }
  console.log(output);
}

displayInfo({
    name: 'may',
    age: 18
})
```

访问对象
- 点表示法
- 方括号表示法来访问对象属性

除非必须使用变量访问属性，否则建议使用点表示法

## Array类型

- 构造创建

```js
var colors = new Array(3);
var colors1 = Array(3);

var names = new Array('Greg');
var names1 = Array('Greg');
```

- 数组字面量表示法 (推荐)

```js
var color = ['red', 'blue', 'green'];
```

利用 `length`属性可以方便给数组末尾添加新项
```js
color[color.length] = 'may';
color[99] = 'ufo';
console.log(color.length); // 100
```
新数组长度是100，而4-99不存在，访问是 `undefined`

### 检测数组

`instanceof`问题在于假定只有一个全局执行环境，在两个以上不同的全局执行环境，会存在不同版本的`Array`构造函数
可以使用 `Array.isArray()`来判断是否是数组

```js
if(Array.isArray(colors)) {
    console.log(true);
}
```

### 转换方法

所有对象都有 `toLocaleString()`、`toString()`、`valueOf()`

`toString()` 返回数组中每个值的字符串形势拼接而成的一个以逗号分隔的字符串
`valueOf` 返回的还是数组
```js
var colors = ['red', 'blue', 'green'];
console.log(colors.toString()); // "red,blue,green"
console.log(colors.valueOf()); //  ["red", "blue", "green"]
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
console.log(people.toLocaleString()); //Nikolaos,Grigorios
```


`join()`可以使用不同的分隔符重构字符串,将数组转变为字符串

```js
console.log(colors.join('|')) // red|green|blue
```

### 栈方法

后进先出
`push()`逐个添加到数组末尾
`pop()`移除数组末尾最后一项

### 队列方法

先进先出
`shift()`删除数组第一项
`unshift()`在数组第一项的位置插入

### 重排序方法

- `revers()` 反转原来数组的顺序

```js
var values= [1,2,3,4,5];
values.reverse();
console.log(values); // 5,4,3,2,1
```
- `sort()`升序方法，每一项调用 `toString()`以后排序

`sort()`方法接受一个比较函数作为参数，制定那个值位于那个值的前面

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

1. `concat()` 基于当前所有项创建一个新数组，不会影响原始数组

```js
var colors3 = ['red', 'green']; 
var colors4 = colors3.concat('yellow', ['brown']); 
console.log(colors3, colors4);// ['red', 'green']  ['red', 'green', 'yellow', 'brown']
```

2. `slice()`基于当前数组中的一个或者多个项创建一个新数组,不会影响原始数组

```js
var colors5 = ['red', 'green', 'yellow', 'brown', 'pink', 'blue'];

console.log(colors5.slice(1), 11); // ['green', 'yellow', 'brown', 'pink', 'blue']
console.log(colors5.slice(1, 4), 44); // [ 'green', 'yellow', 'brown']
```

如果slice里面有负数，则用数组长度加上改数来确定相应位置比如5项的数组调用`slice(-2, -1)`相当于`slice(3, 4)`

3. `splice()`数组操作

- 删除 两个参数，要删除的第一项的位置，要删除的项数

- 插入 三个参数，起始位置，要删除的项数(0)，要插入的项数

- 替换 起始的位置，要删除的项数和要插入的项数

`splice()`始终都返回一个数组，从原始数组中删除的项，如果没有删除的项返回一个空数组

```js
var color7 = ['red', 'green', 'blue'];
var removed = color7.splice(0,1);
console.log(color7, removed); // ['green', 'blue']，['red']

var removed1 = color7.splice(1, 0, "yellow", "orange")
console.log(color7); //  ['green','yellow','orange', 'blue']
console.log(removed1); //[]

var removed1 = colors.splice(1, 1, "red", "purple");
console.log(color7); // ['green','red','purple', 'organge', 'blue']
console.log(removed1); // ['yellow']
```

### 位置方法

`indexOf()`从数组的开头向后查找
`lastIndex()` 从数组的末尾开始向前查找

接收两个参数要查找的项和查找起点位置的索引

没有找到返回 `-1`


### 迭代方法

每个方法都接收两个参数，对每一项上运行的函数，运行该函数的作用域对象
传入这些方法的函数接受三个参数，`数组项的值`，`该数组的位置`，`数组对象本身`

`every()`如果每一项都返回true,则返回true
`filter()`返回该函数会返回true的项组成的数组
`forEach()`每一项运行给定函数没有返回
`map()`每次函数调用的结果组成数组
`some()`任一项返回true,则返回true

```js
var numbers = [1,2,3,4,5,4,3,2,1];
var everyResult = numbers.every(function(item, index, array){
    return (item > 2);
});
console.log(everyResult); //false

var someResult = numbers.some(function(item, index, array){
    return (item > 2);
});
console.log(someResult); //true

var filterResult = numbers.filter(function(item, index, array){
    return (item > 2);
});
console.log(filterResult); [3,4,5,4,3]

var mapResult = numbers.map(function(item, index, array){
return item * 2;
});

console.log(mapResult); //[2,4,6,8,10,8,6,4,2]
```
### 归并方法

会迭代数组的所有项，构建一个最终返回的值

`reduce()`从数组第一项开始逐个遍历到最后
`reduceRight()` 从数组第一项开始逐个到第一项

接收两个参数，调用函数和作为归并基础的初始值

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
var someDate = new Date(Date.parse("May 25, 2004")); //这两段代码等价
var someDate1 = new Date("May 25, 2004")
```
如果字符串不能表示为日期，返回NaN

`Date.UTC()` 也是返回日期的毫秒数，

- 参数分别是年份、基于0的月份、月中的那一天、小时数、毫秒数，
- 如果省略参数，则统统为0

```js
new Date(Date.UTC(2000, 0));  2000/1/1

new Date(Date.UTC(2005,4,5,17,55,55)); // 200/5/5 下午5:55:55
```

`Date()`基于本地时区而非GMT来创建，`Date()`构造函数参数与`Date.UTC`相同

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

### 日期/时间组件方法

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

// 匹配"[bc]at",就要对其中的方括号进行转义

var pattern2 = /\.at/gi; //匹配所有.at  

// 句号表示"at"之前任意一个可以构成匹配项的字符串，如果匹配".at",必须对句点本身进行转义
```

- 使用构造函数

```js
var pattern = new RegExp('[bc]at', 'i'); //匹配一个 bat 或cat,不区分大小写
var pattern2 = /[bc]at/i;
```

所有的转义符必须是双重转义

```js
var pattern1 = /\[bc\]at/i; // 匹配一个[bc]at,不区分大小写
var pattern = new RegExp('\\[bc\\]at', 'i');

var pattern1 =/\.at/i; // 匹配一个[bc]at,不区分大小写
var pattern = new RegExp('\\.at', 'i');
```

使用字面量始终会共享一个RegExp实例，而使用构造函数创建每一个RegExp实例都是一个新实例
第一个循环因为上次已经索引到 `cat`,第二次从索引为3的地方开始，所以后面方法都是失败,由于实力属性没有重置
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
var pattern1 = /\[bc\]at/i;
console.log(pattern1.global); // false
console.log(pattern1.ignoreCase); // true
console.log(pattern1.multiline); // false
console.log(pattern1.lastIndex); // 0
console.log(pattern1.source); // "\[bc\]at"
```

###  RegExp 实例方法

`RegExp`主要方法是`exec()`,专门为捕获组而设计的。`exec()`接受一个参数，即要应用模拟的字符串，返回包含第一个匹配项信息的数组或者没有匹配项情况返回null

还包括两个额外的属性`index` 和`input`分别表示字符串中的位置，和表达式中的字符串

```js
var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;

var matches = pattern.exec(text);
console.log(matches.index); //0
console.log(matches.input); // "mom and dad and baby"
console.log(matches[0]); // "mom and dad and baby"
console.log(matches[1]); // " and dad and baby"
console.log(matches[2]); // " and baby"

```

没有全局标志，同一个字符串上调用多次exec始终返回第一个匹配项的信息

没有设置全局表示的情况，每次调用exec都会在字符串中即系查找新的匹配项

```js
var text = "cat, bat, sat, fat";

// 不是全局模式
var pattern1 = /.at/;
var matches = pattern1.exec(text);
console.log(matches.index); //0
console.log(matches[0]); //cat
console.log(pattern1.lastIndex); //0

matches = pattern1.exec(text);
console.log(matches.index); //0
console.log(matches[0]); //cat
console.log(pattern1.lastIndex); //0

// 全局模式
var pattern2 = /.at/g;
var matches = pattern2.exec(text);
console.log(matches.index); //0
console.log(matches[0]); //cat
console.log(pattern2.lastIndex); //3

matches = pattern2.exec(text);
console.log(matches.index); //5
console.log(matches[0]); //bat
console.log(pattern2.lastIndex); //8
```

`test()`接受一个字符串参数，模式与该参数匹配情况下返回true,否则返回false

```js
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)){
    console.log("The pattern was matched.");
}
```
RegExp实例继承的toLocaleString()和toString()方法都会返回正则表达式的字面量

```js
var pattern = new RegExp("\\[bc\\]at", "gi");
console.log(pattern.toString()); // /\[bc\]at/gi
console.log(pattern.toLocaleString()); // /\[bc\]at/gi
```

### RegExp构造函数属性

正则的一些表达式操作

```js
var text = "this has been a short summer";
var patterns = /(.)hort/g;

if(patterns.test(text)) {
    console.log(RegExp.input, RegExp['$_']); //this has benn a short summer
    console.log(RegExp.leftContext, RegExp['$`']); // this has benn a
    console.log(RegExp.rightContext,RegExp["$'"]); // summer
    console.log(RegExp.lastMatch, RegExp['$&']); //short
    console.log(RegExp.lastParen, RegExp['$+']); //s
    console.log(RegExp.multiple, RegExp['$*']); // false 浏览器显示undefined
}

```

- `input` 返回了原始字符串
- `leftContext` 返回了单词`short`之前的字符串
- `rightContext` 返回了`short` 之后的字符串
- `lastMatch`返回了最近一次整个正则表达式匹配的字符串 `short`
- `lastParent` 属性返回了最近一次匹配的捕获租，即`s`

用于存储捕获组的构造函数，最多有9个

```js
var text = "this has been a short summer";
var pattern = /(..)or(.)/g;

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
var sum = new Function("num1", "num2", "return num1 + num2");
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

var result = callSomeFunction (add10, 10);  // 函数名仅仅是一个包含指针的变量
console.log(result); //10
```


- 从一个函数中返回一个函数

在一个函数中嵌套另一个函数，而且内部函数前面加一个`return操作符`

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

- `argument` 保存函数参数，`arguments.callee`指向拥有这个`arguments`对象的函数

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
严格模式不能为函数的`caller`赋值

### 函数属性和方法

每个函数都包含两个属性

- length  表示函数希望接收的参数个数

```js
function sayName(name) {
    console.log(name);
}

console.log(sayName.length); //1
```

- `prototype` 保存所有实例方法的真正所在 不可枚举，使用 `for...in`无法发现

每个函数还包含两个非继承方法`apply()`和`call()`
在特定的作用域中调用函数，设置函数体内`this`对象的值
- `apply()` 接收两个参数，一个是其中运行函数的作用域，第二个数参数数组，可以是 `Array`的实例，也可以是 `arguments`对象

这里传入的`this`,实际就是 `window`对象
```js
function sum(num1, num2){
    return num1 + num2;
}

function callSum1(num1, num2) {
    return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);
}

console.log(callSum1(10, 10)); //20
console.log(callSum2(10, 10)); //20

```

- `call()`

```js
function sum(num1, num2){
    return num1 + num2;
}

function callSum3(num1, num2) {
    return sum.call(this, num1, num2);
}
console.log(callSum3(10, 10)); //20
```

实际应用扩充作用域，对象不需要与方法有任何耦合关系

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

`引用类型`和`基本包装类型`主要区别就是对象的`生存期`
`引用类型` 当执行流离开当前作用域之前一直保存在内存中
`基本包类型` 只存在于一行代码的执行瞬间，然后立即被销毁，无法在基本类型值添加属性和方法


也可以显示调用 `Boolean`、`Number`、`String`来创建基本包装类型的对象，但是应该在必要的情况下

`Object`构造函数就像工厂一样，根据传入值的类型返回相应基本保证类型的实例

```js
var obj = new Object('some text');
console.log(obj instanceof String); //true
```

使用`new`调用基本包装构造函数和同名转型函数是不一样的

```js
var value = '25';
var number = Number(value); // 转型函数
console.log(typeof number)// "number"

var obj = new Number(value); //构造函数
console.log(typeof obj); // "object"
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


`Boolean()`类型的实例重写了`valueOf()`返回基本类型的true或false、`toString()`返回字符串`true`和`false`,
不建议直接实例化`Boolean`

和基本类型的两个区别

- typeof操作符对基本类型返回`"boolean"`,对引用类型返回`"object"`
- Boolean对象是`Boolean`类型的实例，所以使用`instanceof`返回true,基本类型返回false
```js
var falseValue = false;
var falseObject = new Boolean(false);
alert(typeof falseObject); //object
alert(typeof falseValue); //boolean
alert(falseObject instanceof Boolean); //true
alert(falseValue instanceof Boolean); //false
```

不推荐使用

### Number 类型
`valueOf`返回对象表示的基本类型数值
`toLocaleString()`、`toString()`返回字符串形势的数值
`toString()`方法传递一个表示基数的参数，返回几进制的字符串形式

```js
var num = 10;
console.log(num.toString()); // '10'
console.log(num.toString(2)); // '1010'
console.log(num.toString(8)); // '12'
```
Number类型还提供将数值格式化为字符串的方法

`toFixed()` 按照指定的小数位数返回数值的字符串表示,能够四舍五入，适用于货币，但是每个浏览器又有所不同
可以表示 0 - 20个小数位

```js
var numFix = 10;
console.log(numFix.toFixed(2)) // "10.00"
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

使用`typeof`操作符测试基本类型数值返回`"number"`,而猜测是`Number`对象是，返回`"object"`,类似的`Number`对象是`Number`类型的实例，基本类型的数值则不是


### String 类型

`valueOf()`、`toLocaleString()`和 `toString()`都返回对象所表示的基本字符串值

每个实例都有个`length`属性

- 字符串方法

`charAt()`以单字符串字符串的形式返回给定位置的字符串
`charCodeAt()`返回对应的字符编码
使用方括号加数字索引来访问字符串中的特定字符

```js
var stringValue = 'hello world'
console.log(stringValue.charAt(1)); //'e'
console.log(stringValue.charCodeAt(1));  // 101
console.log(stringValue[1]); // 'e'
```

- 字符串的操作方法

`concat()`用于将一或者多个字符串拼接起来，返回新的字符串

```js
var stringValue = 'hello';
console.log(stringValue.concat('world')); // hello world
```

`+`通常字符串的拼接用的加好

`slice()` 、`substr()`和 `substring()` 都返回操作字符串的子字符串，第一个参数是开始位置，第二个参数是结束位置(不包含)。

`substring`的第二个参数返回字符个数

```js
var stringValue = 'hello world';
console.log(stringValue.slice(3)); // 'lo world'
console.log(stringValue.substring(3)); // 'lo world'
console.log(stringValue.substr(3)); // 'lo world'
console.log(stringValue.slice(3, 7)); // 'lo w'
console.log(stringValue.substring(3, 7)); // 'lo w'
console.log(stringValue.substr(3, 7)); // 'lo world'
```

如果传值是负数的情况

`slice()` 和 `substr()` 会将负数加字符串长度, 而 `substring()`将所有负数参数默认为0

`substr()`第二个负数参数转为0，`slice()`会将第二个负数加字符串长度

```js
var stringValue = 'hello world';
console.log(stringValue.slice(-3)); // 'rld'   -3 + 11 = 8 相当于  stringValue.slice(8)
console.log(stringValue.substring(-3)); //'hello world'
console.log(stringValue.substr(-3)); // 'rld'  -3 + 11 = 8 相当于  stringValue.substr(8)
console.log(stringValue.slice(3, -4)); //'lo w' -4 + 11 = 7 相当于 stringValue.slice(3, 7)
console.log(stringValue.substring(3, -4)); //'hel' 相当于stringValue.substring(3, 0)， 但实际这个方法会将较大的值放在结束位置stringValue.substring(0, 3)
console.log(stringValue.substr(3, -4)); // '' 第三个位置返回0个参数
```

- 字符串位置

`indexOf()`（前向后） 和 `lastIndexOf()` （从后向前）从一个字符串中搜索给定的子字符串，第二个参数是从那个位置之后开始搜索

匹配所有子字符串
```js
var stringValue1 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit"; 
var positions = new Array();
var pos = stringValue1.indexOf("e");
while(pos > -1){
    positions.push(pos);
    pos = stringValue1.indexOf("e", pos + 1); // 位置每次加1，确保从上次搜索之后找起
}
console.log(positions);
```

- trim()方法

`trim()` 创建一个字符串的副本，删除前置和后置的所有空格删除前置后置的所有空格，返回结果

```js
var stringValue = " hello world ";
var trimmedStringValue = stringValue.trim();
console.log(stringValue); //" hello world "
console.log(trimmedStringValue); //"hello world"
```

- 字符串的大小写转换方法
 
`toLowerCase()` 转为小写 `toUpperCase()` 转为大写

其中 `toLocaleLowerCase()` 和 `toLocaleUpperCase()`针对特定地区实现

- 字符串的模式匹配方法

`match()`只接受一个参数，要么是一个正则表达式，要么是一个 `RegExp`,返回一个数组,该数组第一项是与之匹配的字符串，和正则中 `exec()`用法相似

```js
var text = 'cat, bat, sat, fat';
var pattern = /.at/;
var matches = text.match(pattern);
console.log(matches.index);// 0
console.log(matches[0]);// cat
console.log(pattern.lastIndex); // 0
console.log(matches); // ["cat", index: 0, input: "cat, bat, sat, fat"]

var execStr = pattern.exec(text);
console.log(execStr.index);// 0
console.log(execStr[0]);// cat
console.log(pattern.lastIndex); // 0
console.log(execStr);// ["cat", index: 0, input: "cat, bat, sat, fat"]
```

`search()`与 `match()`方法的参数相同，返回字符创中第一个匹配项的索引

```js
var text = 'cat, bat, sat, fat';
console.log(text.search(/at/)); // 1
```
`replace()`替换字符串的操作，接受两个参数，第一个参数可以是正则或者字符串，第二个参数可以是字符串或者一个函数，如果想全局替换，就要提供全局 `g`

```js
var text = "cat, bat, sat, fat";
var result = text.replace("at", "ond");
console.log(result); //"cond, bat, sat, fat"
result = text.replace(/at/g, "ond");
console.log(result); //"cond, bond, sond, fond"
```
  
第二个字符串的参数还可以使用一些特殊的字符序列
 
```js
var text = "cat, bat, sat, fat";
result = text.replace(/(.at)/g, "word ($1)");
console.log(result); //word (cat), word (bat), word (sat), word (fat)
```

`$&` 匹配整个模式的子字符串 RegExp.lastMatch相同

`$'` 匹配之前的子字符串 RegExp.leftContext的值相同

"$`" 匹配之前的子字符串 RegExp.rightContext的值相同

`$n` 匹配第n个捕获组的子字符串。n等于0-9，`$1` 匹配第一个捕获组的子字符串

`$nn` nn个捕获组的子字符串等于01-99

```js
var text = 'cat, bat, sat, fat';
result = text.replace(/(.at)/g, 'word($1)');
console.log(text.replace(/(.at)/g, 'world($1)'));  // world(cat), world(bat), world(sat), world(fat)
```

第二个字符串参数可以是一个函数

- 在只有一个匹配项的时候，这个函数可以有3个参数 模式的匹配项、模式匹配项在字符串的位置和原始字符串
- 在有多个匹配项的时候，参数依次是模式的匹配项，后两个参数依然是匹配项字符串的位置和原始字符串

```js
function htmlEscape(text){
    return text.replace(/[<>"&]/g, function(match, pos, originalText){
        switch(match){
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
        }
        });
}
console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>")); 
//&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
```
 
`split()` 可以指定分隔符将一个字符串分割成多个字符串，并将结果放在一个数组中，分隔符可以是字符串，也可以是 `RegExp`,第二个参数可以指定数组的大小

```js

var colorText = 'red, blue,green,yellow';
console.log(colorText.split(','));  //["red", "blue", "green", "yellow"]
console.log(colorText.split(',', 2)); //["red", "blue"]
console.log(colorText.split(/[^\,]+/)); //["", ",", ",", ",", ""]
```

- `localCompare()`方法 比较两个字符串,逐个字符对比，并返回 指定参数 > 对比的 大于返回 1， 等于 返回 0 小于返回-1

大写字母 > 小写字母

```js
var stringValue = "yellow";
console.log(stringvalue.localeCompare('brick'));  // 1
console.log(stringvalue.localeCompare('yellow')); //0
console.log(stringvalue.localeCompare('zoo'));  //-1
```

 `localeCompare（）`的返回值决定实现，最好写在函数里面使用
 
- `fromCharCode()` 方法

接收一或多个字符编码转为字符串

```js
console.log(String.fromCharCode(104, 101, 108, 108, 111)); // hello
```

- HTML方法

专门用于简化创建HTML格式化任务的方法，不推荐使用

## 单体内置对象

不必显示的实例化内置 如 `Object`、 `Array`、`String`

还有两个单独的内置对象 `Global` `Math`

### Global对象

不属于任何对象的属性和方法，最终都是它的属性和方法

- URI编码方法

`encodeURI()`和 `encodeURIComponent()`对URL进行编码，发送给浏览器，编码后不包含某些字符，比如空格

`encodeURI()` 不会对特殊的冒号、问号、井号等编码，而 `encodeURIComponent()`可以对这些编码

```js
var uri = 'http://www.wrox.com/illegal value.htm#start';

console.log(encodeURI(uri)); //http://www.wrox.com/illegal%20value.htm#start

console.log(encodeURIComponent(uri));  // http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start
```

`decodeURI()`和 `decodeURIComponent()`分别对应解码解码，`decodeURI()` 无法解析编码过的冒号、问号、井号


- eval() 方法

当解析器发现调用这个方法，会将传入的参数当做实际的语句解析，然后执行结果插入到原来位置，可以引用在包含环境中定义的变量

```js
var msg = 'hello world';
eval(console.log(msg)); // hello world

eval("function sayhi() {console.log('hi')}"); //hi
sayhi();
```

`eval`创建的任何变量或函数都不会被提升，因为被包含在字符串中，`eval()`执行的时候创建

严格模式下外部访问不到 `eval()`创建的函数或者变量

- Global对象属性

`undefined`、 `NaN`、 `Infinity` `Array` `Function` ...都是`Global`的属性

- window 对象

全局作用域中声明的所有变量和函数，都成了window对象的属性
```js
var color1 =  'red';
console.log(window.color1);
```

```js
var global = function () {
    return this;
}();
```

在没有给定`this`值的情况下，无论如何`call()`或`apply()`,this值等于 `Global`对象

### Math对象

- Math对象的属性
 
 `Math.E` 常量e的值
 `Math.LN10` 10的自然对数
 `Math.LN2` 2的自然对数
 `Math.LOG2E` 以2为底的e的对数
 `Math.LOG10E` 以10为底的e的对数
 `Math.PI` pi的值
 `Math.SQRT1_2` 1/2的平方根
 `Math.SQRT2`  2的平方根
 
- `min()` 和 `max()`
 
```js
console.log(Math.max(22, 33, 4, 55)); //55
console.log(Math.max.apply(Math, [22, 33, 4, 55]));//55
```

- 舍入方法

`Math.ceil()`向上舍入
`Math.floor()` 向下舍入
`Math.round()` 标准舍入

- random() 方法

值 = Math.floor(Math.random() * 可能值的总数(大数-小数+1) + 第一个可能的值)

```js
console.log(Math.floor(Math.random() * 10 + 1)); // 取 1 - 10的随机数
console.log(Math.floor(Math.random() * 9 + 2)); // 取 2 - 10的随机数
```

```js
function selectFrom(lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}

console.log(selectFrom(2, 9)); // 取 2 - 9的随机数
```

```js
var colors8 = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
console.log(colors8[selectFrom(0, colors8.length - 1)]); //随机从数组取一个值
```

打乱数组
```js
function upset (num) {
    var arr = [];
    for(var i = 0; i < num; i++) {
        arr[i] = i;
    }

    arr.sort(function () {
        return 0.5 - Math.random()
    });

    var str = arr.join();
    return (str)
}

console.log(upset(100));//23,31,2,26,4,13,29,38,46,43,55,66,76,36,44,60,32,91,27,69,79,54,37,63,34,95,64,28,49,14,30,15,71,18,84,40,11,8,50,85,98,45,56,70,20,62,24,94,39,65,0,22,35,68,77,7,61,12,10,74,6,67,52,3,72,90,41,21,81,19,86,51,17,82,75,59,78,53,93,83,57,9,5,87,33,58,73,42,89,47,96,88,99,48,80,92,16,1,97,25
```

- 其他方法

![](../../assets/Javascript5.png);

