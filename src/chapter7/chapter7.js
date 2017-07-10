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


var name = 'the window';

var object = {
    name: 'my object',
    getName: function () {
        return this.name;
    }
}

console.log(object.getName()); // my object
console.log((object.getName)()); // my object
console.log((object.getName = object.getName)()); // 全局 没有显示

function assignHandler() {

    var element = document.getElementsById('someElement');
    element.onclick = function () {
        console.log(element.id);
    }
}