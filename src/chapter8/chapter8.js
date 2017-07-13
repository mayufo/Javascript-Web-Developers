var age = '28';
window.color = 'red';

delete window.age;
delete window.color;

console.log(window.age); // undefined
console.log(window.color); //undefined

var newValue = window.oldValue;
console.log(newValue);

var leftPos = (typeof window.screenLeft == 'number') ? window.screenLeft:window.screenX;
var topPos = (typeof window.screenTop == 'number') ?　window.screenTop:window.screenY;

console.log(leftPos, topPos,33);

var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;

if(typeof pageWidth != 'number') {
    if(document.compatMode == 'CSS1Compat') {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}

console.log(pageWidth, pageHeight);