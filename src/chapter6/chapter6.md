# 面向对象的程序设计

每一个对象都是基于一个引用类型创建的

## 理解对象

早期用的`Object`实例创建，现在更多使用字面量创建

### 属性类型

`数据属性`和`访问属性`

- 数据属性

**Configurable** 表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性，默认true
**Enumerable** 能否通过 `for-in`循环返回属性，默认true
**Writable** 能否修改属性的值，默认true
**Value** 这个属性的数据值

`Object.defineProperty()`修改属性默认的特性，接受三个参数属性所在的对象，属性的名字，一个描述符对象

```js
var person = {};
Object.defineProperty(person, 'name', {
    writable: false,
    value: 'Nicholas'
})

console.log(person.name); // Nicholas  修改属性为只读
```
把`configurable`设置为false表示不能从属性中删除属性，一旦把属性定义为不可配置的，就不能再把它定义回可配置的否则报错

调用 `Object.defineProperty()`方法如果不指定，默认是false

- 访问器属性

包含一对 `getter`和`setter`, 取值访问 `getter`,写入调用 `setter` 访问器有如下4个属性

**Configurable** 删除属性重新定义属性，能否修改，能否修改为数据属性
**Enumerable** 能否通过for-in循环
**Get** 读取属性
**Set** 写入属性

访问器也需要通过 `Object.defineProperty()`来定义

```js
Object.defineProperty(book, 'year', {
    get: function () {
        return this._year;
    },
    set: function (newValue) {
        if(newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});

book.year = 2005;
console.log(book.edition); //2
```
`_year`的下划线，用于表示只能通过对象方法访问的属性

不要在`getter`中尝试写，也不要在 `setter`中尝试读

`__defineGetter__()`和 `__defineSetter()__` 两个非标准的，用于创建访问属性

不支持 `Object.defineProperty()`方法的浏览器不能修改`Configurable`和`Enumerable`

### 定义多个属性

`Object.defineProperties()`

### 读取属性的特性

`Object.getOwnPropertyDescriptor()`取得给定属性的描述符，接受两个参数：属性所在对象和要读取其描述符的属性名称，返回一个对象，只能直接用于实例对象或者原型对象

```js
var book1 = {};

Object.defineProperties(book1, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function () {
            return this._year
        },
        set: function (newValue) {
            if(newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
})

var descriptor = Object.getOwnPropertyDescriptor(book1, '_year'); 

console.log(descriptor.value);// 2004
console.log(descriptor.configurable); // false

```

## 创建对象

### 工厂模式

```js
function createPerson (name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    }
    return o;
}

var person1 = createPerson('may', '18', 'engineer');
var person2 = createPerson('pig', '29', 'work');
```

### 构造函数模式

创建自定义的构造函数，从而定义自定义对象的属性和方法
```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    }
}

var person3 = new Person('may', '18', 'engineer');
var person4 = new Person('pig', '29', 'work');
```

如果是构造函数，函数名的第一个字母要大写

```js
console.log(person3.constructor == Person); //true
console.log(person3 instanceof Person); //true
console.log(person3 instanceof Object); //true
```

- 将构造函数当做函数

任何函数只要通过 `new`调用，就可以当做构造函数，

```js
// 构造函数使用
var person = new Person('may', '18', 'engineer');
person.sayName(); // 'may'

// 普通函数调用
Person('pig', '29', 'Doctor');
window.sayName(); // 'pig'

// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, 'Kristen', 25, 'Nurse');
o.sayName(); // 'Kristen'
```

不通过 `new`调用，属性和方法都添加到 `window`对象上

- 构造函数的问题

每个方法都要在每个实例重新创建一遍，不同实例上的同名函数是不相等的

```js
console.log(person1.sayName == person2.sayName()); //false
```

可以通过吧函数定义转移到构造函数外部来解决这个问题

```js

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName () {
    console.log(this.name);
}
```
### 原型模式

每个函数都有一个`prototype`属性是一个指针，指向一个对象，由特定类型的所有实例共享的属性和方法。

使用 `prototype`可以让所有对象实例共享它素包含的属性和方法

```js
function Person2() {

}

Person2.prototype.name = 'may';
Person2.prototype.age = 29;
Person2.prototype.sayName = function () {
    console.log(this.name)
};

var person11 = new Person2();
person11.sayName(); // 'may'

var person22 = new Person2();
person22.sayName(); // 'may'
```

构造函数成了空函数，仍可以通过构造函数创建新对象，新对象的属性和方法是由所有实例共享的

- 理解原型对象

只要创建一个新函数，函数创建一个 `prototype`属性，属性指向函数的原型对象
所有原型对象会自动获得一个 `constructor`属性，这个属性指向 `prototype`属性所在函数的指针。至于其他方法都是来自 `Object`

