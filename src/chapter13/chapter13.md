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

点击鼠标右键可以调出上下文菜单

```html
<div id="myDiv">Right click or Ctrl+click me to get a custom context menu.
Click anywhere else to get the default context menu.</div>
<ul id="myMenu" style="position:absolute;visibility:hidden;background-color:
silver">
    <li><a href="http://www.nczonline.net">Nicholas  site</a></li> 
    <li><a href="http://www.wrox.com">Wrox site</a></li>
    <li><a href="http://www.yahoo.com">Yahoo!</a></li>
</ul>
```
```js

EventUtil.addHandler(window, "load", function(event){
    var div = document.getElementById("myDiv");
    EventUtil.addHandler(div, "contextmenu", function(event){
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
        var menu = document.getElementById("myMenu");
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px";
        menu.style.visibility = "visible";
    });
    EventUtil.addHandler(document, "click", function(event){ document.getElementById("myMenu").style.visibility = "hidden";
    });
});
```

首先要取消默认行为，保证不显示浏览器默认的上下文，然后根据event对象的clientX和clientY属性的值

— beforeunload事件

发生在window对象上的beforeunload事件，为了让开发人员有可能在页面卸载前阻止这一操作

必须将`event.returnValue`的值设置为要显示给用户的字符串，同时作为函数的值返回

```js
EventUtil.addHandler(window, 'beforeunload', function (event) {
    event = EventUtil.getEvent(event);
    var message = 'miss you if you go';
    event.returnValue = message;
    return message;
})
```

- DOMContentLoaded事件

形成完整的DOM树之后就触发，不会理会图像、js、css文件或者其他资源是否已经下载完毕

可以更早的交互

```js
EventUtil.addHandler(document, 'DOMContentLoaded', function(event) {
  console.log('Content loaded')
})
```

事件对象不提供任何额外的信息，target是`document`
如果不支持这个方法，建议在页面加载期间设置一个时间为0的超时调用

```js
setTimeout(function () {
    // 事件处理的函数
}, 1000)
```

- readystatechange 事件

提供与文档或者元素的加载状态有关的信息


`uninitialized(未初始化)` 对象存在尚未初始化
`loading(正在加载)` 对象正在加载数据
`loaded(加载完毕)` 对象加载数据完成
`interactive(交互)` 可以操作对象，但是没有完全加载
`complete(完成)` 对象已经加载完毕

不是所有的对象都会经历这几个阶段，以为时间经常少于4次，属性值不连续，不能确保顺序

```js
EventUtil.addHandler(document, 'readystatechange', function(event) {
  if(document.readyState == 'interactive') {
      console.log('Content loaded');
  }
})
```

event对象不提供任何信息，没有目标对象

当外部资源多的时候  交互 < 完成
当资源较少  完成 < 交互
有必要同事检测交互和完成阶段

```js
EventUtil.addHandler(document, 'readystatechange', function(event) {
  if(document.readyState == 'interactive' || document.readyState == 'complete') {}
  EventUtil.removeHandle(document, 'readystatechange', arguments.callee); // 移除相应的事件处理程序以免在其他阶段再执行
  console.log('conetnt loaded');
})
```

`script`和`link`也会触发`readystatechange`事件，用来确定js和css是否加载完毕
等于`loaded`或`complete`都有可能表示资源已经可用

```js
  EventUtil.addHandler(window, "load", function(){
        var script = document.createElement("script");
        EventUtil.addHandler(script, "readystatechange", function(event){ 
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            if (target.readyState == "loaded" || target.readyState == "complete") { 
                EventUtil.removeHandler(target, "readystatechange", arguments. callee); 
                alert("Script Loaded");
            } 
        });
    script.src = "example.js";
    document.body.appendChild(script);
});
```

- pageshow和pagehide事件r

Firefox和Opera 有个特性，往返缓存，可以在用户使用浏览器的后退和前进按钮时加快页面的转换速度，其实整个页面都保存在内存里

1. `pageshow`页面显示时触发，事件目标是`document`,必须将事件处理添加到`window`

```js
(function(){
    var showCount = 0;
    EventUtil.addHandler(window, "load", function(){
        alert("Load fired");
    });
    EventUtil.addHandler(window, "pageshow", function(){
        showCount++;
        alert("Show has been fired " + showCount + " times.");
    });
})();
```

