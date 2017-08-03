# 函数表达式

定义函数的两种方式
1. 函数声明
2. 函数表达式

- 函数声明
执行代码之前会先读取函数声明

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
这种情况下创建的函数叫做`匿名函数`, function 关键字后面没有标识符，使用前必须先赋值

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
var sayHI = null;
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

递归函数是一个函数通过名字调用自身情况构成的

```js
function factorial(num) {
    if(num <=1) {
        return 1;
    } else {
        return num * factorial(num - 1); // return num  * arguments.callee(num - 1)
    }
}
```

为了避免函数名变化引起函数递归的变化，可以使用`arguments.callee`

在严格模式下不能使用`arguments.callee`代替函数名，可以使用命名函数表达式达到相同的效果

```js
var factorial = (function f(num) {
  if(num <- 1) {
      return 1;
  } else {
      return num * f(num - 1);
  }
})
```

## 闭包

`闭包`是值有权访问另一个函数作用域中的变量的函数

当函数被调用时，会创建一个执行环境及相应的作用域链。然后使用`arguments`和其他命名参数的值来初始化函数的活动对象，在作用域中，外部函数活动对象处第二，外部的外部第三位，知道作用域重终点的全局执行环境

```js
function compare(value1, value2){
    if (value1 < value2){
        return -1;
    } else if (value1 > value2){
        return 1;
    } else {
        return 0;
    }
}
var result = compare(5, 10);
```

![](images/jingtong_36.png)

在创建`compare()`函数是，会创建一个预先包含全局变量的对象的作用域链，这个作用域链保存在内部的`[[Scope]]`属性中。
当调用`compare()`函数是，会为函数创建一个执行环境，通过复制函数的`[[Scope]]`属性中的对象构建起执行环境的作用域链
其作用域中包含两个变量对象： 本地活动对象和全局变量对象
```js

function createComparisonFunction(propertyName) {
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}

var compare = createComparisonFunction("name");
var result = compare({ name: "Nicholas" }, { name: "Greg" });

```
当`createComparisonFunction()`函数返回后，其执行环境的作用域链会被销毁，它的活动对象仍然会留在内存中，直到匿名函数被销毁后，`createComparisonFunction()`的活动对象才会被销毁

```js
var compareName = createComparisonFunction('name');
var result = compareName({name: 'may'}, {name: 'liu'});
compareName = null; // 解除对匿名函数的引用
```
创建的比较函数被保存在变量`compareNames`中，而通过将`compareNames`设置为等于null接触该函数的引用，等于通知垃圾回收将其清除，随着匿名函数作用域被销毁，器作用域也都可以安全的销毁

闭包会携带包含他的函数的作用域，回避其他函数占用更多的内存

### 闭包与变量

闭包只能取得包含函数中任何变量的最后一个值

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
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
            result[i] = function(num){
                return function(){
                    return num;
            };
        }(i);
    }
    return result;
}
```

定义一个匿名函数，并将立即执行该匿名函数的结果赋值给数组。由于函数参数是按值传递，会将变量i的当前值赋值给参数num在这个匿名内部有创建并返回一个范围`num`的闭包，这样`result`每个函数都有自己`num`变量的一个副本，因此返回各自不同的数值

### 关于this对象

全局中 `this` 等于 `window`, 当函数被作为某个对象方法调用，`this`等于那个对象
匿名函数的执行环境具有全局性，this对象通常指向 `window`
```js
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
       };
    }
};
alert(object.getNameFunc()());  // "The Window"
```
为什么匿名函数没有取得其包含作用域的this?
 每个函数在被调用时都会自动取得两个特殊变量`this`和`arguments` 只会搜索到期活动对象为止，因此不可能直接访问外部函数中的这两个变量

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

console.log(object.getNameFunc()()); // 'My Object'
```

将this先存起来，在闭包以后再调用

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
第二种加上货号之后，好像引用一个函数，但是this的值得到了维持，因此定义相同
第三种赋值语句，语法的变化，改变了this的值

### 内存泄露

如果闭包的作用域中保存着一个 `html`元素，元素就无法被销毁

```js
function assignHandler() {
    var element = document.getElementById('someElement');
    element.onclick = function () {
        console.log(element.id);
    };
}
```

```js
function assignHandler(){
    var element = document.getElementById("someElement");
    var id = element.id;
    element.onclick = function(){
        alert(id);
    };
    element = null; // 取消引用，回收内存
}
```
以上代码创建了一个 `element`的闭包，闭包有创建了循环引用，只要匿名存在，引用至少1，内存无法回收

## 模仿块级作用域

js没有块级作用域的概念，在块语句中定义的变量，实际也包含函数中

匿名函数可以用来模仿块级作用域并避免这个问题


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

匿名函数可以用块级作用域来避免

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
减少闭包占用内存的问题，函数执行完毕就可以立即销毁器作用域链

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

```js
function Person(name){
    this.getName = function(){
        return name;
    };
    this.setName = function (value) {
        name = value;
    };
}
var person = new Person("Nicholas");
alert(person.getName()); //"Nicholas"
person.setName("Greg");
alert(person.getName()); //"Greg"
```

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
    MyObject = function () {  // 没有使用var关键字

    };
    // 公有/特权方法
    MyObject.prototype.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    }
})()
```
创建一个私有作用域，并在其中封装了一个构造函数及相应的方法
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

为单例创建私有变量和特权方法
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
