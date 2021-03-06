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
// var div = document.getElementById('myDiv');
// EventUtil.addHandler(div, 'mousedown', function (event) {
//     event = EventUtil.getEvent(event);
//     console.log(EventUtil.getButton(event));
// });
//
// EventUtil.addHandler(window, 'load', function (event) {
//     var list = document.getElementById('myList');
//     EventUtil.addHandler(document, 'DOMSubtreeModified', function (event) {
//         console.log(event.type);
//         console.log(event.target);
//     })
//
//     EventUtil.addHandler(document, 'DOMNodeRemoved', function (event) {
//         console.log(event.type);
//         console.log(event.target);
//         console.log(event.relatedNode);
//     })
//
//     EventUtil.addHandler(list.firstChild, 'DOMNodeRemovedFromDocument', function (event) {
//         console.log(event.type);
//     })
// })
//
// EventUtil.addHandler(window, 'load', function (event) {
//     var list = document.getElementById('myList');
//     var item = document.createElement('li');
//     EventUtil.addHandler(document, 'DOMSubtreeModified', function (event) {
//         console.log(event.type);
//         console.log(event.target);
//     })
//
//     EventUtil.addHandler(document, 'DOMNodeInserted', function (event) {
//         console.log(event.type);
//         console.log(event.target);
//         console.log(event.relatedNode);
//     })
//
//     EventUtil.addHandler(item, 'DOMNodeInsertedIntoDocument', function (event) {
//         console.log(event.type);
//     })
// })
//
// EventUtil.addHandler(window, "load", function(event){
//     var div = document.getElementById("myDiv");
//     EventUtil.addHandler(div, "contextmenu", function(event){
//         event = EventUtil.getEvent(event);
//         EventUtil.preventDefault(event);
//         var menu = document.getElementById("myMenu");
//         menu.style.left = event.clientX + "px";
//         menu.style.top = event.clientY + "px";
//         menu.style.visibility = "visible";
//     });
//     EventUtil.addHandler(document, "click", function(event){ document.getElementById("myMenu").style.visibility = "hidden";
//     });
// });
//
// EventUtil.addHandler(window, 'beforeunload', function (event) {
//     event = EventUtil.getEvent(event);
//     var message = 'miss you if you go';
//     event.returnValue = message;
//     return message;
// })

// (function(){
//     var showCount = 0;
//     EventUtil.addHandler(window, "load", function(){
//         alert("Load fired");
//     });
//     EventUtil.addHandler(window, "pageshow", function(){
//         showCount++;
//         alert("Show has been fired " + showCount + " times.");
//     });
// })();

// function handleTouchEvent () {
//     if(event.touches.length === 1) {
//         var output = document.getElementById('output');
//         switch(event.type) {
//             case 'touchstart':
//                 output.innerHTML = 'Touch start (' + event.touches[0].clientX + ',' +　event.touches[0].clientY + ')';
//                 break;
//         }
//     }
// }
//
// EventUtil.addHandler(document, 'touchstart', handleTouchEvent)

var list = document.getElementById('myLinks');
EventUtil.addHandler(list, 'click', function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    switch(target.id) {
        case 'doSomething':
            document.title = 'I changed the document title';
            break;
        case 'goSomewhere':
            console.log(22);
            break;
        case 'sayHi':
            console.log('hi');
    }
})

