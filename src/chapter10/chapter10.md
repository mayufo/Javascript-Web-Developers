# DOM

`DOM`描绘了一个层次化的节点数，允许开发人员添加、移除和修改页面的某一部分
IE中所有的 `DOM`对象都是以 `COM`对象的形式实现的与原生的`js`随想行为或者活动特点并不一致

## 节点层次

`DOM`可以将任何HTML或XML文档描绘成一个有多层节点构成的结构，文档节点是每个文档的跟节点即 `<html>`元素，叫文档元素

HTML页面的文档元素始终都是 `<html>`,而XML在，任何元素都可以成为文档元素

一共12种节点类型，类型都继承自一个基类

### Node类型

每个节点都有 `nodeType`属性



节点类型 | 描述
----|------
1 Element | 元素  
2 Attr | 代表属性  
3 Text | 元素或者属性中的文本内容
4 CDATASection |  代表文档中的 CDATA 部分
5 EntityReference | 实体引用
6 Entity | 实体
7 ProcessingInstruction | 指令
8 Comment | 注释
9 Document |　代表整个文档
10  DocumentType |　文档定义的实体提供接口
11  DocumentFragment | 轻量级的Document对象，能够容纳文档的某个部门
12 Notation | DTD中声明的符号

- nodeName 和 nodeValue属性
```js
var div = document.getElementsByTagName('div')[0];

console.log(div.nodeType); // 1
console.log(div.nodeName); // DIV
```

- 节点关系

`childNodes`每个节点都有这个属性保存着`NodeList`对象， `Nodelist`是一种类数组对象，用于保存一组有序的节点，对象由`length`属性
`childNodes`在不同浏览器生成的类数组内容不一致，不建议使用

```js
var ul = document.getElementsByTagName('ul')[0];
//以下两种表达都一样
console.log(ul.childNodes[0]);
console.log(ul.childNodes.item(0)); 
```
由于 `childNodes`是类数组可以采取如下操作转换为数组

```js
var arrayOfNodes = Array.prototype.slice.call(0, someNode.childNodes);
```
IE8早期的NodeList实现为一个COM对象，而不能像js对象那样使用

`parentNode`指向文档树中的父节点
`previousSibling`和`nextSibling`属性可以访问同意列表中的其他属性

```html
<div>123</div>
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

```js
console.log(ul.nextSibling,1); // text 回车
console.log(ul.previousElementSibling,2);  // <div>123</div>
```

如果列表中只有一个节点，`nextSibling`和`previousSibling`都为null
父节点的`someNode.firstChild`等于`someNode.childNode[0]`,`someNode.lastChild` 等于`someNode.childNode[someNode.childNodes.length - 1]`


![](images/jingtong_17.png)

`hasChildNodes()`节点是否包含一个或者多个子节点的情况，返回true
`ownerDocument`指向整个文档的文档节点，返回某元素的根元素

- 操作节点

`appendChild()`用于向childNodes列表末尾添加一个节点，返回新增节点

```js
var returnedNode = someNode.appendChild(newChild);
console.log(returnedNode == newChild); // true
console.log(someNode.lastChild == newChild); // true
```
如果`appendChild`中的节点是文档的一部分，那结果就该从原来的位置移到新位置
```js
var returnNode = ul.appendChild(ul.firstChild);
console.log(returnNode == ul.firstChild); // false
console.log(returnNode == ul.lastChild);  // true
```

- insertBefore插入某个特定的位置，接收两个参数要插入的节点和作为参照物的节点

```js
// 没有第二个参数插入成为最后一个子节点
var returnedNode = someNode.insertBefore(newNode, null);
console.log(newNode == returnedNode); // true

