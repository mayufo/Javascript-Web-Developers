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

成功将文本放在剪贴板中，都会返回true,否则返回false
```js
var EventUtil = {
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData('text');
    },
    setClipboardText: function (event, value) {
        if(event.clipboardData) {
            return event.clipboardData.setData('text/plain', value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData('text', value);
        }
    }
}
```

在粘贴中要确保文本中包含的某些数值符合要求，如果无效，就取消默认的行为

确保剪贴过来的都是数字，否则取消默认行为

```js
EventUtil.addHandler(textbox, 'paste', function (event) {
    event = EventUtil.getEvent(event);
    var text = EventUtil.getClipboardText(event);

    if (!/^\d*$/.test(text)){
        EventUtil.preventDefault(event);
    }
})
```

### 自动切换焦点

为增强易用性，前一个文本框字符达到最大数量后，自动将焦点切换到下一个文本框

```js
(function () {
  function tabForward() {
      event = EventUtil.getEvent(event);
      var target = EventUtil.getTarget(event);
      if(target.value.length == target.maxLength) {
          var form = target.form;
          for(var i = 0, len = form.elements.length; i < len; i++) {
              if(form.elements[i] == target) {
                  if(form.elements[i+1]) {
                      form.elements[i+1].focus();
                  }
                  return;
              }
          }
      }
  }

    var textbox1 = document.getElementById("txtTel1");
    var textbox2 = document.getElementById("txtTel2");
    var textbox3 = document.getElementById("txtTel3");
    EventUtil.addHandler(textbox1, "keyup", tabForward);
    EventUtil.addHandler(textbox2, "keyup", tabForward);
    EventUtil.addHandler(textbox3, "keyup", tabForward);

})()
```
没有考虑隐藏字段

### HTML5约束验证API

- 必填字段

```html
<input type="text" name="username" required>
```

```js
var isUsernameRequired = document.forms[0].elements['username'].required;
```

检测代码是否支持required属性
```js
var isRequiredSupported = 'required' in document.createElement('input')
```

- 其他输入类型

`email`输入的文本必须符合电子邮件地址模式 `-@-`也会被当做有效模式
`url`输入的文本必须符合URL模式

```html
<input type="email" name="email">
<input type="url" name="homepage">
```

检测是否支持这两种类型

```js
var input = document.createElement('input');
input.type = 'email'

var isEmailSupported = (input.type == 'email');
```

- 数值范围

number
range
datetime
datetime-local
date
month
week
time

最所有数值类型的输入元素，可以指定`min`,`max`和`step`属性

```html
<input type="number" min="0" max="100" step="5" name="count">
```
```js
input.stepUp(); //加1
input.stepUp(5); //加5
```

- 输入模式

`pattern`,是一个正则表达式，用于匹配文本框的值

只允许输入数值
```html
<input type="text" pattern="\d+" name="count">
```
检验有效性

```js
var isPatternSupported = 'pattern' in document.createElement('input') 
```

- 检测有效性

`checkValidity()`可以检测表单中的某个字段是否有效


```js
if(document.form[0].elements[0].checkValidity()) {
    // 字段有效
} else {
    // 字段无效
}
```

`validity`属性告诉什么字段有效或者无效


`customError` 如果设置了`setCustomValidity()`,则为`true`,否则为`false`
`patternMismatch` 与制定的`pattern`不匹配
`rangeOverflow` 比max大，返回true
`rangeUnderflow` 比min小，返回true
`stepMisMatch` min和max之间的步长不合理
`tooLong` 长度超过`maxlength`属性制定的长度，返回true
`typeMismatch` 不是email或url要求返回的格式
`valid` 其他属性都是false,返回true
`valueMissing` 如果标注 `required`字段中没有值，

```js
if(input.validity && !input.validity.valid) {
    if(input.validity.valueMissing) {
        console.log('Please specify a value')
    } else if(input.validity.typeMismatch) {
        console.log('Please enter an email address')
    } else {
        console.log('Value is invalid')
    }
}
```

- 禁用验证

通过设置 `novalidate`属性

```html
<form method="post" action="signup.php" novalidate></form>
```

也可以在js中设置`novalidate`,如果这个属性存在，值为true，不存在false

```js
document.forms[0].noValidate = true
```

