# 高级技巧

##高级函数

### 安全的类型检测

js内置的类型检查机制并非完全可靠，`typeof`操作符在Safari上对正则应用返回`function`

`instanceof` 操作符存在多个全局作用域的情况

```js
var isArray = value instanceof Array;  // Array构造函数必须在同个全局作用域中
```

任何值调用`Object`原生的`toString()`方法，都会返回一个[object NativeConstructorName]格式的字符串，每一个类在内部都有一个[[Class]]属性，这个属性中就指定了格式的字符串

```js
console.log(Object.prototype.toString().call(value)); //'[object Array]'
```
原生的数组构造函数与全局作用域无关，也可以用这一思路，创建如下函数

```js
function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]'
}
```

```js
function isFunction(value) {
    return Object.prototype.toString.call(value) == '[object Function]'
}
```

```js
function isRegExp(value) {
    return Object.prototype.toString.call(value) == '[object RegExp]'
}
```

`Object.prototpye.toString()`本身可能会被修改，假设的是没有被修改过的

### 作用域安全的构造函数

当使用`new`调用时，构造函数内用到this对象会指向新创建的对象实例

而没有用的this,会指向全局对象window上

作用域安全的构造函数在进行任何更改前，要确认this对象是正确的类型实例，如果不是，会创建新的实例并返回

```js
function PersonO(name, age, job) {
    if(this instanceof PersonO) {
        this.name = name;
        this.age = age;
        this.job = job;
    } else {
        return new Person(name, age, job);
    }
}
```
这样避免了全局对象上的意外设置属性，锁定了构造函数的环境

```js
function Polygon(sides) {
    if (this instanceof Polygon) {
        this.sides = sides;
        this.getArea = function() {
            return 0
        }
    } else {
        return new Polygon(sides)
    }
}

function Rectangle(width, height){
    Polygon.call(this, 2);
    this.width = width;
    this.height = height;
    this.getArea = function(){
        return this.width * this.height;
    };
}

Rectangle.prototype = new Polygon(); // 使用原型链或者寄生组合解决

var rect = new Rectangle(5, 10);
console.log(rect.sides); // undefined
```
this对象并非Polygon的实例，会创建并返回一个新的Polygon对象

### 惰性载入函数

由于浏览的差异，js代码包含了大量if语句

```js
function createXHR(){
    if (typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined"){
        if (typeof arguments.callee.activeXString != "string"){
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"],
                i,len;
            for (i=0,len=versions.length; i < len; i++){
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex){

                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}
```

而每次调用createXHR都会调用，会降低效率，可以使用惰性载入表示函数执行的分支仅会发生一次

第一种是在函数被调用的第一次处理函数

```js
function createXHR() {
    if (typeof XMLHttpRequest != "undefined"){
        createXHR = function(){
            return new XMLHttpRequest();
        }
    }  else if (typeof ActiveXObject != "undefined"){
        createXHR = function(){
            if (typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;
                for (i=0,len=versions.length; i < len; i++){
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex){
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        createXHR = function(){
            throw new Error("No XHR object available.");
        };
    }
    return createXHR();
}
```

第二章在声明函数的时候就制定适当的函数

```js
var createXHR = (function(){
    if (typeof XMLHttpRequest != "undefined"){
        return function(){
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != "undefined"){
        return function(){
            if (typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;
                for (i=0,len=versions.length; i < len; i++){
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex){

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        return function(){
            throw new Error("No XHR object available.");
        };
    }
})();

```

### 函数的绑定

函数绑定要创建一个函数，可以在特定的this环境中以制定参数调用另一个函数

```js
var handler = {
    message: 'Event handled',
    handleClick: function (event) {
        console.log(this.message);
    }
}
var btn = document.getElementById("my-btn");  //undefined 没有保存在handler.handleClick环境中，this指向非handler
EventUtil.addHandler(btn, "click", handler.handleClick);  // 使用闭包来修正
EventUtil.addHandler(btn, 'click', function (event) {
    handler.handleClick(event)
})
```

`bind()`函数接受一个函数和一个环境，并返回一个给定环境中调用给定函数的函数
```js
function bind(fn, context) {
    return function () {
        return fn.apply(context, arguments);
    }
}
```

```js
EventUtil.addHandler(btn, 'click', bind(handler.handleClick, handler)) // 使用我们自定义的bind函数实现绑定this
EventUtil.addHandler(btn, 'click', handler.handleClick.bind(handler)) // 使用ECMA5提供的原生bind方法
```

### 函数柯里化

用于创建已经设置好了一个或多个参数的函数，函数柯里化的基本方法和绑定函数一样，使用一个闭包返回函数。两者的区别在于当函数被调用时，返回函数还需要设置的一些传入的参数

