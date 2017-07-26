// function isArray(value) {
//     return Object.prototype.toString.call(value) == '[object Array]'
// }
//
// console.log(isArray([1, 2, 3]));
// console.log(isArray(234));
//
// function isFunction(value) {
//     return Object.prototype.toString.call(value) == '[object Function]'
// }
//
// console.log(isFunction(isArray));
// console.log(isFunction(1112));
//
// function isRegExp(value) {
//     return Object.prototype.toString.call(value) == '[object RegExp]'
// }
//
// console.log(isRegExp(/\w/g));
// console.log(isRegExp(11));
//
// function isNativeJSON(value) {
//     return window.JSON && Object.prototype.toString.call(value) == '[object JSON]'
// }
//
// console.log(isNativeJSON({
//     "name": "Nicholas",
//     "age": 29
// }));
//
// console.log(isNativeJSON(1));
//
// function Person(name, age, job) {
//     this.name = name;
//     this.age = age;
//     this.job = job
// }
//
// console.log(new Person('may', 18, 'software'));
//
// Person('may', 18, 'software');
//
// console.log(window.name);
//
// function PersonO(name, age, job) {
//     if(this instanceof PersonO) {
//         this.name = name;
//         this.age = age;
//         this.job = job;
//     } else {
//         return new Person(name, age, job);
//     }
// }
//
//
// function Polygon(sides) {
//     if (this instanceof Polygon) {
//         this.sides = sides;
//         this.getArea = function() {
//             return 0
//         }
//     } else {
//         return new Polygon(sides)
//     }
// }
//
// function Rectangle(width, height){
//     Polygon.call(this, 2);
//     this.width = width;
//     this.height = height;
//     this.getArea = function(){
//         return this.width * this.height;
//     };
// }
// var rect = new Rectangle(5, 10);
// console.log(rect.sides);
//
//
// function createXHR(){
//     if (typeof XMLHttpRequest != "undefined"){
//         return new XMLHttpRequest();
//     } else if (typeof ActiveXObject != "undefined"){
//         if (typeof arguments.callee.activeXString != "string"){
//             var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
//                     "MSXML2.XMLHttp"],
//                 i,len;
//             for (i=0,len=versions.length; i < len; i++){
//                 try {
//                     new ActiveXObject(versions[i]);
//                     arguments.callee.activeXString = versions[i];
//                     break;
//                 } catch (ex){
//                     ࡗ//ཌ
//                 }
//             }
//         }
//         return new ActiveXObject(arguments.callee.activeXString);
//     } else {
//         throw new Error("No XHR object available.");
//     }
// }
//
// function createXHR() {
//     if (typeof XMLHttpRequest != "undefined"){
//         createXHR = function(){
//             return new XMLHttpRequest();
//         }
//     }  else if (typeof ActiveXObject != "undefined"){
//         createXHR = function(){
//             if (typeof arguments.callee.activeXString != "string"){
//                 var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
//                         "MSXML2.XMLHttp"],
//                     i, len;
//                 for (i=0,len=versions.length; i < len; i++){
//                     try {
//                         new ActiveXObject(versions[i]);
//                         arguments.callee.activeXString = versions[i];
//                         break;
//                     } catch (ex){
//                     }
//                 }
//             }
//             return new ActiveXObject(arguments.callee.activeXString);
//         };
//     } else {
//         createXHR = function(){
//             throw new Error("No XHR object available.");
//         };
//     }
//     return createXHR();
// }
//
// var createXHR = (function(){
//     if (typeof XMLHttpRequest != "undefined"){
//         return function(){
//             return new XMLHttpRequest();
//         };
//     } else if (typeof ActiveXObject != "undefined"){
//         return function(){
//             if (typeof arguments.callee.activeXString != "string"){
//                 var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
//                         "MSXML2.XMLHttp"],
//                     i, len;
//                 for (i=0,len=versions.length; i < len; i++){
//                     try {
//                         new ActiveXObject(versions[i]);
//                         arguments.callee.activeXString = versions[i];
//                         break;
//                     } catch (ex){
//
//                     }
//                 }
//             }
//             return new ActiveXObject(arguments.callee.activeXString);
//         };
//     } else {
//         return function(){
//             throw new Error("No XHR object available.");
//         };
//     }
// })();
//
// var handler = {
//     message: 'Event handled',
//     handeClick: function (event) {
//         console.log(this.message);
//     }
// }
// var btn = document.getElementById("my-btn");
// EventUtil.addHandler(btn, 'click', function (event) {
//     handler.handeClick(event)
// })

