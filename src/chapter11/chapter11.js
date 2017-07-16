// var body = document.querySelector('body');
//
// var myDiv = document.querySelector('#myDiv');
//
// var selected = document.querySelector('.selected');
//
// var img = document.body.querySelector('img.button');
// // 选取某div中所有的em
// var ems = document.getElementById('myDiv').querySelectorAll('em');
//
// var selecteds = document.querySelectorAll('.selected');
//
// var strongs = document.querySelectorAll('p strong');

var ul = document.getElementsByTagName('ul')[0];

console.log(ul.childNodes);  //返回一个NodeLit
console.log(ul.childElementCount); // 3

console.log(ul.firstChild);  //#text
console.log(ul.firstElementChild); //li
console.log(ul.classList,11);
ul.classList.remove('user');
console.log(ul);
console.log(ul.classList,22);

ul.focus();

console.log(document.activeElement, ul);

console.log(document.charset);

console.log(ul.dataset['appid']);
//
// var text = "<a href=\"#\" onclick=\"alert('hi')\">Click Me</a>";
// var sanitized = window.toStaticHTML(text);
// console.log(sanitized)

// var divDemo = document.getElementById('demoDiv');
//
// document.divDemo[0].scrollIntoView();


console.log(document.documentMode);

console.log(document.documentElement.contains(document.body));

console.log(document.documentElement.compareDocumentPosition(document.body));  // 20

var div = document.getElementById('content');

console.log(div.innerText);

