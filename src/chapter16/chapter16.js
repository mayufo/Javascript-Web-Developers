EventUtil.addHandler(window, 'message', function (event) {
    if(event.origin == 'http:// www.wrox.com') {
        processMessage(event.data);
        event.source.postMessage('Received', 'http://p2p.wrox.com')
    }
})



EventUtil.addHandler(droptarget, 'dragover', function (event) {
    EventUtil.preventDefault(event)
})

EventUtil.addHandler(droptarget, 'dragenter', function (event) {
    EventUtil.preventDefault(event)
})

event.dataTransfer.setData('text', 'some text');
var text = event.dataTransfer.getData('text');