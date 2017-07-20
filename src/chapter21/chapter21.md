# Ajax 与 Comet

`ajax`能够向服务器请求额外的数据而无需卸载页面

`ajax`的核心是`XMLHttpRequest`对象

## XMLHttpRequest对象

浏览器中创建XHR对象

```js
var xhr = new XMLHttpRequest();
```

### XHR的用法

`open()`启用一个请求以发送，接收三个参数 要发送的请求类型(`get`, `post`),请求的URL和表示是否异步发送请求的布尔值

```js
xhr.open('get', 'example.php', false);
```
1. URL是相对于执行代码的当前页
2. open（）方法并不会真正发送请求，而是启动一个请求以备发送

要发送特定的请求，必须调用`send()`方法

```js
xhr.open('get', 'example.txt', false);
xhr.send(null)
```

这里的send()方法接受一个参数，即要作为请求主体发送数据，如果不需要发送数据，必须传入`null`

同步请求，js会等到服务器相应之后再继续执行，相应的数据会自动填充XHR对象属性

`responseText` 作为相应主体被返回的文本
`responseXML` 相应主体的内容类型 `text/xml`或`application/xml`
`status` 相应的HTTP状态
`statusText`HTTP状态说明

状态代码304表示请求的资源没有被修改，可以直接使用浏览器中缓存的版本

多数是发送`异步请求`，可以检测XHR对象的`readyState`属性，该属性表示请求相应过程的当前活动阶段

`0` 未初始化，尚未调用`open()`方法
`1` 启用。已经调用`open()`方法，尚未调用`send()`方法
`2` 发送 已经调用`send()`方法，尚未接收到响应
`3` 已经接收部分数据
`4` 已经接收到全部响应数据，已经可以在客户端使用

`readyState`属性的值由一个变为另一个值，都会触发`readystatechange`事件，通常只对`readyState`值未4的阶段感兴趣。必须在调用`open()`之前指定`onreadystatechange`事件处理程序才能确保跨域浏览器兼容性

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4) {

        if((xhr.status >= 200 &&　xhr.status < 300) ||　xhr.status == 304) {
            console.log(xhr.responseText);
        } else {
            console.log('unsuccessful');
        }
    }
}

xhr.open('get', 'example.txt', true);
xhr.send(null);
```

在接收到响应之前还可以调用`abort()`方法来取消异步请求

```js
xhr.abort();
```

停止触发事件

### HTTP头部信息

每个HTTP请求和响应都会带有响应的头部信息

`Accept` 浏览器能够处理的内容类型
`Accept-Charset` 浏览器能够显示的字符集
`Accept-Encoding` 浏览器能够处理的压缩编码
`Accept-Language` 浏览器当前设置的语言
`Connection` 浏览器与服务器之间连接的类型
`Cookies` 当前页面设置的Cookie
`Host` 发出请求页面所在的域
`Referer` 发出请求页面的URL
`User-Agent` 浏览器的用户代理字符串

`setRequestHeader()`方法可以设置自定义的请求头部信息,接收两个方法：头部字段的名称和头部字段的值

必须在`open()`方法之后且调用`send()`方法之前调用

```js
xhr.open('get', 'example.php', true);
xhr.setRequestHeader('myHeader', 'MyValue');
```

自定义头部字段名称，不要使用浏览器正常发送的字段名称，会影响服务器的响应

调用`XHR`对象的`getResponseHeader()`方法并传入头部字段名称
而调用`getAllResponseHeaders()`方法则可以取得一个包含所有头部信息的长字符串

### get请求

最常用于向服务器查询某些信息，必要是可以查询字符串参数追加到URL的末尾

查询字符串中每个参数的名称和值都必须使用`encodeURIComponent()`进行编码,然后放到URL末尾，而且名-值对必须由（&）分割

```js
xhr.open('get', 'example.php?name1=value&name2=value2', true);
```

函数复制向现有URL末尾添加

```js
function addURLParam(url, name, value) {
    url += (url.indexOf('?') == -1 ? '?': '&');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}