// function curry(fn) {
//     var args = Array.prototype.slice.call(arguments, 1);
//     console.log(args);  //5
//     return function () {
//         var innerArgs = Array.prototype.slice.call(arguments); //12
//         console.log(innerArgs);
//         var finalArgs = args.concat(innerArgs);
//         return fn.apply(null, finalArgs)
//     }
// }
//
// var num = curry(add, 5)
// console.log(num(12));
//
// function add(num1, num2) {
//     return num1 + num2
// }
//
// function bind(fn, context) {
//     var args = Array.prototype.slice.call(arguments, 2);
//     return function () {
//         var innerArg = Array.prototype.slice.call(arguments);
//         var finalArg = args.concat(innerArg);
//         return fn.apply(context, finalArg)
//     }
// }
//
//
// var person = {name:'Nicholas'}
// console.log(Object.isExtensible(person), 22);
// Object.preventExtensions(person);
// console.log(Object.isExtensible(person),11111);
// person.age = 29;
// console.log(person.age);

// var person2 = {name:'Nicholas'};
// Object.seal(person2);
// person2.name = 'may';
// console.log(person2.name);
//
// delete person2.name;
// console.log(person2.name);


// var person3 = {name:'Nicholas'};
//
// Object.freeze(person3);
//
// person3.age = 29;
// console.log(person3.age);
//
// delete person3.name;
//
// console.log(person3.name);

// function chunk(array, process, context) {
//     setTimeout(function() {
//         var item = array.shift();
//         process.call(context, item);
//         if(array.length > 0) {
//             setTimeout(arguments.callee, 100)
//         }
//     }, 100)
// }
//
// var data = [12,123,1234,453,436,23,23,5,4123,45,346,5634,2234,345,342];
// function printValue(item){
//     var div = document.getElementById("myDiv");
//     div.innerHTML += item + "<br>";
// }
// chunk(data, printValue);
//
// var processor = {
//     timeoutId: null,
//     performProcessing: function () {
//         // 实际执行的代码
//     },
//     process: function () {
//         clearTimeout(this.timeoutId);
//         var that = this;
//         this.timeoutId = setTimeout(function () {
//             that.performProcessing();
//         }, 100)
//     }
// }
//
// processor.process();

// function throttle(method, context) {
//     clearTimeout(method.tId);
//     method.tIdprocess = setTimeout(function() {
//         method.call(context);
//     }, 100)
// }
//
// function resizeDiv(){
//     var div = document.getElementById("myDiv");
//     div.style.height = div.offsetWidth + "px";
// }
//
//
// window.onresize = function(){
//     throttle(resizeDiv);
// }