```js
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);  //5
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments); // 12
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs)
    }
}
```

curry()函数的主要工作就是将被返回的函数参数进行排序

```js
var num = curry(add, 5)
console.log(num(12));  // 17

function add(num1, num2) {
    return num1 + num2
}
```

用柯里化构造bind函数

```js
function bind(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        var innerArg = Array.prototype.slice.call(arguments);
        var finalArg = args.concat(innerArg);
        return fn.apply(context, finalArg)
    }
}
```

```js
var handler = {
    message: "Event handled",
    handleClick: function(name, event){
        console.log(this.message + ":"+ name + ":"+ event.type);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler, "my-btn")); // 自己封装的bind方法
EventUtil.addHandler(btn, "click", handler.handleClick.bind(handler, "my-btn")); //ECMA提供的方法
```

## 防篡改对象

防止开发人员重写原生对象

### 不可扩展对象

`Object.preventExtensions()`不能再给对象添加属性和方法

```js
var person = {name:'Nicholas'}
Object.preventExtensions(person);

person.age = 29;
console.log(person.age); // undefined
```

`Object.istExtensible()`确定对象是否可以扩展,可以是true,不可以false

### 密封的对象

`Object.seal()`不可扩展且将`Configurable`特性设置为`false`,不能删除属性和放啊。可以使用`Object.defineProperty()`把数据属性修改为对象器属性`(get/set)`,属性值可以修改

```js
var person2 = {name:'Nicholas'};
Object.seal(person2);
person2.name = 'may';
console.log(person2.name); // 'may'

delete person2.name;
console.log(person2.name); // 'may'
```

`Object.isSealed()`方法可以确定对象是否被密封了

### 冻结对象

`Object.fressze()`对象不可扩展、密封且对象的数据属性Writable被设置为false,访问器属性（get/set）仍然可写

```js
var person3 = {name:'Nicholas'};

Object.freeze(person3);

person3.age = 29;
console.log(person3.age); // undefined

delete person3.name;

console.log(person3.name); // 'Nicholas'
```

`Object.isFrozen`方法用于检测冻结对象

### 高级定时器

js是运行在单线程的环境中，定时器仅仅只计划代码在未来某个时间执行
js没有任何代码是立即执行，但一旦进程空闲则尽快执行

设置一个150ms后执行的定制器不代表150ms后代码就立刻执行，表示代码会在150ms后被加入队列中，指定的时间间隔表示何时将定时器的代码添加到队列，而不是何时执行代码

### 重复的定时器

`setInterval()`创建的定时器确保了定时器代码规则的插入队列中，在使用的时候，当没有改定时器的任何其他代码实例的时候，才能将定时器代码添加到队列中，确保定时器代码插入队列中的最小事件间隔为制定间隔

重复定时器的规则有两个问题

- 某些间隔会被跳过
- 多个定时器的代码执行之间的间隔可能会比预期的小

可以使用链式`setTimeout`

```js
setTimeout(function () {
    setTimeout(arguments.callee, interval)
}, interval)
```

主要用于重复的定时器

```js
setTimeout(function() {
  var div = document.getElementById("myDiv");
  var left = parseInt(div.style.left) + 5;
  div.style.left = left + 'px';
  if(left < 200) {
      setTimeout(arguments.callee, 50)
  }
}, 50)
```

定时器代码执行的时候将一个div元素向右移动，坐标在200像素停止

### Yielding Processes

js都被分配一个确定数量的资源，放置恶意的程序搞挂浏览器，如果代码运行超过特定的事件或者特定的语言数量，就会弹出浏览器错误的对话框，告诉用户某个脚本执行过长是否停止

js执行是一个阻塞操作，脚本花费事件越久，用户无法与页面交互的时间就越久

在展开长时间循环之前考虑

- 处理是否必须同步完成 
如果会造成其他阻塞，不用改动，如果否，可以推迟处理

- 程序是否必须顺序执行
如果顺序不是很重要，可以推迟

推迟操作可以使用定时器分割这个循环，也叫数组分块技术

```js
setTimeout(function() {
  var item = array.shift();
  process(item);
  
  if(array.length > 0) {
      setTimeout(arguments.callee, 100)
  }
})
```

还可以使用以下函数

```js
function chunk(array, process, context) {
  setTimeout(function() {
    var item = array.shift();
    process.call(context, item);
    if(array.length > 0) {
        setTimeout(arguments.callee, 100)
    }
  }, 100)
}
```

`chunk()`接收三个参数：要处理的项目的数组，用于处理项目的函数，运行该函数的环境