```

### POST请求

通常用于向服务器发送应该被保存的数据

```js
xhr.open('post', 'example.php', true);
```
发送POST请求的第二部就是`send()`方法中传入某些数据，服务器对POST请求和提交Web表单的请求并不会一视同仁。需要序列化，可以使用`serizlize()`函数来创建子这个字符串

```js
function submitData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4) {
            if((xhr.status >= 200 &&　xhr.status < 300) ||　xhr.status == 304) {
                console.log(xhr.responseText);
            } else {
                console.log('unsuccessful');
            }
        }
    };

    xhr.open('post', 'postexample.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(serialize(form));
}
```

`Content-type`头部信息如果不设置，服务器的数据就不会出现在`$_POST`超级全局变量中

## XMLHttpRequest2级

`FormData`为表单数据的序列化
`append()`添加任意多的键值对，接收键和值

```js
var data = new FormData(document.forms[0]);
data.append('name', 'may');
```

也可以直接写在`send`中

```js
xhr.send(new FormData(form));
```

### 超市设定

XHR对象添加了一个`timeout`属性，表示请求在等待响应多少毫米之后就终止，`timeout`设置一个数值后，如果对顶时间内浏览器还没有接收到响应，就会触发`tiemout`事件，进而调用`ontimeout`事件处理程序

```js

xhr.open('post', 'postexample.php', true);
xhr.timeout = 1000;
xhr.ontimeout = function () {
    console.log('Request did not return in a second');
}
xhr.send(null);
```

### overrideMineType() 方法
用于重写XHR响应的的`MIME`类型,返回的类型决定XHR对象如何处理他，提供一种重写吴福气返回的MIME类型

```js
var xhr = new XMLHttpRequest();
xhr.open('get', 'text.php', true);
xhr.overrideMimeType('text/xml');
xhr.send(null)
```

这个例子强迫XHR对象将响应当做XML非纯文本来处理

## 进度事件

`loadstart` 在接收到响应数据的第一个字节是触发
`progress` 在接收相应期间持续不断的触发
`error` 在请求发生错误时触发
`abort` 调用`abort()`方法二终止连接时触发
`load` 在接收到完整的响应数据时触发
`loadend` 在通信完成或者触发`error`、`abort`或`load`事件后触发

### load事件

`onload`事件可以替代`readystatechange`事件，接收一个`event`对象，其`target`属性就指向`XHR`对象实例，因而可以访问`XHR`对象的所有方法和属性

```js
var xhr = new XMLHttpRequest();
xhr.onload = function () {
    if(xhr.readyState == 4) {
        if((xhr.status >= 200 &&　xhr.status < 300) ||　xhr.status == 304) {
            console.log(xhr.responseText);
        } else {
            console.log('unsuccessful');
        }
    }
}
xhr.open('get', 'altevets.php',true);
xhr.send(null)
```

### progress 事件

progress事件，这个事件会在浏览器接收新数据期间周期性触发，接收一个`event`对象，其`target`属性是`XHR`对象，包含三个额外的属性 `lengthComputable`、和`totalSize`

`lengthComputeable`表示进度信息是否可用的布尔值
`position`表示已经接收的字节数
`totalSize`表示根据`Content-Length`相应头部确定的预期字节数

```js
var xhr = new XMLHttpRequest();
xhr.onload = function(event) {
  if ((xhr.status >= 200 && xhr.status < 300) ||
    xhr.status == 304){
    alert(xhr.responseText);
  } else {
    alert("Request was unsuccessful: " + xhr.status);
  }
};

xhr.onprogress = function(event) {
  var disStatus = document.getElementById('status');
  if(event.lengthComputable) {
      divStatus.innerHTML = "Received " + event.position + " of " +
      event.totalSize +" bytes";
  }
}

