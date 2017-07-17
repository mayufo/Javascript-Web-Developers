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

## 模仿块级作用域

js没有会计作用域的概念，在块语句中定义的变量，实际也包含函数中

```js
function outputNumbers(count) {
    for (var i = 0; i < count; i++) {
        console.log(i); // 分别输出1 2 3 4 5 
    }
    console.log(i, 44); // 5
}
outputNumbers(5);
```

即使重新声明变量，也不会改变它的值

匿名函数可以用会计作用域来避免

```js
(function() {
    // 这里是块级作用域
})
```

```js
function outputNumbers2(count) {
    (function () {
        for (var i = 0; i < count; i++) {
            console.log(i)
        }
    })();
    console.log(i, 44); // 报错
}
outputNumbers2(5);
```

可以使用自己的变量，又不必担心搞乱全局作用域


## 私有变量

js没有私有成员的概念，但是任何函数中定义的变量都可以认为是私有变量，包括参数、局部变量和函数内部定义的其他函数

有权访问私有变量和私有函数的公有方法成为`特权方法`

```js
function MyObject() {
    // 私有变量和私有函数
    var privateVariable = 10;
    function privateFunction () {
        return false;
    }
    // 特权方法
    this.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    }
}
```

利用私有和特权成员可以隐藏那些不应该直接修改的数据

使用构造函数来达到目的会针对每个实例都创建同样一组方法，可以考虑静态私有变量来实现特权方法

### 静态私有变量

在私有作用域中,封装了一个构造函数及相应的方法

```js
(function () {
    // 私有变量和私有函数
    var privateVariable = 10;
    function privateFunction() {
        return false
    }
    // 构造函数
    MyObject = function () {

    };
    // 公有/特权方法
    MyObject.prototype.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    }
})()
```

公有方法在原型上定义，构造函数是一个全局变量，能在私有作用域之外被访问
私有变量和函数是由实例共享，都使用一个函数

```js
(function () {
    var name = '';

    Person = function (value) {
        name = value;
    }

    Person.prototype.getName = function () {
        return name;
    }

    Person.prototype.setName = function (value) {
        name = value;
    }
})()

var person1 = new Person('may');
console.log(person1.getName()); // may
person1.setName('liu'); 
console.log(person1.getName()); // liu
```

`name`变成静态的，由所有实例共享的属性

增进代码的复用，但是每个实例都没有私有变量

### 模块模式

为单利创建私有变量和特权方法
`单例`就是只有一个实例对象

```js

var singleton = {
    name: value,
    method: function () {
        // 方法代码
    }
}
```

模块模式通过单例添加私有变量和特权方法

```js
var sigleton = function () {
    // 私有变量和方法
    var privateVariable = 10;
    
    function privateFunction() {
        return false
    }
    // 特权 公有方法和属性
    return {
        publicProperty: true,
        publicMethod: function () {
            privateVariable++;
            return privateFunction();
        }
    }
}
```

因为通过字面量来表示它，单例通常都是作为全局对象存在，不会将它传给函数，没有必要使用 `instanceof`来检查其对象类型

### 增加的模块模型

```js
var singleton = function () {
    // 私有变量和私有函数
    var privateVariable = 10;
    
    function privateFunction() {
      return false;
    }
    // 创建对象
    var object = new CustomType();
    
    // 添加特权/私有属性和方法
    object.publicProperty = true;
    object.publicMethod = function() {
      privateVariable++;
      return privateFunction();
    };
    
    return object;
}
```


```js
var application = function () {
    // 私有变量和函数
    var components = new Array();
    // 初始化
    components.push(new BaseComponent());
    // 创建局部副本
    var app = new BaseComponent();
    
    // 公共接口
    app.getComponentCount = function () {
        return components.length;
    }
    
    app.registerComponent = function (component) {
        if(typeof component == 'object'){
            components.push(component);
        }
    }
    // 返回副本
    return app;
}
```

结果仍然是将它赋值给全局变量 `application`

## 小结

- 当在函数内部定义了其他函数的时候，就创建了闭包，闭包有权访问函数内部所有变量
    - 闭包的作用域包含着它自己的作用域，包含函数的作用域和全局作用域
    - 通常函数作用域及所有变量执行结束后销毁
    - 当函数返回一个闭包，函数作用域将会一直再内存中保存到闭包不存在为止
