# chapter 12

`DOM1`主要定义`HTML`和`XML`文档的底层解构

`DOM2`和`DOM3`则在这个解构的基础上引入了更多的交互能力

## DOM变化

### 针对XML命名空间的变化
有了命名空间，不用的XML文档的元素就可以混合在以前，共同构成良好的文档，可以使用xmlns后跟冒号，在后跟前缀

```html
<xhtml:body>hello world</xhtml>
```

在混合时候两种语言的情况下，命名空间的作用就很大

```html
<svg xmlns="http://baidu.com"></svg>
```
这是一个 `xhtml`文档，但有了命名空间，其中`svg`代码仍然有效

- node类型的变化

在DOM2中，Node类型包含下列特定命名空间的属性

`localName` 不带命名空间的前缀节点名称
`namespaceURI` 命名空间URI未指定为null
`prefix`命名空间的前缀未指定为null
```html
<s:svg xmlns:s="http://www.w3.org/2000/svg" version="1.1"
viewBox="0 0 100 100" style="width:100%; height:100%"> 9
            <s:rect x="0" y="0" width="100" height="100" style="fill:red"/>
        </s:svg>
```
`localNames`是`svg`,`tagName`是`s:svg`,`namespaceURI`是`http://www.w3.org/2000/svg`，`prefix`是`s`

DOM3引入


`isDefaultNamespace(namespaceURI)` 指定`namespaceURI`当前默认命名空间，返回true
`lookupNamespaceURI(prefix)` 返回`prefix`命名空间
`lookupPrefix(namespaceURI)` 返回`namespaceURI`的前缀

```js
console.log(document.body.isDefaultNamespace('http://www.w3.org/1999/xhtml')); //true
// 假设svg中包含着<s:svg>的引用
console.log(svg.lookupPrefix('http://www.w3.org/2000/svg')); //'s' 
console.log(svg.lookupNamespaceURI('s')); ////"http://www.w3.org/2000/svg"
```

- Document类型的变化

`createElementNS(namespaceURI, tagName)` 创建新元素
`createAttributeNS(namespaceURI, attributeName)` 创建新特性
`getElementsByTagNameNS(namespaceURI, tagName)` 返回tagName元素的NodeList

- Element类型变化

`getAttributeNS(namespaceURI,localName)`命名为 命名空间且命名为`localName`
`getAttributeNodeNS(namespaceURI,localName)` 缺德命名空间且命名为`localName`的特性节点
`getElementsByTagNameNS(namespaceURI, tagName)` 返回命名空间`tagName`元素的`NodeList`
`hasAttributeNS(namespaceURI,localName)` 确定当前元素是否有一个特性
`removeAttriubteNS(namespaceURI,localName)` 删除特性
`setAttributeNS(namespaceURI,qualifiedName,value)` 设置特性名
`setAttributeNodeNS(attNode)` 设置命名空间的特性节点


- NameNodeMap类型的变化

`getNamedItemNS(namespaceURI,localName)`取得命名空间，并重新命名为`localName`
`removeNamedItemNS(namespaceURI,localName)` 删除命名空间且名为`localName`
`setNamedItemNS(node)` 添加node,已经事先指定命名空间信息

### 其他方面变化

- documentType类型变化
```js
console.log(document.doctype.publicId, document.doctype.systemId); //文档类型声明声明 chrome 中没有显示
```

`internalSubset`用于访问包含在文档类型声明中额外定义


- Document类型的变化

- Node类型的变化

- 框架的变化

在DOM2中有个新属性`contentDocument`包含一个指针，指向表示矿建内容的文档对象，里面包含属性和方法

```js
var iframe = document.getElementById('myIframe');
 iframe = iframe.contentDocument; // ie8前无效
```