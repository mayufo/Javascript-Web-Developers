# 事件

就是文档或浏览器窗口中发生的一些特定的交互瞬间

可以使用侦听器来预订事件，一遍事件发生时执行相应的代码

## 事件流

在单击按钮的同时，也单机了按钮的容器元素，甚至单击了整个页面

事件流描述是从页面中接收事件的顺序， `IE`的事件流是冒泡流，而`Netscape`是事件捕获流

### 事件冒泡

事件开始由具体的元素接收，然后逐级向上传传播到较不具体的节点

### 事件捕获

不太具体的节点应该更早接收到事件，而具体的节点应该最后接收到事件

### DOM 事件流

`DOM2级事件`包括三个阶段  事件捕获、处于目标阶段和事件冒泡阶段

![](images/jingtong_20.png)

document到html再到body后就停止，下一个阶段处于目标阶段，事件div上发生，并在事件处理，被看成冒泡的一部分，饭后冒泡阶段发生，事件又传播会文档

虽然`DOM2`明确要求不会涉及事件目标，但是在更高版本的浏览器上，都会在捕获阶段触发事件对象上的事件


## 事件处理程序

响应某些事件的函数就叫做事件处理程序，事件处理程序以`on`开拓

### HTML事件处理程序

事件的处理程序可以包含要执行的具体动作，也可以调用在页面其他地方定义的脚本

调用页面其他地方的脚本，这样创建一个封装元素属性的函数，函数中有一个局部变量`event`,也就是事件对象

这样动态创建函数可以像访问局部变量一样访问`document`及该元素本身的成员

```html
<form method="post">
<input type="text" name="username" value="">
<input type="button" value="Echo Username" onclick="alert(username.value)">
</form>
```

在HTML中指定事件处理函数有两个缺点，

一是时差问题，用户可能会在元素一出现在页面就触发相应的事件，但当时的事件处理程序可能不具备执行条件,可以封装在`try..catch`中

```html
<input type="button" value="click me" onclick="try{showMessage();} catch(ex) {}">
```

二是 `HTML`与`js`代码紧密耦合


### DOM0事件处理程序

每个元素都有自己的时间处理程序属性，属性通常小写如`onclick`

程序中的`this`引用当前元素，也可以删除DOM0级方法指定的时间处理程序,将值设为`null`即可

### DOM2事件处理程序

增加两个方法用于处理指定和删除时间处理程序的操作

- `adEventListener()`

接收三个参数，要处理的事件名，作为事件处理程序的函数，布尔值，如果布尔值是true,表示捕获阶段调用事件处理程序，如果是false表示冒泡阶段调用事件处理程序

在按钮上增加`click`事件,在冒泡阶段触发

```js
var btn = document.getElementById('myBtn');
btn.addEventListener('click', function() {
  console.log(this.id)
}, false)
```

使用添加事件处理程序的好处是可以添加多个事件处理程序，他们按照顺序执行、


- `removeEventListener()`移除传入参数与添加处理程序时使用的参数相同

```js
var handle = function() {
  console.log(this.id);
}

btn.addEventListener('click', handler,false);
btn.removeEventListener('click', handler, false);
```

大多数情况，事件处理程序添加到冒泡阶段，最大限度兼容各个浏览器

### IE事件处理程序

`attachEvent()`
`detachEvent()`

接收相同的两个参数 事件处理程序名称与事件处理程序函数

使用attachEvent()为按钮增加一个事件处理程序

```js
var btn = document.getElementById('myBtn');
btn.attachEvent('onclick', function() {
  console.log('click');
})
```

与`DOM0`方法的主要区别在于事件处理程序的作用域，`attachEvent`事件处理程序会在全局作用域中运行，this等于window

也可以为一个元素添加多个程序处理程序，但执行顺序相反

`detachEvent()`来移除，条件是必须提供相同的参数，匿名函数不能被移除

```js
var btn = document.getElementById('myBtn');

var handler = function() {
  console.log('click');
}

btn.attachEvent('onclick', handler);

btn.detachEvent('onclick', handler);
```

### 跨浏览器的事件处理程序

```js
var EventUtil = {
    addHandler: function(element, type, handler) {
      if( element.addEventListener) {
          element.addEventListener(type, handler, false)
      } else if (element.attachEvent) {
          element.attachEvent('on' + type, handler);
      } else {
          element['on' + type] = handler
      }
    },
    
    removeHandler: function(element, type, handler) {
      if(element.removeEventListener) {
          element.removeEventListener(type, handler, false)
      } else if( element.detachEvent) {
          element.detachEvent('on' + type, handler)
      } else {
          element['on' + type] = handler
      }
    }
}
```

