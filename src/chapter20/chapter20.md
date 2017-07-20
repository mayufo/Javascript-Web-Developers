# JSON

是一种数据格式

## 语法

表示一下三种类型的值

- 简单值
- 对象
- 数组

### 简单值

最简单的JSON数据形势就是简单值

```json
5
"hello world!"
```

JSON字符串必须使用双引号

### 对象

```json
{
  'name': 'may',
  'age': 18
}
```

### 数组

```json
{
  'title': 'zoo',
  'animal': [
    'cat', 'dog'
  ]
}
```

## 解析与序列化

json数据解构解析为可用的js对象

### JSON对象

`stringify()` js对象序列化为json
`parse()` json序列化为js

```js
var book = {
    title: 'may',
    author: ['may'],
    'edition': 3
}
var jsonText = JSON.stringify(book);
console.log(jsonText); //{"title":"may","author":["may"],"edition":3}
```


序列化js对象是，所有函数及原型成员都会被狐狸，指为undefined的属性会被跳过

### 序列化选项

`JSON.stringify()`序列化js对象,另外接收两个参数，第二个参数是过滤器，可以是一个数组也可以是一个函数，第三个参数是一个选项，表示是否在jons字符串中保留缩进

- 过滤结果

如果过滤器参数是`数组`，那么`JSON.stringify()`结果将只包含数组中列出的属性

```js
console.log(JSON.stringify(book, ['title', 'edition']))
```
如果过滤器参数是`函数`,传入的函数接受两个参数，属性键名和属性值

```js
var jsonText1 = JSON.stringify(book, function(key, value){
    switch(key){
        case "authors":
            return value.join(",")
        case "year":
            return 5000;
        case "edition":
            return undefined;
        default:
            return value;
    }
});

console.log(jsonText1);
```

- 字符串缩进

第三个参数控制结果中的缩进和空白符


```js
console.log(JSON.stringify(book, null, 4));
//{
//    "title": "Professional JavaScript",
//    "authors": [
//        "Nicholas C. Zakas"
//    ],
//   "edition": 3,
//    "year": 2011
//}

```

最大缩进空格是10
如果缩进参数是一个字符串而非数值，字符串将在json中用作缩进字符


```js
console.log(JSON.stringify(book, null, '- -'));

// {
//     - -"title": "Professional JavaScript",
//     - -"authors": [
//     - -- -"Nicholas C. Zakas"
//     - -],
//     - -"edition": 3,
//     - -"year": 2011
// }
```

- toJSON()方法

`JSON.stringify()`不能满足某些对象进行自定义化的想，可以给对象定义 `toJSON()`方法，返回其自身的JSON数据格式

```js
var book3 = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011,
    toJSON: function(){
        return this.title;
    }

}

var jsonText3 = JSON.stringify(book3);

console.log(jsonText3); // "Professional JavaScript"
```

`toJSON()`可以作为函数过滤器的补充

### 解析选项

`JSON.parse()`也叫还原函数，方法也可以接受另外一个参数，参数是一个函数，函数接受两个参数，一个键一个值，返回一个值

如果还原函数返回undefined,表示要从结果中删除相应的键，如果返回其他值，则值插入结果中

```js
var book4 = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011,
    releaseDate: new Date(2011, 11, 1)
}

var jsonText4 = JSON.stringify(book4);

var bookCopy = JSON.parse(jsonText4,function (key, value) {
    if(key == 'releaseDate') {
        return new Date(value);
    } else {
        return value;
    }
})

console.log(bookCopy.releaseDate.getFullYear());
```