如果表单在有多个提交按钮，给制定按钮添加不必要的验证，在相应按钮上增加`formnovalidate`属性

```html
<form action="foo.php" method="post">
    <input type="submit" value="Regular Submit">
    <input type="submit" formnovalidate name="btnNoValidate">
</form>
```

也可以使用js设置这个属性

```js
document.forms[0].elements['btnNoValidate'].formNoValidate = true;
```

## 选择脚本框架

`add(newOption, relOption)` 向控件中插入新`option`元素，其位置在相关`relOption`之前
`multiple` 布尔值 表示是否允许多项选择
`options` 控件中所有`option`元素的`HTMLCollection`
`remove`  移除给定位置的选项
`selectedIndex` 基于0的选中项的索引，如果没有选中项，则值为-1
`size` 选择框中可见的行数，等价于HTML中size特性
如果没有选中项，value属性保存空字符串
如果有一个选中项，且该项的value特性已经在HTML中制定，选项框的value属性等于选中项的value特性，value特性的值是空字符串
如果有一个选中项，但该项的value特性在HTML中未制定，则选项框的value属性等于该项的文本
如果有多个选中项，选择框的value属性一句前两个取第一个选中项的值

```html
<select name="location" id="selLocation">
    <option value="Sunnyvale, CA">Sunnyvale</option>
    <option value="Los Angeles, CA">Los Angeles</option>
    <option value="Mountain View, CA">Mountain View</option>
    <option value="">China</option>
    <option>Australia</option>
</select>
```

如果用户选择第一项，选择框就是`Sunnyvalue, CA`
如果用户选择第四项`China`,选择框的值是一个空字符串，value是ongoing
如果选择最后一个，没有指定value特性，选择框的值是`Australia`

在DOM中，每个option元素都有一个`HTMLOptionElement`对象表示

`index`  选项options集合中的索引
`lable` 当前选项的标签
`selected` 布尔值 当前选项是否被选中
`text` 选项的文本
`value` 选项的值

```js
var selectbox = document.forms[0].elements['location'];
var text = selectbox.options[0].text;  // 选项的文本
var value = selectbox.options[0].value; // 选项的值 
```

`select`的change事件只要选中了选项就会触发，而其他change事件是在值被修改且焦点离开当前字段时触发

### 选择选项

选择一项的选择框，使用选择框的`selectedIndex`属性

```js
var selectedOption = selectbox.options[selectbox.selectedIndex]
```

多选中设置`select`对其他选项没有影响，而在单选中设置`select`后，会取消之前选中的选项

在多选中可以使用`select`

```js

function getSelectedOptions(selectbox) {
    var result = new Array();
    var option = null;

    for(var i = 0, len=selectbox.options.length; i < len; i++) {
        option = selectbox.options[i];
        if(option.selected) {
            result.push(option)
        }
    }

    return result
}
```

### 添加选项

DOM方法

```js
var newOption = document.createElement('option');
newOption.appendChild(document.createTextNode('Option text'));
newOption.setAttribute('value', 'Option value');
selectbox.appendChild(newOption)
```

Option构造函数

```js
var newOption1 = new Option('Option text1', 'Option value1');
selectbox.appendChild(newOption1)
```

选择框的add()方法

```js
var newOption2 = new Option('Option text3', 'Option value3');
selectbox.add(newOption2, undefined);
```

### 移除选项

DOM方法

```js
selectbox.removeChild(selectbox.options[0]); //移除第一个选项
```

remove方法

```js
selectbox.remove(0)
```

选项设为null
```js
selectbox.options[0] = null;
```

移除所有选项

```js
function clearSelectbox(selectbox) {
    for(var i = 0, len = selectbox.options.length; i < len; i++) {
        selectbox.remove(i);
    }
}
```

### 移动和重拍选项

移动`appendChild` 方法

```js
var selectbox1 = document.getElementById("selLocations1");
var selectbox2 = document.getElementById("selLocations2");
selectbox2.appendChild(selectbox1.options[0]);
```

重排最适合用DOM
`insertBefore()`、`appendChild()`


## 表达序列化