首次加载完成值为0，后退再返回会递增，重新刷新值为0

`pageshow`事件`event`对象还包含一个`persisted`的布尔属性,如果页面保存在`bfcache`,属性为true,否则为false

2. `pagehide`事件，会在浏览器写在页面的时候触发，在`unload`事件之前触发，必须添加window对象

这个事件event对象包含`persisted`,如果是`bfcache`指为`true`,否则为`false`

- hashchange 事件

url参数列表发生变化时通知

必须把事件处理添加给`window`对象，URL参数列表只要变化就会调用它
event对象应该包含两个属性`oldURL`和`newURL`分别保存着参数列表变化前后的完整`URL`

是否支持该方法

```js
var isSupported = ('onhashchange' in window) && (document.documentMode === undefined || document.documentMode > 7)
```

### 设备事件


- `orientationchange` 确定用户何时将设备有横向查看模式切换为纵向查看模式

![](images/jingtong_26.png)

支持是3个值 0 肖像模式 90向左旋转 -90向右旋转

`event`对象不包含任何有价值的信息。可以通过`window.orientation`访问到
```js
EventUtil.addHandler(window, "orientationchange", function(event){
    div.innerHTML = "Current orientation is " + window.orientation;
});
```

所有IOS设备都支持`orientationchange`事件和`window.orientation`属性

- MozOrientation 事件
`Firefix`为检测设备方向引入`MozOrientation`,该事件只提供一个平面的方向变化，在`window`上触发

```js
EventUtil.addHandler(window, "MozOrientation", function(event){
    //响应事件
});
```

`event`包含三个属性x、y和z,属性的值介于1到-1之间
竖直状态下x为0，y为0，z为1
如果向右倾斜，x会增大，反之会减小


- deviceorientation事件
与`MozOrientation`事件类似，在加速计检测到设备方向变化时在`window`上触发

![](images/jingtong_27.png)

触发`deviceorientation`事件时，事件对象中包含着每个轴相对设备静止状态下发生变化的信息

`alpha` 围绕z轴旋转，y轴的度数差
`beta` 围绕x轴旋转，z轴的度数差
`gamma` 围绕y轴旋转，z轴的度数差
`absolute` 布尔值，表示设备是否返回一个绝对值
`compassCalibrated` 设备的指南针是否校准过

```js
EventUtil.addHandler(window, 'deviceorientation', function (event) {
    var output = document.getElementById('output');
    output.innerHTML = 'alpha' + event.alpha + 'beta' + event.beta +　'gamma' + event.gamma
})
```

![](images/jingtong_28.png)

只有ios支持

- devicemotion 事件

什么时候移动，不仅仅是设备方向改变，能够检测到设备是不是正在往下掉，或者是不是被走的人拿在手里面

事件对象包含以下属性

1. `acceleration` 包含x、y、x属性的对象，告诉每个方向的加速度
2. `accelerationIncludingGravity` 包含一个x、y、x属性的对象，考虑轴自然重力加速度的情况下，每个方向上的加速度
3. `interval` 以毫秒表示的时间值，必须在顶一个`devicemotion`事件触发前传入，每个时间中都是常量
4. `rotationRate` 表示方向的`alpha`、`beta` 和 `gamma`属性对象

如果读取不到，则为null，因此在使用之前应该检测他们的值是不是null

只有ios实现`devicemotion`

- 触摸与手势事件

1. 触摸事件

`touchstart` 当手指触摸屏幕时触发，放在屏幕上也会触发
`touchmove` 当手指在屏幕上滑动时连续触发，调用`preventDefault()`可以阻止滚动
`touchend` 手指从屏幕移开时触发
`touchcancel` 当系统停止触摸时触发

每个触摸`event`提供了鼠标事件中常见的属性
bubbles\cancelable\view\clientX\clientY\screenX\screenY\detail\altKey\shiftKey\ctrlKy\metaKey

触摸事件还包含以下三个用于跟踪触摸的属性

`touches` 表示当前各种的触摸筹资的Touch对象的数组
`targetTouchs` 特定于时间目标Touch对象的数组
`changeTouches` 表示自上次触摸以来放生了什么改变的Touch对象数组