前面的例子中

```js
Person2.prototype.constructor //指向Person2
```

调用构造函数创建新实例的时候，该实例内部将包含一个指针，指向构造函数的原型对象

在众多浏览器上都支持一个属性 `__proto__` ,从而实现属性对脚本不可见

`prototype`存在于实例于构造函数的原型对象之间，而不是存在于实例于构造函数之间

![](images/jingtong_6.png)

`isPrototypeOf()`是否指向某个原始对象

```js
console.log(Person2.prototype.isPrototypeOf(person11)); // true
console.log(Person2.prototype.isPrototypeOf(person22)); // true
```

`Object.getPrototype` 返回 `[[prototype]]`的值

```js
console.log(Object.getPrototypeOf(person11) == Person2.prototype); //true
console.log(Object.getPrototypeOf(person11).name); //may
```

代码读取某个对象的属性时，搜索首先从实例对象本身开始，如果实例中找到具体名字的属性，返回改属性的值，如果没有，则继续搜索指针指向的原型对象。

`constructor`该属性也是共享，可以通过对象实例访问到,但是不能改写原型中的值

在实例中添加一个属性，该属性与原型中的一个属性同名，该属性就会屏蔽原型中的那个属性，它会组织我们访问原型中的属性而不会修改，如果想解除阻止，可以使用 `delete`删除实例中的属性

```js
console.log(person11.name, 3); //may

person11.name = 'Lucy';

console.log(person11.name, 4);// Lucy

delete person11.name;

console.log(person11.name, 5); // may
```

`hasOwnProperty()`可以检验一个属性是存在实例中还是原型中，在给定属性存在这个实例中返回true
```js
person22.name = 'Lily';
console.log(person11.hasOwnProperty('name')); // false 来自原型
console.log(person22.hasOwnProperty('name')); // true 来自实例
```

- 原型与`in`操作符

`in`操作符会在通过对象访问给定属性时返回true.无论是实例还是原型，返回的都是可枚举的（enumerated）

```js
function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
}

console.log(hasPrototypeProperty(person22, 'name')); // false
```

`hasPrototypeProperty()` 可以确定该属性有没有用原型中的属性, 即使原型中有这个属性，但是实例中也有这个属性，false 就是没有用

早期IE中有个bug,比如我们定义个`toString`方法，但是这个方法不会被 `for..in`返回，这是因为IE中默认原型的 `toString()`方法被打上了值为false的不可枚举标志

取得对象上所有可枚举的属性 `Object.keys()`，接收一个对象作为参数,得出顺序出现的结果

```js
console.log(Object.keys(Person2.prototype)); // 'name, age, sayName'
var p1 = new Person2();
p1.name = 'pig';
p1.age = 29;
console.log(Object.keys(p1)); // 'name,age'
```


`Object.getOwnPropertyName()`无论是否枚举，看所有实例属性
```js
console.log(Object.getOwnPropertyNames(Person2.prototype)); // 'constructor,name,age,sayName'
```

`Object.keys()`和 `Object.getOwnPropertyNames()`可以替代 `for-in`

- 更简单的原型语法

可以通过字面量的方法重写整个原型对象

```js
function Person4 () {}
Person4.prototype = {
    name: 'may1',
    age: 17
}
```
这样等于字面量形势创建新对象， `constructor`属性不会指向 `Person4`,尽管 `instanceof`操作还能返回正确的结果，但`constructor`是无法确定对象的类型

```js
console.log(friend instanceof Object); //true
console.log(friend instanceof Person4);//true
console.log(friend.constructor == Person4); //false
console.log(friend.constructor == Object);//true
```

因此如果用字面量，需要重设 `constructor`
```js
function Person4 () {}
Person4.prototype = {
    constructor:　Person4,
    name: 'may1',
    age: 17
}
```

字面量设置的 `constructor`属性的可枚举会被设置为`true`,原生情况是不可枚举的,应该如下设置

```js
Object.defineProperty(Person4.prototype, 'constructor', {
    enumerable: false,
    value: Person4
});
```

- 原型的动态性

```js
function Person5() {
}
var friend = new Person5();

Person5.prototype.sayHi = function () {
    console.log('hi');
}

console.log(friend.sayHi());// hi
```

实例与原型之间是松散关系，连接只是一个指针，随时为原型添加属性和方法，能够立即在实例对象上反应出来，如果调用构造函数时为实例添一个指向最初原始 `Prototype`指针，把原型修改为另外的对象，相当于切断与原型联系

