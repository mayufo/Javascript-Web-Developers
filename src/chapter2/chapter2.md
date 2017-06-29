
# chapter 2 在HTML中使用js

## script元素 

- async 可选 表示立即下载脚本，只对外部脚本有效
- defer 表示脚本可以延迟到文档全部解析和显示之后再执行，只对外部脚本有效
- src 执行的代码外部文件
- type 表示编写代码使用的脚本语言的内容类型

在`<script>`嵌套的js代码中，任何地方都不要出现`</script>`字符串，可以用 `<\/script>`

带有 `src`属性的<script>元素不应该在`<script>`标签之间有额外的js代码，如果这样操作，嵌入的代码会被忽略
只要不存在defer和async属性，浏览器会按照<script>元素在页面的先后顺序对他们一次进行解析

`<script>`会按照它们在页面中出现的先后顺序依次解析

### 标签的位置

在`<head>`元素中的js,意味着必须等到全部js代码都被下载解析和执行完成后才能呈现页面的内容

可以放在`<body>`元素中后面，可以避免空白


### 延迟脚本

defer 立即下载，延迟执行，相当于把js放在了body中的最后

现实中延迟脚本不一定按顺序执行，也不一定在DOMContentLoaded(构建dom树)执行，最好只有一个延迟脚本

### 异步脚本

async 立即执行，不会堵塞资源的加载和页面的加载，一旦下载好就会执行，不保证按顺序执行

### 在XHTML中的用法

XHTML代码编写比HTML编写要严格，对于大于号小于号都需要字符替换后显示，也可以用CData片段来包含js代码,如果遇到语法错误可以将CDATA备注

```html
 <script type="text/javascript">
   //<![CDATA[
    function compare(a, b) {
        if (a < b) {
            alert("A is less than B");
        } else if (a > b) {
            alert("A is greater than B");
        } else {
            alert("A is equal to B");
        }
    }
    //]]>

        compare(2,3)
    </script>
```
## 嵌入代码与外部代码

尽可能使用外链js，但内链的好处是可维护、可缓存、适应未来

## 文档模式

最初的两种混杂模式和标准模式，会影响css和js的解析执行，标准模式让IE更接近标准行为，如果没有声明文档类型，默认开启混杂模式

## <noscript>元素

用以不支持js中显示替代内容

```html
<noscript>
<p>需要浏览器支持js</p>
</noscript>
```