`addHandler()`创建方法，属于名为EventUtil对象
接收三个参数要操作的元素，事件名称，事件处理程序函数

`removeHandler()`接受相同的参数，移除之前添加的事件处理程序

```js
var btn = document.getElementById('myBtn');
var handler = function() {
  console.log('click');
}

EventUtil.addHandler(btn, 'click', handler);
EventUtil.removeHandler(btn, 'click', handler);
```

没有考虑到偶有浏览器的问题，例如作用域问题

## 事件对象

在触发DOM上的某个事件时，会产生一个事件对象`event`,事件对象包含着所有与事件有关的信息

### DOM中的事件对象

![](images/jingtong_21.png)
![](images/jingtong_22.png)

一个函数处理多个事件

```js
var btn = document.getElementById('myBtn');
var handler = function(event) {
  switch (event.type) {
      case　'click':
          console.log('click');
          break;
      case 'mouseover':
          console.log('mouseover');
          break;
  }
};

btn.onclick = handler;
btn.onmouseover = handler;
```

阻止特定事件的默认行为， `preventDefault()`方法
如果想取消`a`的默认行为，可以通过`onclick`事件处理程序取消

```js
var link = document.getElementById('myLink');
link.onclick = function (event) { 
    event.preventDefault();
 }
```

只有`cancelable`属性设置为true事件，才能使用`preventDefault`来取消默认行为

`stopPropagation()`用于立即停止事件在DOM层次中的传播，取消事件的捕获或冒泡
直接在一个按钮调用`stopPropagation`避免出发在注册在`document.body`上的事件函数

```js
var btn = document.getElementById('myBtn');
btn.onclick = function (event) { 
    console.log(click);
    event.stopPropagation();
 }
 
 document.body.onclick = function (event) { 
    console.log('body')  // 不会弹出
  }
```

事件对象的`eventPhase`属性，可以用来确定事件但钱正处于事件流的那个阶段
`1` 捕获阶段调用的事件处理程序
`2` 事件处理成语处于目标对象上
`3` 冒泡阶段调用的事件处理程序

```js
document.body.addEventListener('click', function(event) {
  console.log(event.eventPhase); //1
}, true)
```

### IE中的事件对象

在DOM0方法添加事件处理程序，`event`作为 `window`对象的一个属性存在

```js
var btn = document.getElementById('myBtn');
btn.onclick = function () { 
    var event = window.event;
    console.log(event.type); // 'click'
 }
```
所有的事件对象都会包含以下方法和属性
![](images/jingtong_23.png)

```js
var btn = document.getElementById('myBtn');
btn.onclick = function () { 
    console.log(window.event.srcElement === this); // true
}
btn.attachEvent('onclick', function(event) {
  console.log(event.srcElement === this)  // false 这里this指向全局
})
 
```

`returnValue`属性相当去DOM中`preventDefault`方法，都是取消默认事件,只要赋值false,就可以阻止默认事件

```js
link.onclick = function () {
    window.event.returnValue = false
}
```

`concelBubble`属性与DOM中的`stopPropagation()`方法相同，都是停止事件冒泡

```js
btn.onclick = function() {
  window.event.cancelBubble = true;
}
```

### 跨浏览器事件对象

```js
var EventUtil = {
    addHandle: function (element, type, handler) {
        //
    },
    getEvent: function(event) {
      return event ? event: window.event;
    },
    getTarget: function(event) {
      return event.target ||　event.srcElement;
    },
    preventDefault: function(event) {
      if(event.preventDefault) {
          event.preventDefault()
      } else {
          event.retrunValue = false;
      }
    },
    removeHandler: function(element,type, handler) {
      //
    },
    stopPropagation: function(event) {
      if(event.stopPropagation) {
          event.stopPropagation
      } else {
          event.cancelBubble = true;
      }
    }
}
```

`getEvent`返回event对象的引用
`getTarget`返回目标事件的对象
`preventDefault`取消事件的默认行为
`stopPropagation`组织事件流

### 事件类型

### UI事件

- `load`当页面完全加载后在window上面触发，当所有框架都加载完毕时在框架及上触发。还可以在图像或元素上触发

```js
EventUtil.addHandler(window, 'load', function(event) {
  console.log('Loaded')
})
```

```html
<body onload="alert('loaded!')"> </body> 
```
`unload` 当页面完全卸载后在window上面触发，还可以在框架、图像、元素上触发,

从一个页面到另一个页面，利用这个时间多数情况是清除引用，避免内存泄露
`abort` 在用户停止下载过程时，内容没有加载完，在元素上面触发
`error` js错误在window上触发，无法加载图像在img元素触发，无法加载内容时，在元素上触发，或者当有框架无法加载，在框架上触发