```js
function Person5() {
}
var friend = new Person5();

Person5.prototype = {
    constructor: Person5,
    name: 'may',
    age: 18,
    sayName: function () {
        console.log(this.name)
    }
};
friend.sayName(); //error
```

实例中的指针只指向原型

![](images/jingtong_7.png)

- 原生对象的原型

通过原生对象的原型，不仅可以取得默认方法方法的引用，还可以定义新的方法（不推荐）

- 原生对象的问题

由于共享的本质，在实例上添加一个同名属性，可以隐藏原型中的对应属性

### 组合使用构造函数模式和原型模式

创建自定义类型最常见方式，组合使用构造函数与原型模式

```js

// 实例属性在构造函数定义
function Person6(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['may', 'emma']
}

// 共享属性 原型定义 
Person6.prototype = {
    constructor: Person,
    sayName: function () {
        console.log(this.name);
    }
}

var person61 = new Person6('lily', 18, 'work');
var person62 = new Person6('lucy', 19, 'doctor');

person61.friends.push('van')
console.log(person61.friends); // ['may', 'emma', 'van']
console.log(person62.friends);  // ['may', 'emma']
person61.sayName(); //lily
person62.sayName(); //lucy
```
因此 `friends`输出可以在不同的数组

### 动态原型模式

通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型
```js
if(typeof this.sayName != 'function') {
    Person.prototype.sayName = function () {
        console.log(this.name);
    }
}
```

除了使用 `typeof`还可以使用 `instanceof`

### 寄生构造函数模式

创建一个新对象，并以相应的属性和方法初始化对象，再返回对象
```js
function Person7(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    }

    return o;
}

var friend = new Person7('may', 18, 'work');
friend.sayName()
```

在特殊情况下使用，比如想创建有额外方法的特殊数组

返回的对象与构造函数或与构造函数的原型属性没有关系，构造函数返回的对象与构造函数外部创建的对象没有什么不同
不能依赖 `instanceof`操作符来确定对象类型 （不推荐使用）

### 稳妥构造函数模式

适应于安全的环境，防止数据被其他程序修改使用。不引用 `this`,不适用 `new`

```js
function Person8(name, age, job) {
    var o = new Object();
    o.sayName = function () {
        console.log(name);
    }
    return o;
}

var friend8 = Person8('may8', 18, 'work');
friend8.sayName();
```

除了 `sayName()`方法，没有其他办法访问到 `name`的值， `instanceof`操作符对这种对象也没有意义

## 继承

多数语言支持两种继承：接口继承和实现继承

接口继承是集成方法签名，实现继承继承实际的方法

ECMAScript只支持实现继承

### 原型链

利用原型让一个引用类型继承另一个引用类型的属性和方法

```js

function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
}

function LongType() {
    this.longProperty = false;
}

LongType.prototype = new SuperType();

LongType.prototype.getLongValue = function () {
    return this.longProperty
};

var instance = new LongType();

console.log(instance.getSuperValue()); // true
```

搜索步骤： 搜索实例 -> 搜索LongType.prototype -> 搜索SuperType

- 别忘记默认的原型

所有引用类型默认继承Object,而继承也是通过原型链实现的

![](images/jingtong_8.png)

- 确定原型和实例的关系

`instanceof`

```js
console.log(instance instanceof Object); //true
console.log(instance instanceof SuperType); // true
console.log(instance instanceof LongType); // true
```


`isPrototypeOf()` 是否指向某个原型

```js
console.log(Object.prototype.isPrototypeOf(instance));  //true
console.log(SuperType.prototype.isPrototypeOf(instance)); //true
console.log(LongType.prototype.isPrototypeOf(instance)); //true
```

- 谨慎定义方法

给原型添加方法，一定放在替换原型语句之前


```js

function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
}

function LongType() {
    this.longProperty = false;
}

LongType.prototype = new SuperType();

SuperType.prototype.getSuperValue = function() {  // 重写方法
  return false;
}

LongType.prototype.getLongValue = function () {
    return this.longProperty
};

var instance = new LongType();

console.log(instance.getSuperValue()); // false 
```

不能使用对象字面量创建原型方法，这样就重写了原型对象

```js
LongType.prototype = new SuperType();

// 使用字面量添加，会导致上一行代码无效
LongType.prototype = {
   someOtherMethod: function() {
     return false;
   }
}
```

- 原型链的问题

所有引用类型原型链都会实例共享

```js
function Color() {
    this.colors = ['red', 'green'];
}

function Other() {
}


Other.prototype = new Color();

var instance1 = new Other();
instance1.colors.push('pink');
console.log(instance1.colors); // ["red", "green", "pink"]

var instance2 = new Other();

console.log(instance2.colors,22); //["red", "green", "pink"]
```

创建子类型的实例时，不能向超类型的构造函数中传递参数

