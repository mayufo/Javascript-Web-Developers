// var div = document.getElementsByTagName('div')[0];
//
// console.log(div.nodeType);
// console.log(div.nodeName);
//
// var ul = document.getElementsByTagName('ul')[0];
//
// console.log(ul.childNodes[0]);
// console.log(ul.childNodes.item(0));
//
// console.log(ul.nextSibling,1); // text 回车
// console.log(ul.previousElementSibling,2);  // <div>123</div>
//
// var returnNode = ul.appendChild(ul.firstChild);
// console.log(returnNode == ul.firstChild); // false
// console.log(returnNode == ul.lastChild);  // true
//
// returnedNode = ul.insertBefore(div, null);
//
// console.log(document.documentElement);
// console.log(document.childNodes[0]);
//
//
// console.log(document.documentElement === document.firstChild);
//
// console.log(document.body);
//
// console.log(document.doctype);
//
// document.title = 'may';
//
// console.log(document.URL);
// console.log(document.domain);
// console.log(document.referrer);
//
// var images = document.getElementsByTagName('img');
//
// var myImage = images.namedItem('myImage');
//
// console.log(myImage);
//
// console.log(document.implementation.hasFeature('XML', '1.0'));
//
// document.write("<div>" + 111 + "<\/div>");
//
// console.log(ul.tagName);
// console.log(ul.nodeName);
//
// var div = document.getElementById('myDiv');
// console.log(div.id);
// console.log(div.title);
// console.log(div.lang);
// console.log(div.dir);
//
//
// console.log(div.getAttribute('id'));
// console.log(div.getAttribute('class'));
// console.log(div.getAttribute('title'));
// console.log(div.getAttribute('lang'));
// console.log(div.getAttribute('dir'));
// // div['data-may'] = true;
// console.log(div.getAttribute('data-may'));
//
// console.log(div['data-may']);
//
// div.mycolor = 'red';
// console.log(div.getAttribute('mycolor'));
//
// function outputAttributes(element) {
//     var paris = new Array(),
//         attrName,
//         attrValue,
//         i,
//         len;
//     for(var i = 0, len = element.attributes.length; i < len; i++) {
//         attrName = element.attributes[i].nodeName;
//         attrValue = element.attributes[i].nodeValue;
//         if (element.attributes[i].specified) {
//             paris.push(attrName + "=\"" + attrValue + "\"");
//         }
//     }
//     return paris.join(' ');
// }
//
// console.log(outputAttributes(div)); //id="myDiv" class="bd" title="Body text" lang="en" dir="ltr" data-may="true"
// var ul = document.getElementsByTagName('ul')[0];
//
// console.log(getChildNode(ul));
// function getChildNode(element) {
//     var node = 0;
//     for(var i = 0, len = element.childNodes.length; i < len; i++) {
//         console.log(element.childNodes[i]);
//         if(element.childNodes[i].nodeType == 1) {
//             node++;
//         }
//     }
//
//     return node;
// }
//
//
// var element = document.createElement('div');
// element.className = 'message';
//
// var textNode = document.createTextNode('hello world');
// element.appendChild(textNode);
//
// document.body.appendChild(element);

var element = document.createElement('div');
element.className = 'message';
var textNode = document.createTextNode('Hello world');
element.appendChild(textNode);

var anotherTextNode = document.createTextNode('Yippee');
element.appendChild(anotherTextNode);

document.body.appendChild(element);

console.log(element.childNodes.length);

element.normalize();

console.log(element.childNodes.length);

var comment = document.createComment('a comment');

console.log(document.doctype.name);

var fragment = document.createDocumentFragment();
var ul = document.getElementById('myList');
var li = null;
for (var i = 0; i < 3; i++) {
    li = document.createElement('li');
    li.appendChild(document.createTextNode('Item' + (i+1)));
    fragment.appendChild(li);
}

ul.appendChild(fragment);

console.log(fragment);

var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);
console.log(element.attributes["align"].value); //"left"
console.log(element.getAttributeNode("align").value); //"left"
console.log(element.getAttribute("align"));

function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex){
        script.text = code;
    }
    document.body.appendChild(script);
}

function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}

function loadStyleString(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    } catch (ex){
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}

var table = document.createElement('table');
table.border = 1;
table.width = '100%';

var tbody = document.createElement('tbody');
table.appendChild(tbody);

// 创建第一行
tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("Cell 2,1"));

// 创建第二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("Cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("Cell 2,2"));