// 插入后成为第一个子节点
var returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
console.log(returnedNode == newNode); // true
console.log(someNode.firstChild == returnedNode) // true
// 插入在最后一个子节点前面
var returnedNode = someNode.insertBefore(newNode, someNode.lastChild);
console.log(returnedNode = someNode.childNodes[someNode.childNodes.length -2]); // true
```

`replaceChild()`替换节点，接受两个参数，要插入的节点和要替换的节点

```js
// 替换第一个子节点
var returnedNode = someNode.replaceChild(newNode, someNode.firstChild);
```

`remveChild()` 移除节点，接受一个参数

```js
// 移除第一个子节点
var formerFirstChild = someNode.removeChild(someNode.firstChild);
```

- 其他方法

`cloneNode()`创建调用这个方法，生成完全相同的副本，接受一个布尔参数 `true`是深拷贝（会复制真个节点数），false是浅拷贝（自复制节点本身）
复制后如果没有指定父节点，这个节点就会成为孤儿

`cloneNode()`方法不会复制添加DOM节点中的js属性，如事件处理程序

`normalize()` 处理文档树中的文本节点，移除空的文本节点，并连接相邻的文本节点
通过 `createTextNode`创建的文本再插入段落，显示会一行一行的，可以通过`element.normalize()` 来进行格式化

> 参考 http://www.w3school.com.cn/tiy/t.asp?f=jsref_node_normalize

### Document类型

nodeType: 9
nodeName: '#document'
nodeValue:　null
parentNode： null
ownerDocument: null
子节点可能是 `DocumentType`、`Element`等等

- 文档的子节点

`documentElement`始终指向HTML页面的 `<html>`元素
`childNodes`列表访问文档元素

```js
console.log(document.documentElement); // 取得对<html>的引用
console.log(document.childNodes[1]); // 取得对<html>的引用 0 是 <!DOCTYPE html>
```

`body`属性，指向`<body>`元素

```js
console.log(document.body); 
```

`doctype` 获取`doctype`属性,由于浏览器对 `document.doctype`支持不一致，属性用处很有限

```js
console.log(document.doctype); // <!DOCTYPE html>
```

- 文档信息

`title`修改浏览器窗口标题

```js
document.title = 'may'; // 可以修改浏览器窗口标题
```

`URL` 浏览器显示的地址
`domain` 页面域名
`referrer` 属性中保存着链接到当前页面的URL
```js
//http://www.wrox.com/WileyCDA/
console.log(document.URL);  // http://www.wrox.com/WileyCDA/
console.log(document.domain); // www.wrox.com/
console.log(document.referrer);
```
这三个属性只有`domain`是可以设置的，出于安全，例如域名为 p2p.wrox.com可以将domain设置为 wrox.com, 不能设置为不包含在URL中的域

`domain`设置后，不能再设置回去，否则出错

- 查找元素 
`getElementById()` 如果没有找到返回null,如果多个id,只返回第一个，低版本IE对表单元素的 `name`也可以匹配这个方法
`getElementByTagName()` 接收一个参数，元素的标签名，返回0或者多个NodeList,文档中返回一个 `HTMLCollection`对象


`nameItem()`在 `HTMLCollection`通过`name`特性取得集合中的项

```js
var images = document.getElementsByTagName('img');
var myImage = images.namedItem('myImage');
console.log(myImage);
```

`HTMLCollection`中数值索引用 `item()`,字符串索引用`namedItem()`

`getElementsByName()` 返回带有 `name`特性的所有元素，也返回一个 `HTMLCollection`对象

- 特殊集合

`document.anchors` 文档中带有name特性的`<a>`元素
`ddocument.forms` 包含文档中所有 `<form>`元素 `document.getElementsByTagName('form')`相同
`document.images` 包含文档中所有 `<img>`元素 `document.getElementsByTagName('img')`相同
`document.link` 包含所有带 `href`特性的`<a>`元素

- DOM一致性检测

`hasFeature()`检测浏览器实现那些DOM,接收功能名称和版本号

```js
console.log(document.implementation.hasFeature('XML', '1.0')); // true
```
这种发放也不能完全检验，最好好事使用能力检测

- 文档写入

`write()` 会原样写入
`writeln()` 会在字符串的末尾添加一个换行符（\n）
`open()`
`close()`

```js
document.write("<div>" + 111 + "<\/div>");
```
为避免问题，可以在闭合标签加转义字符 `\`

方法 `open()`和 `close()`分别用于打开和关闭网页的输出

###  Element类型

`nodeType`: 1
`nodeName` 元素的标签名
`nodeValue` null
`parentNode` 可能是Document 或 Element
 其他节点可能是 Element、Text、Comment等等
 
 `nodeName`和 `tagName`返回元素的标签名
```js
console.log(ul.tagName);   // UL
console.log(ul.nodeName); //UL
```

输出都都是大写，比较的时候
```js
if(element.tagName.toLowerCase() == 'div') {
    console.log(true);
}
```

- HTML元素

HTML都由`HTMLElement`类型表示，不是直接通过这个类型,而是具体的子类型表示

`id` 文档中唯一标识符
`title` 一般通过工具条小时出来
`lang` 元素内容的代码语言
`dir` 语言方向`ltr` or `rtl`
`className` 与元素的`class`特性对应

```js
var div = document.getElementById('myDiv');
console.log(div.id);
console.log(div.title);
console.log(div.lang);
console.log(div.dir);
```

- 取得特性

`getAttribute（）` 特性名与实际的特姓名相同，也可以去自定义特性,自定义的最好加前缀`data-`


```html
<div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr" data-may="true"></div>