浏览器是怎么讲数据发送给服务器的
```js
function serialize(form) {
    var parts = [];
    for (var i = 0, len = form.elements.length; i < len; i++) {
        var field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (var j = 0, optLen = field.options.length; j < optLen; j++) {
                        var option = field.options[j];
                        if (option.selected) {
                            var optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ?
                                    option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ?
                                    option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" +
                                encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if (!field.checked) {
                    break;
                }

            default:
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" +
                        encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}
```

先定义名为`parts`的数组，用于保存将要创建的字符串的各个部分
在DOM兼容的浏览器使用`hasAttribute()`,IE中需要使用`specified`属性

## 富文本编辑

```js
window.load = function () {
    frames["richedit"].document.designMode = "on";
}
```

### 使用contenteditable属性

```html
<div class="editable" id="richedit" contenteditable></div>
```

```js
var div = document.getElementById("richedit");
div.contentEditable = "true";
```

contenteditable有三个值 `true`打开，`false`关闭，`inherit`从父元素哪里继承

### 操作富文本

![](images/jingtong_29.png)
![](images/jingtong_30.png)

与富文本编辑交互主要使用`document.execCommand()`传递3个参数要执行的命令名称，表示浏览器是否应该为但钱命令提供用户界面的一个布尔值，执行命令必须的一个值（如果不需要值可以传null）

```js
frames['richedit'].document.execCommand('bold', false, null); // 转化粗体文本
frames['richedit'].document.execCommand('italic', false, null); // 转化为斜体文本
```
同样的方法也是英语页面中`contenteditable`属性为true的区块,引用替换成当前窗口的document对象即可

```js
document.execCommand('bold', false, null)
```
各个浏览器显示命令的方式会不同，不能指望富文本编辑器产生一致的HTML

`queryCommandEnabled()`说明当前选择的文本执行相应命令是否合适，是`true`,否则为`false`

```js
var result = frames["richedit"].document.queryCommandEnabled("bold"); // true
```
`queryCommandState`用于确定是否已将制定命令应用到了选择的文本
```js
var isBold = frames['richedit'].document.queryCommandState('bold'); // 确定当前选择的文本是否已经转换为粗体
```

`queryCommandValue()`用于取得执行命令时传入的值，例如执行文本应用`fontsize`命令时，如果传入7，下面代码就会返回7

```js
varfontSize = frames['richedit'].document.queryCommandValue('fontsize'); // 7
```

### 富文本选区

使用`iframe`的`getSelection()`方法，可以确定实际选择的文本，用在`window`对象和`document`对象的属性，返回当前选择文本的`Seletion`对象

`addRange(range)` 制定DOM范围添加到选区中
`collapse(node, offset)` 将选区折叠刀制定节点中的相应文本便宜位置
`collapseToEnd()` 将选区折叠打终点位置
`collapseToStart()` 将选区折叠到起点位置
`containsNode（node)` 确定制定的节点是否包含在选区中
`deleteFromDocument()` 从文档中删除选区长得文本，与document.execCommand('delete', false, null)
`extend(node,offset)` 通过将focusNode和focusOffset移动到制定的值来扩展选区
`getRangeAt(index)` 返回索引对应的选区中的DOM范围
`removeAllRanges()` 从选区中移除所有DOM范围
`removeRange(range)` 从选区中移除指定的DOM范围
`selectAllChildren(node)` 清除选区并选择制定的所有节点
`toString()` 返回选区所包含的文本内容

```js

var selection = frames['richedit'].getSelection();
// 取得选择的文本
var selectedText = selection.toString();
// 取得代表选区的范围
var range = selection.getRangeAt(0);
// 突出显示选择的文本
var span = frames['richedit'].document.createElement('span');
span.style.backgroundColor = 'yellow';
range.surrandContents(span);
```

IE8以前的版本

```js
var range = frames['richedit'].document.selection.createRange();
range.pasteHTML("<span style=\"background-color:yellow\"> " + range.htmlText +
                "</span>");
```

### 表单和富文本

富文本编辑器不会主动提交，可以通过`onsubmit`事件处理程序

```js
EventUtil.addHandler(form, 'submit', function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  target.elements['comments'].value = frames['richedit'].document.body.innerHTML;
})
```

对于通过`contenteditable`元素的
```js
EventUtil.addHandler(form, 'submit', function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  target.element['comments'].value = document.getElementById('richedit').innerHTML;
})
```