某个Touch对象包含以下属性
clientX
clientY
identifier 标识触摸的唯一id
pageX
pageY
screenX
screenY
target

```js
function handleTouchEvent () {
    if(event.touches.length === 1) {
        var output = document.getElementById('output');
        switch(event.type) {
            case 'touchstart':
                output.innerHTML = 'Touch start (' + event.touches[0].clientX + ',' +　event.touches[0].clientY + ')';
                break;
        }
    }
}

EventUtil.addHandler(document, 'touchstart', handleTouchEvent)
```

只支持ios

- 手势事件

`gesturestart` 当一个手指已经在屏幕上，另一个手指又触摸时触发
`gesturechange` 当触摸屏幕的任何一个手指的位置发生变化时触发
`gestureend` 任何一个手指从屏幕上面移开时触发

一个手指放在屏幕上，会触发`touchstart`，另一个手指又放在屏幕上会先触发`gesturestart`事件，随后触发基于该手指的`touchstart`事件
如果一个或者两个手指在屏幕上滑动，会触发`gesturechange`，但是如果一个手指移开，将会触发`gestureend`事件，紧接着触发`touchend`事件

与触摸事件一样，没有手势事件包含着标准鼠标事件属性，还包含两个额外的属性`rotation`和`scale`
`rotation`表示手指变化引起的旋转角度，负值是逆时针旋转，政治是顺时针旋转
`scale`表示两个手指间距距离的变化情况，从1开始，并随距离拉大而增长

只支持`ios`

## 内存和性能

### 事件委托

对事件处理程序过多的问题的解决方案就是`事件委托`。事件委托利用事件冒泡，制定一个事件处理程序，管理某一类型的所有事件

```html
<ul id="myLinks">
    <li id="goSomewhere"></li>
    <li id="doSomething"></li>
    <li id="sayHi"></li>
</ul>
```
如果想在li绑定点击事件可以用事件委托，只需在DOM树最高的层次上添加一个事件处理程序

```js
var list = document.getElementById('myLinks');
EventUtil.addHandler(list, 'click', function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    switch(target.id) {
        case 'doSomething':
            document.title = 'I changed the document title';
            break;
        case 'goSomewhere':
            console.log(22);
            break;
        case 'sayHi':
            console.log('hi');
    }
})
```

`document`对象很快就可以访问，而且可以在页面声明周期的任何时点上为它添加事件处理程序
在页面中设置事件处理程序所需的事件更少
整个页面内存空间更少

### 移除事件处理程序

程序指定给元素时，运行中的浏览器代码与支持页面交互js代码之间就会建立一个连接，连接越多，页面执行起来就越慢

如果想某个元素即将被移除，最好手工移除事件处理程序

```js
btn.click = null;
```

在页面卸载之前，通过`onunload`事件处理程序移除所有事件处理程序

## 模拟事件

使用js在热议时刻来触发特性的事件

### DOM中的事件模拟

在`document`对象上使用`createEvent（）`方法创建`event`对象，这个方法接收一个参数，即表示要创建事件类型的字符串

`UIEvents` 一般化的UI事件
`MouseEvents` 一般化的鼠标事件
`MutationEvent` 一般化的DOM变化事件
`HTMLEvents` 一般化的HTML事件

在创建了event对象之后，还需要使用与事件有关的信息对其进行初始化

最后就是触发事件，需要使用`dispathEvent()`方法，需传入一个参数，表示要触发事件

- 模拟鼠标事件

使用`createEvent`传入字符串`MouseEvents`,返回一个`initMouseEvent()`方法，这个方法接受15个参数，与鼠标事件中每个典型的属性一一对应

`type(字符串)` 要触发的事件类型
`bubbles(布尔值)` 事件是否冒泡
`cancelable(布尔值)` 事件是否可以取消
`view(AbstractView)` 事件关联的视图， 几乎总设置为 `document.defaultView`
`detail(整数)` 与事件有关的详细信息，事件处理程序使用，通常设置为0
`screenX(整数)` 相对屏幕x坐标
`screenY(整数)` 相对屏幕y坐标
`clientX(整数)` 视口的x坐标
`clientY(整数)` 视口的y坐标
`ctrlKey(布尔值)` 是否按下ctrl
`altKey(布尔值)` 是否按下alt
`shiftKey(布尔值)` 是否按下shift
`metaKey(布尔值)` 是否按下Meta
`button(整数)` 按下哪个鼠标键
`relatedTarget(对象)` 表示与事件相关的对象