### 借用构造函数

在子类构造函数的内部调用超类型构造函数，通过 `apply`和 `call`

```js
function SuperType2() {
    this.colors = ['red', 'green']
}

function SubType2() {
    SuperType2.call(this);
}

var instances21 = new SubType2();
instances21.colors.push('pink')
console.log(instances21.colors); // ["red", "green", "pink"]

var instances22 = new SubType2();
console.log(instances22.colors); //["red", "green"]
```

- 传递参数

```js

function SubType(){
    SuperType.call(this, "Nicholas");    
    this.age = 29;
}
```

- 借用构造函数的问题

方法都构造函数中定义，函数复用无从谈起

### 组合继承

```js

function SuperType3(name) {
    this.name = name;
    this.colors = ['red','green']
}

SuperType3.prototype.sayName = function () {
    console.log(this.name);
}

function SubType3(name, age) {
    // 继承属性
    SuperType3.call(this, name);
    this.age = age;
}

// 继承方法
SubType3.prototype = new SuperType3()
SubType3.prototype.constructor = SubType3;
SubType3.prototype.sayAge = function () {
    console.log(this.age);
};


var instance31 = new SubType3('MAY', 18);
instance31.colors.push('pink');
console.log(instance31.colors); // ["red", "green", "pink"]
instance31.sayName(); // 'MAY'
instance31.sayAge(); // 18


var instance32 = new SubType3('pig', 28);
console.log(instance32.colors); // ["red", "green"]
instance32.sayName(); // 'pig'
instance32.sayAge(); // 28
```

可以使用 `instanceof()`和 `isPrototypeOf()`

### 原型式继承

借助原型可以基于已有的对象创建新对象

```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
```

先创建一个临时构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的实例

```js
var person = {
    name: 'may',
    friends: ['pig', 'wuqian', 'shujun']
};

var anotherPerson = object(person);
anotherPerson.name = 'may';
anotherPerson.friends.push('renqian');
var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'may';
yetAnotherPerson.friends.push('chenfang');

console.log(person.friends); // ['pig', 'wuqian', 'shujun', 'renqian', 'chenfang']
```

ECMAScript5 新增 `Object.create()`规范了原型式继承，接收两个参数，一个是作为新对象原型的对象和新对象定义额外属性的对象

```js
var person = {
    name: 'may',
    friends: ['pig', 'wuqian', 'shujun']
};

var anotherPerson = Object.create(person);
anotherPerson.name = 'may';
anotherPerson.friends.push('renqian');
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = 'may';
yetAnotherPerson.friends.push('chenfang');

console.log(person.friends); // ['pig', 'wuqian', 'shujun', 'renqian', 'chenfang']
```

第二个参数和 `object.defineProperties()`方法的参数相同，会覆盖原型对象上同名属性

```js
var anotherPerson = Object.create(person5, {
    name: {
        value: 'Greg'
    }
});

console.log(anotherPerson.name); // 'greg'
```

### 寄生式继承

创建一个仅用于封装继承过程的函数

```js
function createAnother(original) {
    var clone = object(original);
    clone.sayHi = function () {
        console.log('hi');
    };
    return clone;
}

var person6 = {
    name: 'may',
    friends: ['pig', 'wuqian', 'shujun']
};

var anotherPerson6 = createAnother(person6);
anotherPerson6.sayHi();  // 'hi'
```

基于 `person6`返回一个新对象 `anotherPerson`,新对象不仅有 `person6`的属性和方法，还有自己的 `sayHi()`方法

寄生式继承为对象添加函数，会由于做不到函数复用而降低效率


### 寄生组合是继承 (推荐)

组合继承会调用两次超类型结构函数

```js
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
};
function SubType(name, age){
    SuperType.call(this, name); //第二次调用 SuperType()
    this.age = age;
}
SubType.prototype = new SuperType(); //第一次调用 SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    console.log(this.age);
};
```

第二次调用就屏蔽了原型中的同名属性
寄生组合的思想是不必为制定子类型而调用超类型的构造函数，我们需要的是超类的一个副本而已

使用寄生式继承来继承超类的原型，然后将结构制定个子类的原型

```js
function inheritPrototype(subType, superType){
    var prototype = Object(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 制定对象
}
```

```js
function SuperType7(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType7.prototype.sayName = function(){
    console.log(this.name);
};
function SubType7(name, age){
    SuperType7.call(this, name);
    this.age = age;
}
inheritPrototype(SubType7, SuperType7);
SubType7.prototype.sayAge = function(){
    console.log(this.age);
};

var ins = new SubType7('may', 18);

ins.sayAge()  // 18
console.log(ins.colors); // ["red", "blue", "green"]
```




