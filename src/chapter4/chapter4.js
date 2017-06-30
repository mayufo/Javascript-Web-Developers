function addTen(num) {
    num += 10;
    return num;
}
var count = 20;
var result = addTen(count);
console.log(result); // 30
console.log(count); // 20

function setName(obj) {
    obj.name = 'mayufo';
}

var person = new Object();
person.name = 'may';

setName(person);

console.log(person.name); //mayufo

function setName(obj) {
    obj.name = 'mayufo';
    obj = new Object();
    obj.name = "zhang"
}

var person = new Object();
person.name = 'may';

setName(person);

console.log(person.name); //mayufo

person