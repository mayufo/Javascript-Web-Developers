var person = {};
Object.defineProperty(person, 'name', {
    writable: false,
    value: 'Nicholas'
})

var person1 = {};
Object.defineProperty(person1, 'name', {
    configurable: false,
    value: 'Nicholas1'
});


console.log(person.name);

var book = {
    _year: 2004,
    edition: 1
};

Object.defineProperty(book, 'year', {
    get: function () {
        return this._year;
    },
    set: function (newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});

book.year = 2005;
console.log(book.edition); //2

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
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
})

var descriptor = Object.getOwnPropertyDescriptor(book1, '_year');

console.log(descriptor.value);
console.log(descriptor.configurable);


function createPerson(name, age, job) {
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

console.log(person3.constructor == Person);

console.log(person3 instanceof Person);
console.log(person3 instanceof Object); //true

var person = new Person('may', '18', 'engineer');
person.sayName(); // 'may'

Person('pig', '29', 'Doctor');
window.sayName(); // 'pig'

var o = new Object();
Person.call(o, 'Kristen', 25, 'Nurse');
o.sayName(); // 'Kristen'

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName() {
    console.log(this.name);
}


function Person2() {

}

Person2.prototype.name = 'may';
Person2.prototype.age = 29;
Person2.prototype.sayName = function () {
    console.log(this.name)
};

var person11 = new Person2();
person11.sayName();

var person22 = new Person2();
person22.sayName();

console.log(Person2.prototype.constructor);  //Person2

console.log(Person2.prototype.isPrototypeOf(person11));
console.log(Person2.prototype.isPrototypeOf(person22));

console.log(Object.getPrototypeOf(person11) == Person2.prototype); //true
console.log(Object.getPrototypeOf(person11).name); //may

console.log(person11.name, 3);

person11.name = 'Lucy';

console.log(person11.name, 4);

delete person11.name;

console.log(person11.name, 5);

person22.name = 'Lily';

console.log(person11.hasOwnProperty('name'));
console.log(person22.hasOwnProperty('name'));


function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
}

person22.name = 'mm';

console.log(hasPrototypeProperty(person22, 'name')); // false

console.log(Object.keys(Person2.prototype)); // name, age, sayName

var p1 = new Person2();
p1.name = 'pig';
p1.age = 29;
console.log(Object.keys(p1));

console.log(Object.getOwnPropertyNames(Person2.prototype));


function Person4() {

}

Person4.prototype = {
    name: 'may1',
    age: 17
}

var friend = new Person4();

console.log(friend instanceof Object);
console.log(friend instanceof Person4);
console.log(friend.constructor == Person4);
console.log(friend.constructor == Object);

Object.defineProperty(Person4.prototype, 'constructor', {
    enumerable: false,
    value: Person4
});

function Person5() {
}
var friend = new Person5();

Person5.prototype.sayHi = function () {
    console.log('hi');
}

console.log(friend.sayHi());// hi

Person5.prototype = {
    constructor: Person5,
    name: 'may',
    age: 18,
    sayName: function () {
        console.log(this.name)
    }
};

// friend.sayName();

function Person6(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['may', 'emma']
}

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

if(typeof this.sayName != 'function') {
    Person.prototype.sayName = function () {
        console.log(this.name);
    }
}

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

function Person8(name, age, job) {
    var o = new Object();
    o.sayName = function () {
        console.log(name);
    }
    return o;
}

var friend8 = Person8('may8', 18, 'work');
friend8.sayName();


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

console.log(instance.getSuperValue());

console.log(instance instanceof Object);
console.log(instance instanceof SuperType);
console.log(instance instanceof LongType);

console.log(Object.prototype.isPrototypeOf(instance));
console.log(SuperType.prototype.isPrototypeOf(instance));
console.log(LongType.prototype.isPrototypeOf(instance));


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


function SuperType2() {
    this.colors = ['red', 'green']
}

function SubType2() {
    SuperType2.call(this);
}

var instances21 = new SubType2();
instances21.colors.push('pink')
console.log(instances21.colors);

var instances22 = new SubType2();
console.log(instances22.colors);


function SuperType3(name) {
    this.name = name;
    this.colors = ['red','green']
}

SuperType3.prototype.sayName = function () {
    console.log(this.name);
}

function SubType3(name, age) {
    SuperType3.call(this, name);
    this.age = age;
}

SubType3.prototype = new SuperType3()
SubType3.prototype.constructor = SubType3;
SubType3.prototype.sayAge = function () {
    console.log(this.age);
}
var instance31 = new SubType3('MAY', 18);
instance31.colors.push('pink');
console.log(instance31.colors);
instance31.sayName();
instance31.sayAge();


var instance32 = new SubType3('pig', 28);
console.log(instance32.colors);
instance32.sayName();
instance32.sayAge();

