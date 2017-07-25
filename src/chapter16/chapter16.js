// EventUtil.addHandler(window, 'message', function (event) {
//     if(event.origin == 'http:// www.wrox.com') {
//         processMessage(event.data);
//         event.source.postMessage('Received', 'http://p2p.wrox.com')
//     }
// })
//
//
//
// EventUtil.addHandler(droptarget, 'dragover', function (event) {
//     EventUtil.preventDefault(event)
// })
//
// EventUtil.addHandler(droptarget, 'dragenter', function (event) {
//     EventUtil.preventDefault(event)
// })
//
// event.dataTransfer.setData('text', 'some text');
// var text = event.dataTransfer.getData('text');

var player = document.getElementById("player"),
    btn = document.getElementById("video-btn"),
    curtime = document.getElementById("curtime"),
    duration = document.getElementById("duration");

duration.innerHTML = player.duration;

EventUtil.addHandler(btn, "click", function(event){
    if (player.paused){
        player.play();
        btn.value = "Pause";
    } else {
        player.pause();
        btn.value = "Play";
    }
});

setInterval(function(){
    curtime.innerHTML = player.currentTime;
}, 250);