xhr.open('get', 'altevents.php', true);
xhr.send(null)
```

## 跨源资源共享

`XHR`对象只能访问与包含他的页面位置同意域中的资源

`CORS`定义了必须访问跨源资源，浏览器和服务器应该如何沟通，从而决定请求或者相应是否成功，或者失败

发送请求是，需要给他附加一个额外的`Orignin`头部，其中包含请求页面的源信息(协议、域名和端口)

```
Orignin: http://www.baidu.com
```

服务器认为这个请求可以接受，就在`Access-Control-Allow-Orignin`头部中返回相同的源信息

```
Access-Control-Allow-Orignin: http://www.baidu.com
```


### IE对CORS的实现

在IE8中引入了XDR类型，XDR对象的安全机制部分实现CORS规范

- cookie不会随请求发送，不会随相应返回
- 只能设置求情头部信息的`Content-Type`字段
- 不能访问相应头部信息
- 只支持GET和POST请求

所有的XDR请求都是异步执行，不能用它来穿件同步请求

```js
var xdr = new XDomainRequest();
xdr.onload = function(){
    alert(xdr.responseText);
};
xdr.open("get", "http://www.somewhere-else.com/page/");
xdr.send(null);
```

只能访问相应的原始文本，没有办法确定相应的状态码，只要有效就会触发`load`事件，触发`error`事件

```js
var xdr = new XDomainRequest();
xdr.onload = function(){
    alert(xdr.responseText);
};
xdr.onerror = function() {
  console.log('an error occurred')
}
xdr.open("get", "http://www.somewhere-else.com/page/");
xdr.send(null);
```

请求返回前调用`abort()`方法可以终止请求

### 其他浏览器对CORS的实现

其他浏览器中，可以通过传入绝对的URL请求另一个域中的资源

```js
xhr.open('get', 'www.baidu.com', true)
```

通过跨域XHR对象可以访问`status`和`statusText`属性，但是有以下限制

- 不能使用setRequestHeader()设置自定义头部
- 不能发送和接受cookie
- 调用`getAllResponseHeaders()`方法总会返回空字符串

### Preflighted Reqeusts

`Preflighted Requests`的透明服务器验证机制支持开发人员使用自定义的头部、GET或POST之外的方法，以及不同类型的主体被人
使用高级选项发送请求，给服务器发送一个`Preflight`请求，使用`OPTIONS`方法

`Origin` 与简单的请求相同
`Access-Control-Request-Method` 请求自身使用的方法
`Access-Control-Request-Headers` 自定义的头部信息，多个头部以逗号分隔

```
Origin: http://www.baidu.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: NCZ
```

服务器返回的请求

```
Access-Control-Allow-Origin: http://www.nczonline.net 
Access-Control-Allow-Methods: POST, GET  // 允许的方法
Access-Control-Allow-Headers: NCZ // 允许的头部
Access-Control-Max-Age: 1728000  // 请求缓存多长时间秒表示
```

### 带凭证的请求

跨域请求不提供凭证（cookie、HTTP认证及客户端SSL证明），通过将`withCredentials`属性设置为true，可以制定某个请求应该发送凭证
服务器接收带凭证的请求

```
Access-Control-Allow-Credentials: true
```

如果服务器端没有包含这个头部，浏览器不会吧相应交给js

### 跨浏览器的CORS

浏览器对CORS的支持程度不一样，但所有浏览器都支持简单的请求，有必要实现一个跨浏览器的方案

检查浏览器是否存在`withCredentials`属性, 在结合检测`XDomainRequest`对象是否存在

```js
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if('widthCredentials' in xhr) {
        xhr.open(method, url, true)
    } else if (typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null
    }
    return xhr;
}

var request = createCORSRequest('get', 'http://www.baidu.com');
if(request) {
    request.onload = function () {

    };

    request.send();
}
```


`abort()`  停止正在进行的请求
`onerror` 替换onreadystatechange检查错误
`onload` 替换onreadystatechange检查成功
`responseText` 取得相应内容
`send()` 发送请求

## 其他跨域技术

### 图像Ping

一个网页可以从任何网页加载图片，不担心跨域问题，可以动态的创建图像，使用它的`onload`和`onerror`事件处理程序来确定说服哦接收了响应

常用于图像

```js
var img = new Image();
img.onload = img.onerror = function() {
  console.log('done'); // 只要请求完成，能得到通知
}
img.src = 'http://www.example.com/test?name=Nicholas' //请求发送一个name参数
```
缺点：
1. 只能发送GET请求
2. 无法访问服务器的响应文本

### JSONP

```js
callback({'name': 'may'})
```

JSON由两部分组成：回调函数和数据。
回调函数是响应到来时应该在页面中调用的函数。回调函数的名字一般在请求中指定
JSONP请求
```
http://baidu.com/json/?callback=handleResponse
```

这里指定的回调韩式是handleResponse()

JSON是通过动态<script>元素来使用的，使用可以为src指定跨域URL