```

```js
var div = document.getElementById('myDiv');
console.log(div.getAttribute('id'));
console.log(div.getAttribute('class'));
console.log(div.getAttribute('title'));
console.log(div.getAttribute('lang'));
console.log(div.getAttribute('dir'));
console.log(div.getAttribute('data-may')); //true
```

也可以通过`DOM`元素本身来访问`div.id`、`div.title`但是自定义的特性访问`div['data-may'']`只会是 `undefined`，自定义的特性也不会改变元素的属性

`getAttribute()`返回值并不相同第一类是`style`，返回一个对象第二类是`事件处理程序`类似`onclick`属性，返回一个函数

- 设置特性
`setAttribute()` 接受两个参数，要设置的特性名和值
```js
div.setAttribute('id', 'someOtherId')
```

通过这个方法设置的特性名统一都会转为小写形式

自定义的属性不会改变元素的特性
```js
div.mycolor = 'red';
console.log(div.getAttribute('mycolor')); //null
```

推荐使用属性来设置特性

`removeAttribute()`彻底删除元素的特性

```js
div.removeAttribute('class');
```

- attributes属性

`attributes`唯一一个DOM节点类型，包含 `NameNodeMap`与 `NodeList`类似，元素的每个特性都有 `Attr`节点表示，每个节点都保存在 `NamedNodeMap`对象中

`getNamedItem(name)` 返回`nodeName`属性的name节点
`removeNamedItem(name)` 移除列表 `nodeName`属性为 name的节点,返回被删除的特性
`setNamedItem(node)` 向列表中添加节点，以节点的`nodeName`属性为索引
`item(pos)`数字pos位置处的节点

```js
var id = element.attributes.getNamedItem('id').nodeValue;
var id = element.attributes['id'].nodeValue;
```
删除一个特性
```js
var oldAttr = element.attributes.removeNamedItem('id');
```
添加一个特性
```js
element.attributes.setNamedItem(newAttr);
```

`attribute`的方法不够方便，如果对于遍历元素的特性，可以用该属性

```js
function outputAttributes(element) {
    var paris = new Array(),
        attrName,
        attrValue,
        i,
        len;
    for(var i = 0, len = element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        //IE7早版本存在特性节点有个 `specified`的属性，这个属性为true,以为指定相应的特性
        if (element.attributes[i].specified) { 
            paris.push(attrName + "=\"" + attrValue + "\"");
        }
    }
    return paris.join(' ');
}

console.log(outputAttributes(div)); //id="myDiv" class="bd" title="Body text" lang="en" dir="ltr" data-may="true"
```

- 创建元素
在创建的同事，也设置了 `ownerDocument`(根元素)，要把新元素添加到文档树中，浏览器才能呈现出来
```js
var div = document.createElement('div');
```
另一种创建,不推荐使用，只在更早期版本IE7的版本中使用

```js
var div = document.createElement('<div id=\'myNewDiv\' cladd=\'box\'> ')
```

- 元素的子节点

如果想通过 `childNode`遍历子节点，可以判断下 `nodeType`再执行某些操作

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3
        <ul>
            <li>4</li>
            <li>5</li>

        </ul>
    </li>
</ul>
```

```js
var ul = document.getElementsByTagName('ul')[0];

console.log(getChildNode(ul)); // 3
function getChildNode(element) {
    var node = 0;
    for(var i = 0, len = element.childNodes.length; i < len; i++) {
        console.log(element.childNodes[i]);
        if(element.childNodes[i].nodeType == 1) {
            node++;
        }
    }

    return node;
}
```

如果想去的某些特定的标签，可以用`getElementsByTagName()`

### Text 类型

`nodeType` 3
`nodeName` '#text'
`nodeValue` 节点的文本
`parentNode` 一个Element
没有子节点
可以通过`nodeValue`属性或`data`属性访问`Text`节点的文本
`appendData(text)` 将text添加到尾部
`deleteData(offset, count)`从offset指定位置开始删除count个字符
`insertData(offset, text)`在offset位置插入text
`replaceData(offset, count, text)` 从text替换offset位置到offset+count为止的文本

文本节点还有一个`length`属性

- 创建文本节点

在创建新文本节点的同事，会为其设置 `ownerDocument`属性，除非把新节点添加到文档树中，否则不会再浏览器显示
```js
var textNode = document.createTextNode('<strong>Hello</strong>world');
```

```js
var element = document.createElement('div');
element.className = 'message';

var textNode = document.createTextNode('hello world');
element.appendChild(textNode);

document.body.appendChild(element);
```

如果是多个文本节点，就会连起来显示，中间不会有空格

- 规范化节点

可以用`normalize`来规范文本节点在插入的时候，浏览器会认为增加了childNode的个数，用了此方法规范后变为1

```js

var element = document.createElement('div');
element.className = 'message';
var textNode = document.createTextNode('Hello world');
element.appendChild(textNode);

var anotherTextNode = document.createTextNode('Yippee');
element.appendChild(anotherTextNode);

document.body.appendChild(element);

console.log(element.childNodes.length);  // 2

element.normalize();

console.log(element.childNodes.length); // 1
```

- 分割文本节点

`splitText()`讲一个文本节点分成两个文本节点，按照位置分割

```html
<div>hello world!</div>
```
```js

var newValue = element.firstChild.splitText(5);
console.log(element.firstChild.nodeValue); // 'Hello'
console.log(newValue.nodeValue); // ' world'
console.log(element.childNodes.length); //2
```

### Comment类型

`nodeType` 8
`nodeName` #comment
`nodeValue` 注释内容
`parentNode` `document`或`element`
没有子节点
与Text类型类似，可以`splitText`分割，也可以通过`nodeValue`或`data`来得到注释内容

`document.createComment()`可以创建注释节点

```js
var comment = document.createComment('a comment');
```

注释节点标签前面为`!`的元素,可以使用`getElementsByTagNames()`取得注释节点

### CDATASection类型

与Comment类似

`nodeType` 4
`nodeName` #cdata-section
`nodeValue` CDATA区域的内容
`parentNode` `document`或`element`
不支持子节点

```html
<div id="myDiv"><![CDATA[This is some content.]]></div>
```

`document.createCDataSection()`来创建`CDATA`区域

### DocumentType 类型
`nodeType` 10
`nodeName` doctype的名称
`nodeValue` null
`parentNode` `document`
不支持子节点

`DocumentType`不能动态创建，只能通过解析文档代码来创建，保存在`document.doctype`中，有三个属性
`name` 文档类型名称
`entities` 文档类型描述的实体`NameNodeMap`对象，通常都是空列表
`notations` 文档类型描述的符号的`NameNodeMap`对象，通常都是空列表

```js
console.log(document.doctype.name); //html
```

### DocumentFragment 类型
`nodeType` 11
`nodeName` #document-fragment
`nodeValue` null
`parentNode` null
子节点可以是Element 等等
可以作为一个仓库使用，里面保存将来会添加到文档中的节点。创建文档片段可以使用 `document.crateDocumentFragment()`

```js
var fragment = document.createDocumentFragment();
```
如果我们有个`ul`想添加多个列表项，逐个添加会导致浏览器反复渲染，可以使用文档片段来创建类标签，然后再一次性添加到文档中

```html
<ul id="myList"></ul>
```

```js
var fragment = document.createDocumentFragment();
var ul = document.getElementById('myList');
var li = null;
for (var i = 0; i < 3; i++) {
    li = document.createElement('li');
    li.appendChild(document.createTextNode('Item' + (i+1)));
    fragment.appendChild(li);
}

ul.appendChild(fragment); // 文档片段的所有子节点都被删除并转移到ul中
```

### Attr类型

`nodeType` 2
`nodeName` 特性名称
`nodeValue` 特性的值
`parentNode` null
HTML中没有子节点
XML中子节点可以是Text或EntitiyReference

三个属性

`name` 特性名称
`value` 特性的值
`specified` 布尔值，区别特性是在代码中制定的还是默认的

```js
var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);
console.log(element.attributes["align"].value); //"left"
console.log(element.getAttributeNode("align").value); //"left"
console.log(element.getAttribute("align")); //"left"
```

`setAttributeNode()`新创建的特性必须添加到元素中，用该方法

`atributes`和`getAttributeNode`返回队形特性的`Attr`节点，`getAttribute`返回特性的值

## DOM操作技术

### 动态脚本

插入外部元素和直接插入js代码

```html
<sript type="text/javascript" src="may.js"></sript>
```

创建这个DOM代码 

```js
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'may.js';
document.body.appendChild(script);

