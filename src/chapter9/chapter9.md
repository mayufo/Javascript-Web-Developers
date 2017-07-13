# 客户端检测
先设计最通用的方案，在使用特定于浏览器的技术增强方案
## 能力加测
识别浏览器的能力
```js
if(object.propertyInQuestion) {
    // 使用object.propertyInQuestion
}
```

IE5.0之前不支持 `document.getElementById`一般用非标准的`document.all`实现

```js
function getElement(id) {
    if(document.getElementById) {
        return document.getElementById(id);
    } else if (document.all) {
        return document.all[id];
    } else {
        throw new Error('NO way to retrieve element!')
    }
}
```

- 先检测达成目的的最常用的特性
- 必须测试实际用到的特性

### 更可靠的能力检测

检测对象是否存在 `sort()`方法

```js
function isSortable(object) {
  return typeof object.sort == 'function';
}
```
尽量使用`typeof`进行能力检测

但在IE中 `DOM`对象是宿主对象，是通过`COM`而非`JScript`实现，`typeof`会返回 `object`

可以使用下面,但是不能保证百分之百

```js
function isHostMethod(object, property) {
    debugger;
    var t = typeof object[property];
    return t=='function' || (!!(t=='object' && object[property])) || t=='unknown';
}

console.log(isHostMethod(xhr, "open")); // 报错 xhr 
```

### 能力检测，不是浏览器检测

根据浏览器将不同能力组合，最好一次检测相关特性，而不是分别检测

```js
var hasNSPlugs = !!(navigator.plugins && navigator.plugins.length);
console.log(hasNSPlugs); //true

var hasDOM1 = !!(document.getElementById && document.createElement && document.getElementsByTagName);
console.log(hasDOM1); // true
```

## 怪癖检测

目标是识别浏览器的特殊行为

比如IE更早期版本存在bug,如果某个实例属性与`Enumerable`标记false某个属性同名，那么实例属性将不会出现在`for-in`循环中

```js
var hasDontEnumQuirk = function () {
    var o = {
        toString: function () {
        }
    };

    for (var prop in o) {
        if (prop == 'toString') {
            return false
        }
    }

}();

console.log(hasDontEnumQuirk); // false 说明没有在IE8浏览器中
```

在 `Safari`中会枚举被隐藏的属性

```js
var hasEnumShadowsQuirk = function () {
    debugger
    var o = { toString: function () {}}
    var count = 0;
    for(var prop in o) {
        if(prop == 'toString') {
            count++;
        }
    }
    return (count > 1);
}();
console.log(hasEnumShadowsQuirk); // count被加1， 1>1 返回false 如果存在bug 会返回两次 toString实例
```

### 用户代理检测

由于代理字符串包含大量与浏览器有关的信息，包括浏览器、平台、操作系统及浏览器版本。可以通过以下方法筛选出我们需要的信息

```js
var client = function () {
    // 呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        khtml: 0,
        opera: 0,
        ver: null
    };
    // 浏览器
    var browser = {
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        ver: null
    }
    // 平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        x11: false,

        // 移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        // 游戏系统
        wii: false,
        ps: false
    }

    // 检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
        // 确定是Chrome还是Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            // 近似确认版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
        // 确定是不是 Firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }
    // 检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;
    // 检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
// 检测 Windows ֡操作系统
    if (system.win) {
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }
// 移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;
// windows mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            ;
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }
// 检测 iOS 版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2; // 不能真正检测出来，只能猜测
        }
    }
// 检测 Android 版本
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }
// 游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);
    // 返回这些对象
    return {
        engine: engine,
        browser: browser,
        system: system
    };
}();

console.log(client);
```