function EventTarget() {
    this.handlers = {}
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function(type, handler){
        if (typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function(event){
        if (!event.target){
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for (var i=0, len=handlers.length; i < len; i++){
                handlers[i](event);
            }
        }
    },
    removedHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for (var i=0, len=handlers.length; i < len; i++){
                if (handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
}

// function handleMessage(event) {
//     console.log('Message received' + event.message);
// }
//
// var target = new EventTarget();
// target.addHandler('message', handleMessage);
//
// target.fire({type: 'message', message: 'hello world'});

// target.removedHandler('message', handleMessage)

// function inheritPrototype(subType, superType){
//     var prototype = Object(superType.prototype); // 创建对象
//     prototype.constructor = subType; // 增强对象
//     subType.prototype = prototype; // 制定对象
// }
//
// function Person(name, age){
//     EventTarget.call(this);
//     this.name = name;
//     this.age = age;
// }
// inheritPrototype(Person,EventTarget);
//
//
// Person.prototype.say = function(message){
//     this.fire({type: "message", message: message});
// };
//
// function handleMessage(event){
//     alert(event.target.name + " says: " + event.message);
// }
//
// var person = new Person('may', 18);
// person.addHandler('message', handleMessage);
// person.say('hi there')


var EventUtil = {
    addHandler: function(element, type, handler) {
        if( element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler
        }
    },

    removeHandler: function(element, type, handler) {
        if(element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if( element.detachEvent) {
            element.detachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler
        }
    },
    getEvent: function(event) {
        return event ? event: window.event;
    },
    getTarget: function(event) {
        return event.target ||　event.srcElement;
    },
    preventDefault: function(event) {
        if(event.preventDefault) {
            event.preventDefault()
        } else {
            event.retrunValue = false;
        }
    },
    stopPropagation: function(event) {
        if(event.stopPropagation) {
            event.stopPropagation
        } else {
            event.cancelBubble = true;
        }
    },
    getRelatedTarget: function(event) {

        debugger
        if(event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement
        } else {
            return null;
        }
    },
    getButton: function (event) {
        debugger
        if(document.implementation.hasFeature('MouseEvents', '2.0')) {
            return event.button;
        } else {
            switch(event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },

    getWheelDelta: function (event) {
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40; // 保证和其他浏览器相同
        }
    },

    getCharCode: function (event) {
        if(typeof event.charCode == 'number') {
            return event.charCode
        } else {
            return event.keyCode
        }
    }
}
//
// EventUtil.addHandler(document, "mousemove", function(event){
//     var myDiv = document.getElementById("myDiv");
//     myDiv.style.left = event.clientX + "px";
//     myDiv.style.top = event.clientY + "px";
// });





// var DragDrop = function(){
//
//     var dragging = null,
//         diffX = 0,
//         diffY = 0;
//
//     function handleEvent(event){
//
//         //get event and target
//         event = EventUtil.getEvent(event);
//         var target = EventUtil.getTarget(event);
//
//         //determine the type of event
//         switch(event.type){
//             case "mousedown":
//                 if (target.className.indexOf("draggable") > -1){
//                     dragging = target;
//                     diffX = event.clientX - target.offsetLeft;
//                     diffY = event.clientY - target.offsetTop;
//                 }
//                 break;
//
//             case "mousemove":
//                 if (dragging !== null){
//
//                     //assign location
//                     dragging.style.left = (event.clientX - diffX) + "px";
//                     dragging.style.top = (event.clientY - diffY) + "px";
//                 }
//                 break;
//
//             case "mouseup":
//                 dragging = null;
//                 break;
//         }
//     };
//
//     //public interface
//     return {
//         enable: function(){
//             EventUtil.addHandler(document, "mousedown", handleEvent);
//             EventUtil.addHandler(document, "mousemove", handleEvent);
//             EventUtil.addHandler(document, "mouseup", handleEvent);
//         },
//
//         disable: function(){
//             EventUtil.removeHandler(document, "mousedown", handleEvent);
//             EventUtil.removeHandler(document, "mousemove", handleEvent);
//             EventUtil.removeHandler(document, "mouseup", handleEvent);
//         }
//     }
// }();


var DragDrop = function(){

    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;

    function handleEvent(event){

        //get event and target
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        //determine the type of event
        switch(event.type){
            case "mousedown":
                if (target.className.indexOf("draggable") > -1){
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({type:"dragstart", target: dragging,
                        x: event.clientX, y: event.clientY});
                }
                break;

            case "mousemove":
                if (dragging !== null){

                    //assign location
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                    dragdrop.fire({type:"drag", target: dragging,
                        x: event.clientX, y: event.clientY});
                }
                break;

            case "mouseup":
                dragdrop.fire({type:"dragend", target: dragging,
                    x: event.clientX, y: event.clientY});
                dragging = null;
                dragging = null;
                break;
        }
    };
    //public interface
    dragdrop.enable = function(){
        EventUtil.addHandler(document, "mousedown", handleEvent);
        EventUtil.addHandler(document, "mousemove", handleEvent);
        EventUtil.addHandler(document, "mouseup", handleEvent);
    };
    dragdrop.disable = function(){
        EventUtil.removeHandler(document, "mousedown", handleEvent);
        EventUtil.removeHandler(document, "mousemove", handleEvent);
        EventUtil.removeHandler(document, "mouseup", handleEvent);
    };
    return dragdrop;
}();

DragDrop.enable();

DragDrop.addHandler("dragstart", function(event){
    var status = document.getElementById("status");
    status.innerHTML = "Started dragging " + event.target.id;
});
DragDrop.addHandler("drag", function(event){
    var status = document.getElementById("status");
    status.innerHTML += "<br/> Dragged " + event.target.id + " to (" + event.x +
        "," + event.y + ")";
});
DragDrop.addHandler("dragend", function(event){
    var status = document.getElementById("status");
    status.innerHTML += "<br/> Dropped " + event.target.id + " at (" + event.x +
        "," + event.y + ")";
});

