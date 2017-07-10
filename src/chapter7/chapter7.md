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

闭包是值有权访问另一个函数作用域中的变量的函数

函数的执行环境而已，作用域包含两个变量对象 本地活动对象和全局变量对象

```js
var compareName = createComparisonFunction('name');
var result = compareName({name: 'may'}, {name: 'liu'});
compareName = null; // 解除对匿名函数的引用
```
匿名函数从 `createComparisonFunction`返回，它的作用域链包含该函数的或多对象和全局变量对象，其在执行完后，执行环境的作用域链销毁，活动对象留在内存中，因为匿名函数的作用域链仍然在引用这个活动对象。除非这个匿名函数被销毁

由于闭包会携带函数的作用域，会占用更多的内容

### 闭包与变量

```js
function createFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function () {
            return i;
        }
    }

    return result;
}


```
每个函数返回都是10，因为每个函数的作用域链中都保存着 `createFunction`（）函数的活动对象，引用的都是同样的变量i


```js
function createFunction() {
    var result= new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function (num) {
            return function () {
                return num
            }
        }
    }
}
```
定义一个匿名函数，立即执行该匿名函数的结果并赋值给数组，创建了 `num`的闭包

### 关于this对象

全局中 this 等于 window
匿名函数的执行环境具有全局性，this对象通常指向 `window`
```js
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        return function () {
            return this.name;
        };
    }
};
console.log(object.getNameFunc()(), 222);  // 没有显示
```

将this先存起来，在闭包以后再调用
```js
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };
    }
};

console.log(object.getNameFunc()(), 3333); // 'My Object'
```


```js
var name = 'the window';

var object = {
    name: 'my object',
    getName: function () {
        return this.name;
    }
}

console.log(object.getName()); // my object
console.log((object.getName)()); // my object
console.log((object.getName = object.getName)()); // 全局 没有显示
```

第三种赋值语句，语法的变化，改变了this的值

### 内存泄露

如果闭包的作用域中保存着一个 `html`元素，元素就无法被销毁

```js
function assignHandler() {
    var element = document.getElementsById('someElement');
    element.onclick = function () {
        console.log(element.id);
    };
    
    element = null; // 取消引用，回收内存
}
```

以上代码创建了一个 `element`的闭包，闭包有创建了循环引用，只要匿名存在，引用至少1，内存无法回收