`select` 当用户选择文本框中一个或者多个字符是触发
`resize`当窗口或者框架的大小变化，在`window`上面触发
`scroll` 当用户滚动带滚动条的内容元素中的内容时，该元素触发，在`window`触发,`scroll`事件会在文档被滚动期间重复被触发

### 焦点事件
`blur`在元素失去焦点时触发，不会冒泡
`focus`元素获取焦点时触发，不冒泡
`focusin`元素获得焦点是触发
`focusout`元素失去焦点触发

浏览器是否支持这个事件

```js
var isSupported = document.implementation.hasFeature('FocusEvent', '3.0')
```

### 鼠标与滚轮事件

`click`点击事件
`dblclick` 用户双击鼠标按钮
`mousedown`用户按下任意鼠标按钮时触发
`mouseenter`鼠标光标从元素外部首次移动到元素范围之内时触发
`mouseleave`位于元素上方的鼠标光标移动到元素范围之外是触发
`mousemove` 当鼠标指针在元素内部移动时重复触发
`mouseout`鼠标指针位于一个元素上方，然后用于移入到另一个元素是触发
`mouseover` 鼠标指针位于一个元素外部，然后用户首次移入另一个元素便捷之内是触发
`mouseup`用户释放鼠标按钮时触发

- 客户区坐标位置

当用户点击这个元素是，就会看到事件的客户端坐标信息

`clientX`和`clientY`参照点会随浏览器滚动条的移动而移动

```js
var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function(event) {
  event = EventUtil.getEvent(event);
  console.log(event.clientX, event.clientY);
})
```

- 页面坐标位置

`pageX`和`pageY`页面中位置，不会随着滚动条而变动
在页面没有滚动条的时候与`clientX`和`clientY`的值相等

- 屏幕坐标

`screenX`和`screenY`可以确定鼠标事件发生时鼠标指针相对整个屏幕的坐标信息

- 修改键

`shiftKey`、`ctrlKey`、`altKey`和`metaKey`这些都都是布尔值，按下就是true,否则是false

- 相关元素
鼠标位于div元素上，然后移出这个元素，div触发`mouseout`事件，body上触发`mouseover`事件
因此body就是关联元素
```js
var EventUtil = {
    getRelatedTarget: function(event) {
      if(event.relatedTarget) {
          return event.relatedTarget;
      } else if (event.toElement) {
          return event.toElement;
      } else if (event.fromElement) {
          return event.fromElement
      } else {
          return null;
      }
    }
}
```

- 鼠标按钮

`event.button`表示按下或者释放按钮
0 没有按下
1 按下主鼠标按钮
2 按下次鼠标按钮
3 同时按下主、次鼠标按钮
4 按下中间的鼠标按钮
5 同时按下主和中间鼠标
6 同时按下次和中间鼠标
7 同时按下三个鼠标按钮

- 更多的事件信息

`event.detail`用于给出有关事件的更多信息，`detail`包含一个数值，表示在给位置发生多少单击，如果移动位置，则会被重置为0
IE通过属性为坐标提供的细心
altLeft 是否按下 `Alt`,与`altKey`一样
ctrlLeft
offsetX 光标相对于目标元素边界的X坐标
offsetY 光标相对于目标元素边界的Y坐标
shiftLeft

- 鼠标滚轮事件

`mousewheel`在垂直向上滚动页面时，无论上下都会触发，会冒泡到document或window

`event`中还对应一个特殊的`wheelDelta`属性，`wheelDelta`是120的背书，向后是`-120`的倍数

Opera 9.5之前的本本中，`wheelDelta`的正负号颠倒
FireFox支持名为`DOMMouseScroll`的类似事件,向前滚是3的倍数，向后是-3的倍数

跨浏览器解决方案
```js
getWheelDelta: function (event) {
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40; // 保证和其他浏览器相同
        }
    }
```

- 触摸设备

1. 不支持双击`dblclick`事件
2. 轻击元素会触发 `mousemove`事件，不会有其他事件发生
如果屏幕没有因此变化，依次发生 `mousedown`、`mouseup`和`click`事件
3. `mousemove`事件会触发`mouseover`和`mouseout`事件
4. 两个手指放在屏幕上页面滚动会触发`mousewheel`和`scroll`事件

- 无障碍阅读
1. 使用`click`事件执行代码
2. 不要使用 `onmouseover`想用户显示新的选项
3. 不要使用 `dblclick`执行重要的操作

### 键盘与文本事件

