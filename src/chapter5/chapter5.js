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