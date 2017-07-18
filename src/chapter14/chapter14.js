// function selText() {
//     document.getElementById("txt1").select()
// }

var EventUtil = {
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData('text');
    },
    setClipboardText: function (event, value) {
        if(event.clipboardData) {
            return event.clipboardData.setData('text/plain', value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData('text', value);
        }
    }
}

EventUtil.addHandler(textbox, 'paste', function (event) {
    event = EventUtil.getEvent(event);
    var text = EventUtil.getClipboardText(event);

    if (!/^\d*$/.test(text)){
        EventUtil.preventDefault(event);
    }
})

(function () {
  function tabForward() {
      event = EventUtil.getEvent(event);
      var target = EventUtil.getTarget(event);
      if(target.value.length == target.maxLength) {
          var form = target.form;
          for(var i = 0, len = form.elements.length; i < len; i++) {
              if(form.elements[i] == target) {
                  if(form.elements[i+1]) {
                      form.elements[i+1].focus();
                  }
                  return;
              }
          }
      }
  }

    var textbox1 = document.getElementById("txtTel1");
    var textbox2 = document.getElementById("txtTel2");
    var textbox3 = document.getElementById("txtTel3");
    EventUtil.addHandler(textbox1, "keyup", tabForward);
    EventUtil.addHandler(textbox2, "keyup", tabForward);
    EventUtil.addHandler(textbox3, "keyup", tabForward);

})()