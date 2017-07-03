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