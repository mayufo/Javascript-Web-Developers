# 函数表达式

- 函数声明

```js
// 函数声明
function functionName (){
    
}
```

函数声明一个重要特征就是函数提升，执行代码之前先读取函数声明

- 函数表达式

```js
var functionName = function (arg0, arg1, arg2){}
```
这种情况下创建的函数叫做匿名函数

不要尝试 

```js
if(true) {
    function sayHI() {
      console.log('hi');
    }
} else {
    function sayHI() {
      console.log('no');
    }
}
```

可以尝试

```js
if(true) {
    sayHI = function() {
      console.log('hi')
    }
} else {
    sayHI = function() {
      console.log('no')
    }
}
```

匿名函数可能会被赋值给一个变量，或者其其他方法调用

```js
return function (obj1, obj2) {
    return ...
}
```

## 递归

```js
function factorial(num) {
    if(num <=1) {
        return 1;
    } else {
        return num * factorial(num - 1); // return num  * arguments.callee(num - 1)
    }
}
```

为了避免函数名变化引起函数递归的变化

## 闭包