```js
var btn = document.getElementById('myBtn');
var event = document.createEvent('MouseEvents');
event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
btn.dispatchEvent(event); // 触发事件
```
模拟点击事件


- 模拟键盘事件

调用`createEvent()`并传入`KeyboardEvent`就可以创建一个键盘事件，返回事件对象包含一个`initKeyEvent()`方法，接收以下参数

`type(字符串)` 触发事件类型
`bubbles(布尔值)` 是否冒泡
`cancelable(布尔值)` 是否可以取消
`view(AbstractView)` 事件关联的视图，一般设置为`document.defaultView`
`key(布尔值)` 按下的键码
`location(整数)` 按下哪个键 0 朱建平 1代表作 2 表示有 3 表示数字键盘 4 移动设置 5 手柄
`modifiers(字符串)` 空格分割的修改键列表 如`shift`
`repeat(整数)` 一行中按这个键多少次

```js
if(document.implementation.hasFeature('KeyboardEvents', '3.0')) {
    event.initKeyboardEvent('keydown', true, true, document.defaultView, 'a', 0, 'shift', 0);
}

dom.dispatchEvent(event); // 触发事件
```

模拟按住shift 同事按下a

只能在firefox中使用

在firefox中，调用`createEvent()`并传入`KeyEvents`就可以创建一个键盘事件，返回的事件对象会包含一个`initKeyEvent()`放啊
`type(字符串)` 要触发的事件类型
`bubbles(布尔值)` 事件是否冒泡
`cancelable(布尔值)` 事件是否可以取消
`view(AbstractView)` 事件关联的视图， 几乎总设置为 `document.defaultView`
`ctrlKey(布尔值)` 是否按下ctrl
`altKey(布尔值)` 是否按下alt
`shiftKey(布尔值)` 是否按下shift
`metaKey(布尔值)` 是否按下Meta
`keyCode(整数)` 被按下或者释放的键的键码，默认0
`charCode(整数)` 通过按键生成的字符的ASCII编码，默认0

```js
var event = doucment.createEvent('KeyEvent');
event.initKeyEvent('keypress', true, true, document.defaultView,false,false,false,false, 65, 65);
textbox.dispatchEvent(event);
```
- 模拟其他事件

如果模拟变动事件可以使用 `createEvent('MutationEvents')`，,创建一个包含`initMutationEvent()`方法的变动事件对象，
方法接受type\bubbles\cancelable\relatedNode\preValue\newValue\attrName\attrChange

```js
var event = document.createEvent("MutationEvents");
event.initMutationEvent("DOMNodeInserted", true, false, someNode, "","","",0);
target.dispatchEvent(event);
```

模拟HTML事件，同样需要先创建一个`event`对象 通过`creatEvent('HTMLEvents')`,再使用`initEvent()`方法来初始化即可

```js
var event = document.createEvent('HTMLEvents');
event.initEvent('focus', true, false);
target.dispatchEvent(event)
```

- 自定义DOM事件

创建新的自定义事件，调用`createEvent('CustomEvent')`,返回对象`initCustomEvent()`方法，接受四个参数

`type(字符串)`  触发事件的类型
`bubble(布尔值)` 事件是否应该冒泡
`cancelable(布尔值)` 是否可以取消
`detail(对象)` 保存在 `event`对象中的`detail`属性中

### IE中的事件模拟

先创建`event`对象
调用`document.createEventObject()`,创建`event`对象，手工为这个对象添加必要的信息，最后在目标上调用`fireEvent()`方法，接受两个参数：事件处理程序的名称和event对象
调用`fireEvent()`方法时，会自动为event对象添加`srcElement`和`type`属性

```js
var btn = document.getElementById('myBtn');
var event = document.createEventObject();

event.screenX = 100;
event.screenY = 0;
event.clientY = 0;
event.ctrlKey = false;
event.altKey = false;
event.shiftKey = false;
event.button = 0;

btn.fireEvent('onclick', event);
```