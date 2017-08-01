/**
 * Created by may on 2017/6/29.
 */

console.log(Number.MIN_VALUE);
console.log(Number.MAX_VALUE);
var message;

// console.log(1,message); // undefined
// console.log(1,age);  // 弹出错误

console.log(2, typeof message);  // undefined
console.log(2, typeof age)  // undefined

var car = null;
console.log(typeof car); // "object"
console.log(null == undefined, 2) // true

console.log(isNaN(NaN))  // true
console.log(isNaN(10))

console.log(Number('123blur'));
console.log(Number('0xA'));

console.log(parseInt('000001'))
console.log(parseInt('1234blur456'))

console.log(parseFloat('0.22.5'));

var text = "This is the letter sigma:";
console.log(text.length);

var num = 10;
var text11 = null
console.log(num.toString());  //'10'
console.log(num.toString(2));
console.log(num.toString(8));
console.log(num.toString(10));
console.log(num.toString(16));
console.log(text11.toString());

console.log(String(10));
console.log(String(true));
console.log(String(null));
console.log(String(undefined));

var num1 = '100';
var num2 = '2';
var num3 = 1.2;

console.log(--num1 + --num2);
console.log(--num3);

console.log(+true);
console.log(+'z');

console.log(-true);
console.log(-false);

var num4 = 25;
console.log(~num4);  // 26

if (~'mayufo'.indexOf('may')) {
    console.log(true);
}


var a = 1,
    b = 2;

console.log(a, b);

a ^= b;

b ^= a;

a ^= b;

console.log(a, b);
console.log( 25 & 3)

console.log( 25 | 3)

console.log(2 << 5);

console.log(64 >> 5);

console.log(-64 >> 5);
console.log(-64 >>> 5);

var found = false;

console.log(found && someValue);

console.log(['1', '2'] && ['3', '4']);
console.log(true && ['3', '4']);

console.log(0 * Infinity)
console.log('a' * Infinity);

console.log("==============");

console.log(0 / 0); // NaN
console.log(Infinity / Infinity); // NaN
console.log(Infinity / 0); // Infinity

console.log(Infinity / Infinity); // NaN
console.log(Infinity + -Infinity);

console.log('23' < '3'); //true

console.log('a' < 3); // false

console.log(455.34 | 0);

console.log((5, 1, 4, 0));

var i = 0;
do {
    i += 2;
} while (i < 0);
console.log(i);

for(var propName in window ) {
    document.write(propName + ' ');
}

var num5 = 0;
outermost:
    for (var i=0; i < 10; i++) {
        for (var j=0; j < 10; j++) {
            if (i == 5 && j == 5) {
                break outermost;
            }
            num5++;
        }
    }
console.log(num5);

var num6 = 0;

    for (var i=0; i < 10; i++) {
        for (var j=0; j < 10; j++) {
            if (i == 5 && j == 5) {
                break
            }
            num6++;
        }
    }
console.log(num6);