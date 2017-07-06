var colors = new Array(3);
var colors1 = Array(3);

var names = new Array('Greg');
var names1 = Array('Greg');

colors[7] = 'may';

console.log(colors);

if(Array.isArray(colors)) {
    console.log(true);
}

console.log(colors.toString());
console.log(colors.valueOf());

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
console.log(values);

var colors3 = ['red', 'green'];
var colors4 = colors3.concat('yellow', ['brown']);
console.log(colors3, colors4);

var colors5 = ['red', 'green', 'yellow', 'brown', 'pink', 'blue'];

console.log(colors5.slice(1), 11);
console.log(colors5.slice(1, 4), 44);

var color7 = ['red', 'green', 'blue'];
var removed = color7.splice(0,1);
console.log(color7, removed);

var numbers = [1,2,3,4,5,4,3,2,1];
var everyResult = numbers.every(function(item, index, array){
    return (item > 2);
});
console.log(everyResult); //false

var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
    return prev + cur;
});
console.log(sum); //15

var start = Date.now();

console.log(start);

console.log(new Date().toDateString()); // Mon Jul 03 2017

console.log(new Date().toTimeString()); // 14:51:34 GMT+0800 (中国标准时间)

console.log(new Date().toLocaleDateString()); // 2017-7-3

console.log(new Date().toLocaleTimeString()); // 14:51:58

console.log(new Date().toUTCString()); // Mon, 03 Jul 2017 06:52:05 GMT

console.log(new Date().toLocaleString()); // 2017-7-3 14:53:09


var re = null,
    i;
for (var i = 0; i < 10; i++ ) {
    re = /cat/g;
    re.test('catastrophe');
}

for (var i = 0; i < 10; i++ ) {
    re = new RegExp('cat', 'g');
    re.test('catastrophe');
}

var pattern1 = /\[bc\]at/i;
console.log(pattern1.ignoreCase); // true
console.log(pattern1.ignoreCase); // true
console.log(pattern1.multiline); // false
console.log(pattern1.lastIndex); // 0
console.log(pattern1.source); // \[bc\]at

var text = 'this has been a short summer';
var patterns = /(.)hort/g;

if(patterns.test(text)) {
    console.log(RegExp.input, RegExp['$_']); //this has benn a short summer
    console.log(RegExp.leftContext, RegExp['$`']); // this has benn a
    console.log(RegExp.rightContext,RegExp["$'"]); // summer
    console.log(RegExp.lastMatch, RegExp['$&']); //short
    console.log(RegExp.lastParen, RegExp['$+']); //s
    console.log(RegExp.multiple, RegExp['$*']); // 浏览器显示undefined
}

var text = 'this has benn a short summer'

var pattern = /(..)or(.)/g;

if(pattern.test(text)) {
    console.log(RegExp.$1); //sh
    console.log(RegExp.$2); //t
}






console.log(sumF(10, 10));

function sumF(num1, num2) {

    return num1 + num2;
}


// console.log(sum1(10, 10));

var sum1 = function (num1, num2) {
    return num1 + num2;
}


function callSomeFunction(someFunction, someArgument) {
    return someFunction (someArgument);
}
function add10(num) {
    return num + 10;
}

var result = callSomeFunction (add10, 10);
console.log(result);

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


function factorial(num) {
    if(num <= 1) {
        return 1
    } else {
        return num * factorial(num - 1)
    }
}


function outer() {
    inner();
}

function inner() {
    console.log(inner.caller, 111);
}

outer();


function outer1() {
    inner1();
}

function inner1() {
    console.log(inner1.caller, 222);
}

outer1();

function sayName(name) {
    console.log(name);
}

console.log(sayName.length);

function sumFF(num1, num2) {
    return num1 + num2;
}

function callSum1(num1, num2) {
    return sumFF.apply(this, arguments);
}

function callSum2(num1, num2) {
    return sumFF.apply(this, [num1, num2]);
}

function callSum3(num1, num2) {
    return sumFF.call(this, num1, num2);
}


console.log(callSum1(10, 10)); //20
console.log(callSum2(10, 10)); //20
console.log(callSum3(10, 10)); //20

window.color = 'red';

var o = {color: 'blue'};

function sayColor() {
    console.log(this.color)
}

console.log(sayColor()); // red

console.log(sayColor(this)); //red

console.log(sayColor(window)); //red

console.log(sayColor(o)); //blue



window.color = 'red';
var o = {color : 'blue'};
function sayColor() {
    console.log(this.color);
}

var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue

var obj = new Object('some text');
console.log(obj instanceof String); //true

var value = '25';
var number = Number(value); // 转型函数
console.log(typeof number)// number

var obj = new Number(value); //构造函数
console.log(typeof obj); // object

var falseObject = new Boolean(false);
var result = falseObject && true;
console.log(result); // true
console.log(typeof falseObject); //Object
console.log(falseObject instanceof Boolean); //true

var falseValue = false;
var result1 = falseValue && true;
console.log(result1)  // false
console.log(typeof falseValue); //boolean
console.log(falseValue instanceof Boolean); //false

var stringValue = 'hello world';
console.log(stringValue.charAt(1));
console.log(stringValue.charCodeAt(1));
console.log(stringValue.concat('world'));


console.log(stringValue.slice(3));
console.log(stringValue.substring(3));
console.log(stringValue.substr(3));
console.log(stringValue.slice(3, 7));
console.log(stringValue.substring(3, 7));
console.log(stringValue.substr(3, 7));

console.log(stringValue.slice(-3));
console.log(stringValue.substring(-3));
console.log(stringValue.substr(-3));
console.log(stringValue.slice(3, -4));
console.log(stringValue.substring(3, -4));
console.log(stringValue.substr(3, -4));


var stringValue1 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit"; var positions = new Array();
var pos = stringValue1.indexOf("e");
while(pos > -1){
    positions.push(pos);
    pos = stringValue1.indexOf("e", pos + 1);
}
console.log(positions); // 3 24 32 35 52

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
console.log(execStr);


console.log(text.search(/at/));
console.log(text.replace('at', 'ond')); // cond,bat,sat,bat
console.log(text.replace(/at/g, 'ond'));  // cond,bond,sond,fond
console.log(text.replace(/(.at)/g, 'world($1)'));  // world(cat), world(bat), world(sat), world(fat)


function htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case '\"':
                return "&quot;";
        }
    })
}

console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>")); //&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;

var colorText = 'red, blue,green,yellow';
console.log(colorText.split(','));  //["red", "blue", "green", "yellow"]
console.log(colorText.split(',', 2)); //["red", "blue"]
console.log(colorText.split(/[^\,]+/)); //["", ",", ",", ",", ""]


var stringvalue = 'yellow';

console.log(stringvalue.localeCompare('brick'));
console.log(stringvalue.localeCompare('yellow'));
console.log(stringvalue.localeCompare('yalloa'));


console.log(String.fromCharCode(104, 101, 108, 108, 111));

var uri = 'http://www.wrox.com/illegal value.htm#start';

console.log(encodeURI(uri)); //http://www.wrox.com/illegal%20value.htm#start

console.log(encodeURIComponent(uri));  // http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start

var msg = 'hello world';
eval(console.log(msg));

eval("function sayhi() {console.log('hi')}");
sayhi();

var color1 =  'red';
console.log(window.color1);


var global = function () {
    return this;
}();