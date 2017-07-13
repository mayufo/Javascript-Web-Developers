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