// 也可以封装

function loadScript(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url
  document.body.appendChild(script);

}
```

另一种内嵌

```html
<script>
     function sayHi() {
         console.log('hi')
     }
</script>
```
创建这个DOM代码

```js
var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode("function sayhi() { console.log('hi')}"));  // 在IE中不能返回子节点可以用script.text = "function sayHi() { console.log('hi')}"
document.body.appendChild(script);
// 封装
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

loadScriptString("function sayHi(){alert('hi');}");
```

### 动态样式

```html
<link rel="stylesheet" type="text/css" href="style.css">
```
创建这个DOM代码 

```js
function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}

loadStyles("styles.css");
```

另一种嵌入css

```html
<style type="text/css">
body {
    background-color: red;
}
</style>
```

用DOM表示代码

```js
function loadStyleString(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));  // 原因同上script
    } catch (ex){
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}

loadStyleString("body{background-color:red}");
```

`style.cssText`在重用style元素并在此设置属性，可能导致浏览器崩溃

### 操作表格


使用DOM创建HTML表格

![](images/jingtong_18.png)

`<tr>`元素添加属性和方法
![](images/jingtong_19.png)

```html
<table border="1" width="100%">
    <tbody>
        <tr>
            <td>Cell 1,1</td>
            <td>Cell 2,1</td>
        </tr>
        <tr>
            <td>Cell 1,2</td>
            <td>Cell 2,2</td>
        </tr>
    </tbody>
</table>
```

```js
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
```
### 使用NodeList

`NodeList`近似 `NamedNodeMap`和`HTMLCollection`

当文档结构发生变化，就会得到更新，所有的NodeList对象都是在访问DOM文档时实时运行的查询

如果想迭代一个NodeList,最好使用`length`属性初始化第二个变量

每访问 `NodeList`对象，都会运行一次查询，最好的办法就是减少DOM操作

