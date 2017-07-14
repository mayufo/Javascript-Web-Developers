# DOM扩展

对DOM的扩展主要是选择符API和HTML5

## 选择符API

### querySelector() 方法

`querySelector()`接收一个css选择符，返回与该模式匹配的第一个元素，如果没有找到匹配元素，返回`null`

```js
var body = document.querySelector('body');
// id为myDiv
var myDiv = document.querySelector('#myDiv');
// 类为selected的元素
var selected = document.querySelector('.selected');
// 类为button的第一个图像元素
var img = document.body.querySelector('img.button');
```

### querySelectorAll()方法

接收的参数和 `querySelector()`一样，返回一个`NodeList`实例

```js
// 选取某div中所有的em
var ems = document.getElementById('myDiv').querySelectorAll('em');

var selecteds = document.querySelectorAll('.selected');

var strongs = document.querySelectorAll('p strong');
```

返回NodeList中每个元素可以用 `item()`方法，也可以使用括号

如果传入不支持的选择符和`querySelector`一样，会抛出错误

### matchesSelector()方法

`matchesSelecotr()`接收一个参数，css选择符，调用元素和选择符匹配返回true,否则返回false,目前没有浏览器支持这个方法。但是在不同浏览器又各自的方法支持(看完了才说....)

可以写一个包装函数

```js
function matchesSelector(element, selector){
    if (element.matchesSelector){
    return element.matchesSelector(selector);
    } else if (element.msMatchesSelector){
    return element.msMatchesSelector(selector);
    } else if (element.mozMatchesSelector){
    return element.mozMatchesSelector(selector);
    } else if (element.webkitMatchesSelector){
    return element.webkitMatchesSelector(selector);
    } else {
    throw new Error("Not supported.");
    }
}
if (matchesSelector(document.body, "body.page1")){
// 执行操作
}
```

## 元素遍历

```js
var ul = document.getElementsByTagName('ul')[0];

console.log(ul.childNodes);  //返回一个NodeLit
console.log(ul.childElementCount); // 3
console.log(ul.firstChild);  //#text
console.log(ul.firstElementChild); //li
```

ElementTraversal新定义一组属性来弥补，IE9之前不返回文本节点，其他浏览器返回

`childElementCount`: 返回子元素的个数
`firstElementChild`: 指向第一个子元素 `firstChild`
`lastElementChild`: 指向最后一个子元素 `lastChild`
`previousElementSibling`: 指向同辈前一个子元素 `previousSibling`
`nextElementSibling`: 指向同辈后一个子元素 `nextSibling`

```js
var i,len,child = element.firstChild;
while(child != element.lastChild){
    if (child.nodeType == 1){ //೜ಉ௦ʿ௦Њገ
        processChild(child);
    }
    child = child.nextSibling;
}
```

使用新得元素

```js
var i, len, child = element.firstElementChild;
while(child != element.lastElementChild) {
    processChild(child);
    child = child.nextElementSibling;
}
```

## HTML5

### 与类相关的扩充

- `getElementsByClassName()`方法

接收一个或者多个类名字符串，返回带有制定所有元素的`NodeList`,传入多个类的时候，不分先后顺序
```js
// 取得所有类中包含`username`和 `current`元素
var allCurrentUsername = document.getElementsByClassName('username current')
```

- `classList`属性

需要通过`className`属性添加、删除和替换类名

新类型还定义如下方法

`add(value)` 增加class
`contains(value)` 是否存在在列表中
`remove(value)` 删除给定的字符串
`toggle(value)` 如果列表中已经存在，删除，不存在添加

div共有三个类名，需要删除一个
```html
<div class="bd user disabled"></div>
```
```js
div.classList.remove('user')
```
### 焦点管理

`document.activeElement`始终会引用DOM中当前获得焦点的元素
`focus` 获得焦点

```js
var button = document.getElementById('myButton');
button.focus();
console.log(document.activeElement === button);
```

文档加载期间 `document.activeElement`为null

`document.hasFocus()`确定文档是否获得焦点

### HTMLDocument的变化

- readyState属性

