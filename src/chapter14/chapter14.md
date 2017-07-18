# 表单脚本

`acceptCharset` 服务器能够处理的字符集
`action` 接受请求的URL
`elements` 表单中所有控件的集合
`enctype` 请求的编码类型
`length` 表单中控件的数量
`method` 要发送的HTTP请求，是get或post
`name` 表单名称
`reset()` 将所有表单域充值未默认值
`submit()` 提交表单
`target` 请求和接受相应的窗口名称

form的取得有好几种

```js
document.getElementById('form1');

document.forms // 可以取得页面中所有的表单

document.forms['form2'] // 取名为form2的表单
```

### 提交表单

```html
<input type="submit" value="Submit Form">
```

`input`或者`button`都可以提交，`type`特性值为`sumbit`，如果并没有提交按钮，按回车不会提交表单

阻止表单的提交


```js
var form = document.getElementById('myform');
EventUtil.addHandler(form, 'sumbit', function (event) {
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event); //阻止默认事件
})
```

提交表单也可以调用`form.submit()`

为防止用户重复提交，第一次提交表单后就应该禁止提交按钮，或者利用`onsubmit`事件处理程序取消后续的表单提交操作

### 重置表单

```html
<input type="reset" value="Reset Form">
```

阻止重置操作

```js
var form = document.getElementById('myform');
EventUtil.addHandler(form, 'reset', function (event) {
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event); //阻止默认事件
})
```

`form.reset()` 重置表单

### 表单字段

可以使用元素的DOM方法访问表单元素

```js
var form = document.getElementById('form1');

var field1 = form.elements[0];
var field2 = form.elements['textbox1'];
```

- 共同的表单字段属性

`disabled`布尔值，当前字段是否禁用
`form`表单的指针，只读
`name`当前字段的名称
`readOnly`布尔值，当前字段只读
`tabIndex`但钱字段的切换tab序号
`type`当前字段的类型
`value`当前字段提供给服务器的值

监听`submit`事件,并在改时间放生是金鹰提交按钮

```js
EventUtil.addHandler(form, 'submit', function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  var btn = target.elements['submit-btn'];
  btn.disabled = true;
})
```

不能通过`click`事件处理这个功能，因为`sumbit`之后可能是`click`,也可能相反

单选列表
```html
<select>.. </select>
<select multiple>..</select>
```

- 共有的表单字段方法

每个表单字段都有两个方法 `focus()`和`blur()`
`focus`将焦点设置到表单字段

如果元素的`type`是`hidden`,或者`css`设置隐藏了字段，`focus`会导致错误
html5中`autofocus`属性，只要设置这个属性，不用js就能自动把焦点移动到相应字段

```html
<input type="text autofocus">
```

检验元素是否设置了`autofocus`属性
```js
if (element.autofocus !== true){
    element.focus(); console.log("JS focus");
}
```

对其他元素而言，现将其`tabIndex`设置为-1，然后调用`focus（）`方法

`blur()`方法的作用是元素中移走焦点，调用blur()方法不会吧焦点转移到某个特定的元素上

- 共有的表单字段事件

1. `blur` 字段失去焦点触发
2. `change` 对`input`和 `textarea` 失去焦点切`value`值改变是触发，对于`selcet`元素，其选项改变是触发
3. `focus` 当前字段获得焦点时触发

## 文本脚本

`input` type为text,可以设置`size`特性指定文本框中显示的字符数，通过`value`设置文本框的初始值，`maxlength`可以指定最大字符数
`textarea`  呈现一个多行文本框，`rows`文本框字符行数 `cols`文本框字符列数,初始值放在标签之间，不能指定最大字符数

使用value属性读取或者设置文本框的值，不要使用`setAttribute`

### 选择文本

`slect()`用于选择文本框中的所有文本

```js
textbox.select();// textarea 和input 都支持
```

- 选择(select)事件

在选择文本框的文本时，会触发select事件，在调用select()方法的时候也会触发select事件

- 取得选择的文本

增加`selectionStart` 和 `selectionEnd`

```js
function getSelectedText(textbox){
    return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
}
```

-  选择部分文本

` setSelectionRange()`接收两个参数，选择第一个字符串的索引和最后一个字符之后的字符串的索引

```js
text.value = 'Hello world';

text.setSelectionRange(0, textbox.value.length); // hello world
textbox.setSelectionRange(0, 3); // 'Hel'
```

跨浏览器实现文本选择
```js
function selectText(textbox, startIndex, stopIndex){
if (textbox.setSelectionRange){
    textbox.setSelectionRange(startIndex, stopIndex);
} else if (textbox.createTextRange){
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex);
        range.moveEnd("character", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}
```

### 过滤输入

- 屏幕字符
需要输入的文本不包含某些字符

```js
EventUtil.addHandler(textbox, "keypress", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);
    if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) { 
        EventUtil.preventDefault(event);
    }
});
```
如果用户输入的不是数值，就会屏蔽事件， `charCode > 9` 屏蔽向上 向下 退格 删除， `event.ctrlKey`确保用户没有按下 `Ctrl`


- 操作粘贴板
 
`beforecopy`发生复制操作前触发
`copy`复制操作触发
`beforecut` 剪切前触发
`cut` 剪切时触发
`beforepaste` 粘贴前触发
`paste` 粘贴时触发

访问剪切板的数据`clipboardDate`对象，IE中是`window`对象，而其他浏览器是`event`对象的属性且只有在处理剪切板事件期间`clipboardDate`对象才有效。

对象有三个方法`getDate()`、`setDate()`和`clearDate()`，
`getDate()`接受一个参数，即取得数据的格式，IE支持有两种数据格式`text`和`URL`其他支持`MINE`
`setDate()`第一个参数是数据类型，IE支持有两种数据格式`text`和`URL`其他支持`MINE`， 第二个参数是剪切板中的文本
