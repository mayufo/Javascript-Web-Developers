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
