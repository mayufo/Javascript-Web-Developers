// function factorial(num) {
//     if(num <=1) {
//         return 1;
//     } else {
//         return num * factorial(num - 1);
//     }
// }
//
//
// function createFunctions() {
//     var result = new Array();
//     for (var i = 0; i < 10; i++) {
//         result[i] = function () {
//             return i;
//         }
//     }
//
//     return result;
// }
//
// function createFunction() {
//     var result= new Array();
//     for (var i = 0; i < 10; i++) {
//         result[i] = function (num) {
//             return function () {
//                 return num
//             }
//         }
//     }
// }
//
// var name = "The Window";
// var object = {
//     name: "My Object",
//     getNameFunc: function () {
//         return function () {
//             return this.name;
//         };
//     }
// };
// console.log(object.getNameFunc()(), 222);
//
// var name = "The Window";
// var object = {
//     name: "My Object",
//     getNameFunc: function () {
//         var that = this;
//         return function () {
//             return that.name;
//         };
//     }
// };
//
// console.log(object.getNameFunc()(), 3333);

//
// var name = 'the window';
//
// var object = {
//     name: 'my object',
//     getName: function () {
//         return this.name;
//     }
// }
//
// console.log(object.getName()); // my object
// console.log((object.getName)()); // my object
// console.log((object.getName = object.getName)()); // 全局 没有显示
//
// function assignHandler() {
//
//     var element = document.getElementsById('someElement');
//     element.onclick = function () {
//         console.log(element.id);
//     }
// }
//
// function outputNumbers(count) {
//     for (var i = 0; i < count; i++) {
//         console.log(i)
//     }
//     var i;
//     console.log(i, 44);
// }
// outputNumbers(5);
//
//
//
// function outputNumbers2(count) {
//     (function () {
//         for (var i = 0; i < count; i++) {
//             console.log(i)
//         }
//     })();
//     // console.log(i, 44); // 报错
// }
// outputNumbers2(5);
//
// function MyObject() {
//     var privateVariable = 10;
//     function privateFunction () {
//         return false;
//     }
//     this.publicMethod = function () {
//         privateVariable++;
//         return privateFunction();
//     }
// }
//
// (function () {
//     var privateVariable = 10;
//     function privateFunction() {
//         return false
//     }
//
//     MyObject = function () {
//
//     };
//
//     MyObject.prototype.publicMethod = function () {
//         privateVariable++;
//         return privateFunction();
//     }
// })()

// (function () {
//     var name = '';
//
//     Person = function (value) {
//         name = value;
//     }
//
//     Person.prototype.getName = function () {
//         return name;
//     }
//
//     Person.prototype.setName = function (value) {
//         name = value;
//     }
// })()
//
// var person1 = new Person('may');
// console.log(person1.getName()); // may
// person1.setName('liu');
// console.log(person1.getName()); // liu
//
//
// var singleton = {
//     name: value,
//     method: function () {
//
//     }
// }


var sigleton = function () {
    var privateVariable = 10;

    function privateFunction() {
        return false
    }

    return {
        publicProperty: true,
        publicMethod: function () {
            privateVariable++;
            return privateFunction();
        }
    }
}

var application = function () {
    // 私有变量和函数
    var components = new Array();
    // 初始化
    components.push(new BaseComponent());
    // 创建局部副本
    var app = new BaseComponent();

    // 公共接口
    app.getComponentCount = function () {
        return components.length;
    }

    app.registerComponent = function (component) {
        if(typeof component == 'object'){
            components.push(component);
        }
    }
    // 返回副本
    return app;
}