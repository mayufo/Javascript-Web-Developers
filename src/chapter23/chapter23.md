# 离线应用与客户端存储

需要的步骤

- 确保应用知道设备是否能上网，以便下一步执行正确的操作
- 应用还能访问一定的资源
- 有一块本地空间用于保存数据

## 离线检测

HTML5定义了一个`navigator.onLine`属性，值为true表示设备能上网
HTML5定义的两个事件
`online` 网络从离线变为在线
`offline` 网络从在线变为离线

## 应用缓存

HTML5的应用缓存简称`appcache`,`appcache`是从浏览器的缓存中分出来的一块缓存区，要保存数据需要使用一个描述文件，列出下载和缓存资源

```
CACHE MANIFEST
#Comment

file.js
file.css
```

描述文件中列出来的都是需要下载的资源，以备离线使用

在<html>中的manifest属性中制定这个文件的路径

```html
<html mainfest='/offline.manifest'>
```

以上代码包含描述文件，文件类型必须是`text/cache-manifest`

缓存中对应的API核心是`applicationCache`对象，对象有一个status属性，属性的值是常量，表示应用缓存的如下当前砖头
`0` 无缓存 没有与页面相关的应用缓存
`1` 闲置  应用缓存未得到更新
`2` 检查中 正在下载描述文件并检查更新
`3` 下载中 应用缓存正在下载描述文件中指定的资源
`4` 更新完成 应用缓存已经更新了资源，所有资源都已经下载完毕可以通过`swapCach`
`5` 废弃 描述文件已经不存在，页面无法再访问应用缓存

应用缓存还有很多相关事件，便是其状态的改变

`checking` 在浏览器为应用缓存查找更新时触发
`error` 检查更新或下载资源期间发生错误时触发
`noupdate` 检查描述文件发现文件无变化时触发
`downloading` 在开始下载应用缓存资源时触发
`progress` 文件下载应用缓存的过程中持续不断的触发
`updateready` 在页面新的应用缓存下载完毕且可以通过`swapCache()`使用时触发
`cached` 在应用缓存完整可用时触发

`applicationCache.update()`手工干预，让应用缓存未检查更新而触发上述时间

如果触发了`updateready`事件，说明版本的应用缓存已经可用，你需要调用`swapCache`来启用新应用缓存

## 数据存储

cookie原来是王静公司创造的

### Cookie

最初用于存储回话信息，标准要求服务器对任意HTTP请求发送Set-Cookie HTTP头作为相应的一部分，其中包含会话信息

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value
```
这个HTTP响应设置以name为名称、以value为值的一个cookie,名称和值在传送都必须是URL编码

通过每个请求添加Cookie HTTP头将信息发送回服务器

```
GET /index.html HTTP/1.1
Cookie: name=value
Other-header: other-header-value
```
- 限制

cookie是绑定在特定的域名下的，当设置一个cookie后，创建它的域名发送求是都会包含这个cookie,确保了储存在cookie的信息只能让批准的接受者访问，无法被其他域访问

每个域的cookie总数是有限的
IE7之后的版本每个域名最大50个，Safari和Chrome对每个域的cookies数量限制没有硬性规定

当超过单个域名限制之后还要设置cookie,浏览器就会清除以前设置的cookie
浏览器中对cookie的尺寸越有显示，浏览器都有大约4095的长度限制，超过限制，cookie会被消无声息的丢掉

- cookie的构成
1. 名称 cookie的名称必须经过URL编码
2. 值 储存在cookie中的字符串值，值必须被URL编码
3. 域 cookie对于那个域有限的
4. 路径 对于指定域中的路径，应该向服务器发送cookie,即使请求来自同一个域，路径指定不同无效
5. 失效时间 表示cookie何时应该被删除的事件戳，默认情况浏览器结束回话即将所有的cookie删除，不过也可以自己设置删除时间
6. 安全标志 指定后，cookie只有在使用SSL连接的时候才发送到服务器，只能发送给https而不能发送给http

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com // 对 wrox.com的任何子域都有效，
Other-header: other-header-value
```

secure 标志cookie中唯一一个非名值对儿的部分，包含一个secure单词,这个cookie只能果果SSL连接才能传输
```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; domain=.wrox.com; path=/; secure
Other-header: other-header-value
```

- javascript中的cookie

`document.cookie`用来获取属性是，返回当前页面可用的所有cookie的字符串

```
name1=value1;name2=value2;name3=value3
```
所有名字和值都是经过URL编码的，必须使用`decodeURIComponent`来解码

当用来设置值的饿时候`document.cookie`属性可以设置为一个新的cookie字符串，这个字符串会被添加到现有的cookie集合中。设置的`document.cookie`并不会覆盖cookie,除非已经存在

创建cookie额外的信息，只要参数追加到字符串
```js
document.cookie = encodeURIComponent("name") + "=" +
                  encodeURIComponent("Nicholas") + "; domain=.wrox.com; path=/";
```

