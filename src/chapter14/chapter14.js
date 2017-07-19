// function selText() {
//     document.getElementById("txt1").select()
// }
//
// var EventUtil = {
//     getClipboardText: function (event) {
//         var clipboardData = (event.clipboardData || window.clipboardData);
//         return clipboardData.getData('text');
//     },
//     setClipboardText: function (event, value) {
//         if(event.clipboardData) {
//             return event.clipboardData.setData('text/plain', value);
//         } else if (window.clipboardData) {
//             return window.clipboardData.setData('text', value);
//         }
//     }
// }
//
// EventUtil.addHandler(textbox, 'paste', function (event) {
//     event = EventUtil.getEvent(event);
//     var text = EventUtil.getClipboardText(event);
//
//     if (!/^\d*$/.test(text)){
//         EventUtil.preventDefault(event);
//     }
// })
//
// (function () {
//   function tabForward() {
//       event = EventUtil.getEvent(event);
//       var target = EventUtil.getTarget(event);
//       if(target.value.length == target.maxLength) {
//           var form = target.form;
//           for(var i = 0, len = form.elements.length; i < len; i++) {
//               if(form.elements[i] == target) {
//                   if(form.elements[i+1]) {
//                       form.elements[i+1].focus();
//                   }
//                   return;
//               }
//           }
//       }
//   }
//
//     var textbox1 = document.getElementById("txtTel1");
//     var textbox2 = document.getElementById("txtTel2");
//     var textbox3 = document.getElementById("txtTel3");
//     EventUtil.addHandler(textbox1, "keyup", tabForward);
//     EventUtil.addHandler(textbox2, "keyup", tabForward);
//     EventUtil.addHandler(textbox3, "keyup", tabForward);
//
// })()

// function getSelectedOptions(selectbox) {
//     var result = new Array();
//     var option = null;
//
//     for (var i = 0, len = selectbox.options.length; i < len; i++) {
//         option = selectbox.options[i];
//         if (option.selected) {
//             result.push(option)
//         }
//     }
//
//     return result
// }
//
// var selectbox = document.getElementById('selLocation');
//
// console.log(getSelectedOptions(selectbox));
//
// var newOption = document.createElement('option');
// newOption.appendChild(document.createTextNode('Option text'));
// newOption.setAttribute('value', 'Option value');
// selectbox.appendChild(newOption)
//
// var newOption1 = new Option('Option text1', 'Option value1');
// selectbox.appendChild(newOption1)
//
// var newOption2 = new Option('Option text3', 'Option value3');
// selectbox.add(newOption2, undefined);
//
//
// function serialize(form) {
//     var parts = [];
//     for (var i = 0, len = form.elements.length; i < len; i++) {
//         var field = form.elements[i];
//         switch (field.type) {
//             case "select-one":
//             case "select-multiple":
//                 if (field.name.length) {
//                     for (var j = 0, optLen = field.options.length; j < optLen; j++) {
//                         var option = field.options[j];
//                         if (option.selected) {
//                             var optValue = "";
//                             if (option.hasAttribute) {
//                                 optValue = (option.hasAttribute("value") ?
//                                     option.value : option.text);
//                             } else {
//                                 optValue = (option.attributes["value"].specified ?
//                                     option.value : option.text);
//                             }
//                             parts.push(encodeURIComponent(field.name) + "=" +
//                                 encodeURIComponent(optValue));
//                         }
//                     }
//                 }
//                 break;
//             case undefined:
//             case "file":
//             case "submit":
//             case "reset":
//             case "button":
//                 break;
//             case "radio":
//             case "checkbox":
//                 if (!field.checked) {
//                     break;
//                 }
//
//             default:
//                 if (field.name.length) {
//                     parts.push(encodeURIComponent(field.name) + "=" +
//                         encodeURIComponent(field.value));
//                 }
//         }
//     }
//     return parts.join("&");
// }

// window.load = function () {
//     frames["richedit"].document.designMode = "on";
// }

var div = document.getElementById("richedit");
div.contentEditable = "true";