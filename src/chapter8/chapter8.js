// var age = '28';
// window.color = 'red';
//
// delete window.age;
// delete window.color;
//
// console.log(window.age); // undefined
// console.log(window.color); //undefined
//
// var newValue = window.oldValue;
// console.log(newValue);
//
// var leftPos = (typeof window.screenLeft == 'number') ? window.screenLeft:window.screenX;
// var topPos = (typeof window.screenTop == 'number') ?　window.screenTop:window.screenY;
//
// console.log(leftPos, topPos,33);
//
// var pageWidth = window.innerWidth,
//     pageHeight = window.innerHeight;
//
// if(typeof pageWidth != 'number') {
//     if(document.compatMode == 'CSS1Compat') {
//         pageWidth = document.documentElement.clientWidth;
//         pageHeight = document.documentElement.clientHeight;
//     } else {
//         pageWidth = document.body.clientWidth;
//         pageHeight = document.body.clientHeight;
//     }
// }
//
// console.log(pageWidth, pageHeight);


// var num = 0;
// var max = 10;
// var intervalId = null;
//
// function incrementNumber() {
//     num++;
//     console.log(num);
//     if(num === max) {
//         clearInterval(intervalId);
//         console.log('done');
//     }
// }
//
// intervalId = setInterval(incrementNumber, 500);

// var num1 = 0;
// var max1 = 10;
// function incrementNumber1() {
//     num1++;
//     console.log(num1);
//     if(num1 < max1) {
//         setTimeout(incrementNumber1, 500)
//     } else {
//         console.log('done');
//     }
// }
//
// setTimeout(incrementNumber1, 500);

// if(confirm('Are you sure?')) {
//     console.log('so glad you sure');
// } else {
//     console.log('you not sure');
// }


// var result = prompt('what is your name?', 'may');
// if(result !== null) {
//     console.log('welcome ' + result);
// }

// function getQueryStringArgs() {
//
//     var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
//         args = {},
//         items = qs.length ? qs.split('&') : [],
//         item = null,
//         name = null,
//         value = null,
//         len = items.length;
//     for (var i = 0; i < len; i++) {
//         item = items[i].split('=');
//         name = decodeURIComponent(item[0]);
//         value = decodeURIComponent(item[1]);
//
//         if(name.length) {
//             args[name] = value;
//         }
//     }
//
//     return args;
// }
// // 假设 location.search = '?q=javascript&num=10';
// var args = getQueryStringArgs();
// console.log(args['q'],22);
// console.log(args['num']);

location.replace('http://www.baidu.com/')


