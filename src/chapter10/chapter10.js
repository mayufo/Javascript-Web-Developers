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

console.log(ul.tagName);
console.log(ul.nodeName);

var div = document.getElementById('myDiv');
console.log(div.id);
console.log(div.title);
console.log(div.lang);
console.log(div.dir);


console.log(div.getAttribute('id'));
console.log(div.getAttribute('class'));
console.log(div.getAttribute('title'));
console.log(div.getAttribute('lang'));
console.log(div.getAttribute('dir'));
// div['data-may'] = true;
console.log(div.getAttribute('data-may'));

console.log(div['data-may']);

div.mycolor = 'red';
console.log(div.getAttribute('mycolor'));

function outputAttributes(element) {
    var paris = new Array(),
        attrName,
        attrValue,
        i,
        len;
    for(var i = 0, len = element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        if (element.attributes[i].specified) {
            paris.push(attrName + "=\"" + attrValue + "\"");
        }
    }
    return paris.join(' ');
}

console.log(outputAttributes(div)); //id="myDiv" class="bd" title="Body text" lang="en" dir="ltr" data-may="true"