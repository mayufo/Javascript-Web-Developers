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

```html
<video id="myVideo">
    <source src="conference.webm" type="video/webm; codecs='vp8, vorbis'">
    <source src="conference.ogv" type="video/ogg; codecs='theora, vorbis'">
    <source src="baidu.mpg">
    Video player not available.
</video>
```

```html
<audio src="myAudio">
    <source src="song.ogg" type="audio/ogg">
    <source src="song.mp3" type="audio/mpeg">
    Audio player not available
</audio>
```

### 属性

`autoplay` 布尔  设置autoplay的标志
`buffered` 时间范围 表示已下载的缓存事件范围的对象
`bufferedBytes` 字节范围  表示已下载的缓冲字节范围对象
`bufferingRate` 整数 下载过程中每秒平均接收到的位数
`bufferingThrottled` 布尔 浏览器是否对缓冲进行了节流
`controls` 布尔 取得或设置controls属性，隐藏浏览器内置的控件
`currentLoop` 整数 媒体文档循环次数
`currentSrc` 字符串 当前播放的媒体文件的URL
`currentTime` 浮点数  已播放的秒数
`defaultPlaybackRate` 浮点数 取得或设置默认的播放速度，默认值为1.0，开发设置
`duration` 浮点 媒体总播放时间（秒）
`ended` 布尔 是否播放完
`loop` 布尔 完成播放后是否从头开始播放
`muted` 布尔 媒体文件是否静音
`networkState` 整数 表示当前媒体的网络连接状态 0 表示空 1表示正在加载 2 表示正在加载元数据 3 表示已经加载了第一帧 4 表示加载完成
`paused` 布尔 播放器是否暂停
`playbackRate` 浮点数  设置播放速度，用户可以改变这个值
`played` 时间范围 已经播放的事件
`readyState` 整数 媒体是否就绪 0 不可用 1 表示可以显示当前帧 2 表示可以播放 3 媒体可以从头到尾播放
`seekable` 时间范围 可以搜索的事件范围
`seeking` 布尔值 表示播放是否正移动到媒体文件中的新位置
`src` 字符串 媒体文件来源
`start` 浮点数 媒体文件中开始播放的位置，秒表示
`totalBytes` 整数 当前资源所需的总字节数
`videoHeight` 整数 返回视频的高度用于video
`videoWidth` 整数 返回视频的宽度用于video
`volume` 浮动书 取得或设置当前音频的音量0.0到1.0

### 事件
事件    触发时机
`abort` 下载中断
`canplay` 播放时，readyState值为2
`canplaythrough` 播放可继续，应该不会中断readState3
`canshowcurrentframe` 当前帧已经下载完成，readyState值为1
`dataunavailable` 没有数据不能播放 readyState值为0
`durationchange` duration属性的值改变
`emptied` 网络连接关闭
`empty` 发生错误阻止了媒体下载
`ended` 媒体已播放到末尾，播放停止
`error` 下载期间发生网络错误
`load` 所有媒体已经加载完成，建议使用canplaythrough
`loadeddata ` 媒体第一帧已加载完成
`loadedmetadata` 美的元数据已加载完成
`loadstart` 下载已经开始
`pause` 播放暂停
`play` 媒体已接收到指令开始播放
`playing`  媒体已事件开始播放
`progress` 正在下载
`ratechange` 播放媒体的速度改变
`seeked` 搜索接收
`seeking` 正移动到新位置
`stalled` 浏览器尝试下载，但未接收到数据
`timeupdate`  currentTime以不合理或意外的方式更新
`volumechange` volume属性值或muted属性值已改变
`waiting 播放暂停，等待下载更多数据

### 自定义媒体播放器

给按钮添加事件处理程序，通过video元素的load事件处理程序，设置了加载完视频后显示播放时间

### 检查解码器的支持情况

`canPlayType`能够检测浏览器是否支持某种格式和编码器，接收一种格式或编解码器字符串，返回`probably`、`maybe`或空字符串

```js
if(audio.canPlayType('audio/mpeg')) { 
 }
```

如果想更具体的确定可以再传入编码格式

```js
if (audio.canPlayType("audio/ogg; codecs=\"vorbis\"")){

}
```
![](images/jingtong_33.png)

### Audio类型

audio元素还有一个原生的js构造函数Audio,可以再任何时候播放音频
```js
var audio = new Audio('sound.mps');
EventUtil.addHandler(audio, 'canplaythrought', function(event) {
  audio.play();
})
```

## 历史状态管理

历史状态管理让我们不必写在当前页面即可修改浏览器的历史状态栈，用户通过前进后退再页面状态间切换
通过使用`hashchange`事件，可以知道URL的参数发生什么变化
`hashchange.pushState()`接收三个参数 状态对象、新状态的标题和可选的相对URL
```js
history.pushState({name:'Nicholas'}, 'Nicholas page', 'nicholas.html');
```
执行后新的状态信息会被加入历史状态栈，浏览器地址会变成新的相对URL，但不会向服务器发送请求，即使状态改变之后查询location.href也会返回与地址栏中相同的地址
第二个参数还不能实现

前进后退会触发`popstate`事件，该事件对象有个state属性这个属性包含着第一个参数传递给pushState()的状态对象

```js
EventUtil.addHandler(window, 'popstate', function(event) {
  var state = event.state;
  if(state) {  // 第一个页面加载state为空时
      processState(state);
  }
})
```

浏览器加载的第一个页面没有状态
当更新当前状态，可以调用`replaceState()`参入的参数和`pushState()`相同

```js
history.replaceState({name:"Greg"}, "Greg's page");
```