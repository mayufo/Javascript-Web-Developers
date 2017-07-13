var div = document.getElementsByTagName('div')[0];

console.log(div.nodeType);
console.log(div.nodeName);

var ul = document.getElementsByTagName('ul')[0];

console.log(ul.childNodes[0]);
console.log(ul.childNodes.item(0));

console.log(ul.nextSibling,1); // text 回车
console.log(ul.previousElementSibling,2);  // <div>123</div>

var returnNode = ul.appendChild(ul.firstChild);
console.log(returnNode == ul.firstChild); // false
console.log(returnNode == ul.lastChild);  // true

returnedNode = ul.insertBefore(div, null);

console.log(document.documentElement);
console.log(document.childNodes[0]);


console.log(document.documentElement === document.firstChild);

console.log(document.body);

console.log(document.doctype);

document.title = 'may';

console.log(document.URL);
console.log(document.domain);
console.log(document.referrer);

var images = document.getElementsByTagName('img');

var myImage = images.namedItem('myImage');

console.log(myImage);

console.log(document.implementation.hasFeature('XML', '1.0'));

document.write("<div>" + 111 + "<\/div>");