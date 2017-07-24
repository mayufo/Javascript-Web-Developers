# HTML5脚本编程

## 跨文档消息传递

框文档消息传送也叫XDM，指来自不同域的页面间传递消息

`www.wrox.com`域中的页面于内嵌框架中`p2p.wrox.com`域中的页面通信

`postMessage()`方法接收两个参数： 一条消息和一个表示消息接受方来自哪个域的字符串，第二个参数对保证安全通信很重要，如果参数是`*`表示可以吧消息发送给来任何域的文档

```js
var iframeWindow = document.getElementById('myframe').contentWindow;
iframeWindow.postMessage('A secret', 'http://www.wrox.com')
```

最后一行代码尝试向内嵌框架中发送一条消息，并制定框架中的文档来源

接收到XDM消息时，会触发`window`对象的`message`事件，事件以异步形式触发，传递给`onmessage`处理程序的事件对象包含
`data` 作为postMessage()第一个参数传入字符串数据
`origin` 发送消息的文档所在的域
`source` 发送消息的文档window对象的代理，如果发送消息的窗口来自同一个域，对象就是`wondow`

```js
EventUtil.addHandler(window, 'message', function (event) {
    if(event.origin == 'http:// www.wrox.com') {
        processMessage(event.data);
        event.source.postMessage('Received', 'http://p2p.wrox.com')  // 向来源窗口发送回执
    }
})
```

`postMessage`最好只传字符串，如果是结构化的数据，最好调用`JSON.stringify()`


## 原生拖放

### 拖放事件

`dragstart` -> `drag` -> `dragend`

可以通过`ondragestart`事件来处理程序运行js代码

默认情况下，浏览器在拖动期间不会改变拖动元素的外观，但可以自己修改
大多数浏览器会为正在拖动的元素创建一个半透明的副本，副本始终跟随光标移动

当某个元素被拖放到有效的目标上是，会依次发生
`dragenter` -> `dragover` -> `dragleave`或`drag`

三个时间目标都是作为放置目标的元素


### 自定义放置目标

如果有拖动元素不允许放置的元素，不会发生`drag`事件

可以吧元素变成邮箱的放置目标，重写 `dragenter`和`dragover`事件的默认方法

```js
EventUtil.addHandler(droptarget, 'dragover', function (event) {
    EventUtil.preventDefault(event)
})

EventUtil.addHandler(droptarget, 'dragenter', function (event) {
    EventUtil.preventDefault(event)
})
```

Firefox中还要取消drop的默认事件

### dataTransfer对象

`dataTransfer`事件对象的一个属性，用于从被拖动元素想放置目标传统字符串格式的数据

只能在拖动事件的事件处理程序中访问`dataTransfer`对象

对象由两个主要方法`getData()`和`setData()`

`setData()`第一个参数是字符串，表示保存的数据类型`text`或`URL`,第二个参数是数据

```js
// 设置和接受文本数据

event.dataTransfer.setData('text', 'some text');
var text = event.dataTransfer.getData('text');

// 设置和接受URL数据
event.dataTransfer.setData('URL', 'http://www.baidu.com');
var text = event.dataTransfer.getData('URL');
```

HTML5制定各种`MIME`类型，这两种类型被映射为`text/plain`和`text/url-list`

URL和文本的区别在于，如果数据保存为URL，浏览器会将其当做网页中的链接，当放置在另一个浏览器窗口中，浏览器会打开该URL

```js
var dataTransfer = event.dataTransfer;

var url = dataTransfer.getData('url') ||　dataTransfer.getData('text/url-list'); // 读取URL

var text = dataTransfer.getData('Text') ||　dataTransfer.getData('text/plain'); // 读取URL
```

### dropEffect与effectAllowed

`dataTransfer`对象还能通过它来确定被拖动的元素以及放置目标的元素能够接收什么操作，该对象有两个属性`dropEffect`和`effectAllowed`

`dropEffect`被拖动的元素能够执行哪种放置行为，有4种可能值

`none`不能把拖动的元素放在这里
`move`应该把拖动的元素移动到放置目标
`copy`应该把拖动的元素复制到放置目标
`link`表示放置目标会打开拖动的元素

`dropEffect`属性要搭配`effectAllowed`属性才有用，`effectAllowed`属性表示允许拖动元素的那种`dropEffect`

`uninitialized` 没有给拖动的元素设置任何放置行为
`none` 被拖动的元素不能有任何行为
`copy` 只允许值为`copy`的`dropEffect`
`link` 只允许值为`link`的`dropEffect`
`move` 只允许值为`move`的`dropEffect`
`copyLink` 允许值为`copy`和`link`的`dropEffect`
`copyMove` 允许值为`copy`和`move`的`dropEffect`
`linkMove` 允许值为`link`和`move`的`dropEffect`
`all` 允许任意`dropEffect`

假设允许用户吧文本框中的文本拖放到一个div元素中，必须将`dropEffect`和`effectAllowed`设置为`move`

### 可拖动

`HTML`中规定`draggable`属性，表示元素是否可以拖动

```html
<div draggable="true"></div>
```
### 其他成员
`dataTransfer`对象还包括以下方法
`addElement(element)` 为拖动操作增加一个元素，只影响数据，不影响外观
`clearData(format)` 清除特定格式保存的数据
`setDragImage(element, x, y)` 指定一副图像，当拖动发生时，显示在光标下方，接收三个参数html元素和光标在图像中的x,y坐标
`types` 当前保存的数据类型

## 媒体元素

插入视频
```html
<video src="conference.mp4" id="myViedo">Video player not available</video>
```
插入音频
```html
<audio src="song.mp3" id="myAudio">Audio player not available</audio>
```

至少包含src属性，指向加加载媒体的文件
设置width和height
poster属性制定图像URL可以在加载视频内容期间显示衣服图像
标签中`controls`属性，以为这浏览器显示UI控件
如果不支持，可以指定多个不同的媒体来源，不用再标签中制定src