`keydown`当用户按下键盘上的任意键触发，如果按住不放，会重复触发
`keypress` 当用户按下键盘上的字符键时触发，如果按住不放，会重复触发
`keyup`当用户释放键盘上的按键时触发

- 键码
回车 13
退格 8

![](images/jingtong_24.png)

![](images/jingtong_25.png)

- 字符编码

`event.charCode`只有在`keypress`才包含值，值是按下的那个键所代表的字符串`ASCII`编码

```js
getCharCode: function (event) {
        if(typeof event.charCode == 'number') {
            return event.charCode
        } else {
            return event.keyCode
        }
    }
```

- DOM3级变化

添加一个`location`属性表示按下什么位置上的键， 不建议使用

- textInput事件  
当用户在可编辑区域中输入字符串，就会触发这个事件
与`keypress`区别在于`keypress`任何焦点的元素都可以触发，按下能够影响文本显示的键就会触发，比如退格键，而`textInput`是会在用户输入实际字符键才会被触发

对应的event上还有个属性 `event.inputMethod`，只有IE支持

0 浏览器不确定怎么输入
1 键盘输入
2 粘贴进来的
3 拖放进来的
4 使用IME输入的
5 通过表单中选择某一项输入
6 通过手写输入
7 语音输入
8 几种方法组合输入
9 脚本输入

- 设备中的键盘事件
十字键盘键码（175-178）
减号 170
加号 174
1 172
2 173

### 复合事件

用于处理`IME`(输入法编辑器)的输入序列， 用处不大

1. `compositionstart` IME文本符合系统代开是触发，表示要开始输入了，包含正在编辑的文本
2. `compositionupdate` 向输入字段中插入新字符时触发，包含正插入新的字符
3. `compositionend` 在IME的文本符合系统关闭是触发，包含此次输入绘画中插入所有的字符串

### 变动事件

`DOMSubtreeModified` DOM结构中发生任何变化触发
`DOMNodeInserted` 在一个节点作为自建店出入另一个节点中时触发
`DOMNodeRemoved`节点从其父节点中被移除是触发
`DOMNodeInsertedIntoDocument`一个节点被直接插入文档或通过子树简介插入文档之后触发
`DOMNodeRemovedFromDocument` 一个节点被直接从文档中移除或者通过子树间接从文档中移除之前触发
`DOMAttrModified`特性被修改之后触发
`DOMCharacterDataModified`文本几点的值发生变化时触发

是否支持
```js
var isSupported = document.implementation.hasFeature('MutationEvents', '2.0');
```

- 删除节点

```html
<! DOCTYPE html>
<html>
<head>
<title>Node Removal Events Example</title>
</head>
    <body>
        <ul id="myList">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </body>
</html>
```
假设移除`ul`
1. 在ul元素上触发`DOMNodeRemoved`事件，`relatedNode`属性等于`document.body`
2. `ul`上触发`DOMNodeRemovedFromDocument`事件
3. 身为ul元素的子节点li及文本节点触发`DOMNodeRemovedFromDocument`事件
4. document.body上触发`DOMSubtreeModified`事件，ul是document.body的直接子元素


执行顺序
```js
EventUtil.addHandler(window, 'load', function (event) {
    var list = document.getElementById('myList');
    EventUtil.addHandler(document, 'DOMSubtreeModified', function (event) {
        console.log(event.type);
        console.log(event.target);
    })

    EventUtil.addHandler(document, 'DOMNodeRemoved', function (event) {
        console.log(event.type);
        console.log(event.target);
        console.log(event.relatedNode);
    })

    EventUtil.addHandler(list.firstChild, 'DOMNodeRemovedFromDocument', function (event) {
        console.log(event.type);
    })
})
```

- 插入节点

1. 首先会触发`DOMNodeInserted`事件，事件目标是插入的节点，`event.relatedNode`属性包含父节点的引用，节点被插入到新的父节点，事件是冒泡的
2. 新节点的上面触发 `DOMNodeInsertedIntoDocument`,这个事件不冒泡
3. 最后触发事件`DOMSubtreeModified`，触发于新插入节点的父节点

```js
EventUtil.addHandler(window, 'load', function (event) {
    var list = document.getElementById('myList');
    var item = document.createElement('li');
    EventUtil.addHandler(document, 'DOMSubtreeModified', function (event) {
        console.log(event.type);
        console.log(event.target);
    })

    EventUtil.addHandler(document, 'DOMNodeInserted', function (event) {
        console.log(event.type);
        console.log(event.target);
        console.log(event.relatedNode);
    })

    EventUtil.addHandler(item, 'DOMNodeInsertedIntoDocument', function (event) {
        console.log(event.type);
    })
})



```
### HTML5事件

- contentxmenu事件