如果你想保持原数组不变可以克隆一份数组传递给`chunk`

```js
chunk(data.concat(), printValue)
```

### 函数节流

DOM操作比起非DOM需要更多的内存和CPU时间
如果尝试过多的DOM相关操作会导致浏览器挂起
可以使用定时器对函数节流

思想：某些代码不可以在没有间断的情况下重复执行，第一次调用函数创建一个定时器，在制定的事件间隔之后运行代码。第二次调用该函数时，会清除前一次的定时器并设置另一个。
如果前一个定时器已经执行过了，操作没有意义
如果前一个定时器没有执行，将其替换为一个新的定时器

```js
var processor = {
    timeoutId: null,
    performProcessing: function () {
        // 实际执行的代码
    },
    process: function () {
        clearTimeout(this.timeoutId);
        var that = this;
        this.timeoutId = setTimeout(function () {
            that.performProcessing();
        }, 100)
    }
}

processor.process();
```
创建一个`processor`对象,对象由两个方法`process()`和`performProcessing()`
前者是初始化任何处理函数必须调用，后者实际进行完成的处理
当调用`process`后清除timeoutId来阻止之前的调用被执行，然后创建一个新的定时器调用`performProcessing`

这个模式可以使用`throttle`函数来简化

```js
function throttle(method, context) {
  clearTimeout(method.tId);
  method.tIdprocess = setTimeout(function() {
    method.call(context);
  }, 100)
}
```

举个例子

```js
function throttle(method, context) {
    clearTimeout(method.tId);
    method.tIdprocess = setTimeout(function() {
        method.call(context);
    }, 100)
}

function resizeDiv(){
    var div = document.getElementById("myDiv");
    div.style.height = div.offsetWidth + "px";
}


window.onresize = function(){
    throttle(resizeDiv);
}
```

代码周期性执行，不影响执行的速率

### 自定义事件

```js
function EventTarget() {
    this.handlers = {}
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function(type, handler){
        if (typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function(event){
        if (!event.target){
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for (var i=0, len=handlers.length; i < len; i++){
                handlers[i](event);
            }
        }
    },
    removedHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for (var i=0, len=handlers.length; i < len; i++){
                if (handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
}
```

`EventTarget`类型有一个单独的属性`handlers`,用于储存处理程序,还有三个方法: 
`addHandler`用于注册给定类型事件的事件处理程序，接收两个参数，事件类型和用于处理该事件的函数
`fire`用于触发一个事件，调用fire函数，接收一个单独的参数，至少包含type属性的对象，event还需要额外的信息由你决定
`removeHandler`用于注销某个事件类型的处理程序

```js
function handleMessage(event) {
    console.log('Message received' + event.message);
}
// 创建一个新对象
var target = new EventTarget();
// 添加事件处理程序
target.addHandler('message', handleMessage);
// 触发事件
target.fire({type: 'message', message: 'hello world'});
// 删除事件处理程序
target.removedHandler('message', handleMessage)
```

举个例子

```js
function inheritPrototype(subType, superType){
    var prototype = Object(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 制定对象
}

function Person(name, age){
    EventTarget.call(this);
    this.name = name;
    this.age = age;
}
inheritPrototype(Person,EventTarget);


Person.prototype.say = function(message){
    this.fire({type: "message", message: message});
};

function handleMessage(event){
    alert(event.target.name + " says: " + event.message);
}

var person = new Person('may', 18);
person.addHandler('message', handleMessage);
person.say('hi there')
```

## 拖放

```js
var DragDrop = function(){

    var dragging = null,
        diffX = 0,
        diffY = 0;

    function handleEvent(event){

        //get event and target
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        //determine the type of event
        switch(event.type){
            case "mousedown":
                if (target.className.indexOf("draggable") > -1){
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                }
                break;

            case "mousemove":
                if (dragging !== null){

                    //assign location
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                }
                break;

            case "mouseup":
                dragging = null;
                break;
        }
    };

    //public interface
    return {
        enable: function(){
            EventUtil.addHandler(document, "mousedown", handleEvent);
            EventUtil.addHandler(document, "mousemove", handleEvent);
            EventUtil.addHandler(document, "mouseup", handleEvent);
        },

        disable: function(){
            EventUtil.removeHandler(document, "mousedown", handleEvent);
            EventUtil.removeHandler(document, "mousemove", handleEvent);
            EventUtil.removeHandler(document, "mouseup", handleEvent);
        }
    }
}();

```

`dragging`不为null时，就知道正在拖动某个东西

DragDrop有两个公共方法`enable`和`disable`，添加和删除所有的事件处理程序

### 添加自定义事件

