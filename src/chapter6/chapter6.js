console.log(sum(10, 10));
function sum(num1, num2) {
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
    conole.log(name);
}

console.log(sayName.length);

function sum(num1, num2) {
    return num1 + num2;
}

function callSum1(num1, num2) {
    return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);
}

function callSum3(num1, num2) {
    return sum.call(this, num1, num2);
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