`Document.readyState`可能有两个值

`loading` // 正在加载文档
`complete` // 已经加载完文档

- 兼容模式
`document.compatMode`
`CSS1Compat`标准模式下
`bACKcOMPAT` 混杂模式下

- head属性
`document.head`属性引用文档的`<head>`元素

### 字符集属性

默认情况下，属性值为`UTF-16`
`document.charset` 实际使用的字符集
`document.defaultCharset`表示根据默认浏览器及操作系统的设置，字符集应该是什么
两个值不一定相等
```js
console.log(document.charset);
```
### 自定义数据属性

`HTML5`非标准属性加前缀 `data-`
```html
<div id="myDiv" data-appId="123" data-myname="Nicholas"></div>
```

```js
console.log(div.dataset['appid']);  // 123
```

### 插入标记

- innerHTML属性 返回调用元素所有子节点 写的模式下，替换调用元素原来所有子节点

`innerHTML`插入的`<script>`不会执行其中的脚本，必须为`<script>`标签指定`defer`属性，必须位于有作用域元素之后

```js
div.innerHTML = "<input type=\"hidden\"><script defer>alert('hi');<\/script>";// 隐藏的 input不影响页面布局
```

同理`<style>`必须位于有作用域元素之后

```js
div.innerHTML = "<input type=\"hidden\"><style type=\"text/css\">body {background-color: red; }</style>"; // 隐藏的 input不影响页面布局

```

`innerHTML`并不支持所有元素不支持 col、colgroup、frameset、head、html、style、table、tbody、thead、tfoot、tr

使用`innerHTML`从外部插入HTML，可以使用IE8提供的`window.toStaticHTML()`方法 删除脚本节点和事件处理程序属性

```js
var text = "<a href=\"#\" onclick=\"alert('hi')\">Click Me</a>";
var sanitized = window.toStaticHTML(text); // 支持IE8
console.log(sanitized) // "<a href=\"#\">Click Me</a>"
```

- outerHTML

`outerHTML`返回调用它的元素及所有子节点的HTML标签，包含对象标签本身，而`innerHTML`不包含标签

```html
<div id="test"> 
   <span style="color:red">test1</span> test2 
</div>
```

```
innerHTML "<span style="color:red">test1</span> test2 "
outerHTML "<div id="test"><span style="color:red">test1</span> test2</div>"
```

- insertAdjacentHtml()

`insertAdjeacentHTML()`接收两个参数 插入位置和要插入的HTML文本

`beforebegin` 在当前元素之前插入一个紧邻的同辈元素
`afterbegin`  在当前元素之下插入一个新的子元素或者在第一个元素之前再新的子元素
`beforeend` 在当前元素之下插入一个新的子元素或者在最后一个子元素之后插入新的子元素
`afterend`  在当前元素之后插入一个紧邻的同辈元素

```js
// 同辈第一元素插入
element.insertAdjacentHTML('beforebegin', '<p>hi</p>');
// 作为第一个子元素插入
element.insertAdjacentHTML('afterbegin','<p>hi</p>');
// 作为最后一个子元素插入
element.insertAdjacentHTML('beforeend', '<p>hi</p>');
// 作为后一个同辈元素插入
element.insertAdjacentHTML('afterend', '<p>hi</p>')
```

- 内存与性能问题

使用`innerHTML`、`outerHTML`和`inserAdjacentHTML`最好先手动删除要被替换元素的所有时间处理程序,避免内存的占用

`innerHTML`、`outerHTML`和`inserAdjacentHTML`会创建js解析器，效率高，最好设置合理的创建和销毁范围

最好单独构建字符串，在一次性将结构字符串复制给 `innerHTML`

### scrollIntoView() 方法

`scrollIntoView()`通过滚动浏览器窗口或某个元素，调用元素出现在视口中

接收一个参数`true` 滚动之后调用元素的顶部视口平齐（默认）
如果是 `false` 调用元素的地步与视口平齐

```js
var divDemo = document.getElementById('demoDiv');

document.divDemo[0].scrollIntoView();  // 不支持chrome
```

## 专有扩展






