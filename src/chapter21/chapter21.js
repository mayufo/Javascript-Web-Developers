var xhr = new XMLHttpRequest();

console.log(xhr);
//
// xhr.open('get', 'example.txt', false);
// xhr.send(null);
//
// if((xhr.status >= 200 &&　xhr.status < 300) ||　xhr.status == 304) {
//     console.log(xhr.responseText);
// } else {
//     console.log('unsuccessful');
// }
//
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if(xhr.readyState == 4) {
//         if((xhr.status >= 200 &&　xhr.status < 300) ||　xhr.status == 304) {
//             console.log(xhr.responseText);
//         } else {
//             console.log('unsuccessful');
//         }
//     }
// }
//
// xhr.open('get', 'example.txt', true);
// xhr.send(null);
//
// function addURLParam(url, name, value) {
//     url += (url.indexOf('?') == -1 ? '?': '&');
//     url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
//     return url;
// }
//
// function submitData() {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if(xhr.readyState == 4) {
//             if((xhr.status >= 200 &&　xhr.status < 300) ||　xhr.status == 304) {
//                 console.log(xhr.responseText);
//             } else {
//                 console.log('unsuccessful');
//             }
//         }
//     };
//
//     xhr.open('post', 'postexample.php', true);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.send(serialize(form));
// }
//
//
// xhr.open('post', 'postexample.php', true);
// xhr.timeout = 1000;
// xhr.ontimeout = function () {
//     console.log('Request did not return in a second');
// }
// xhr.send(null);

var xhr = new XMLHttpRequest();
xhr.onload = function () {
    if(xhr.readyState == 4) {
        if((xhr.status >= 200 &&　xhr.status < 300) ||　xhr.status == 304) {
            console.log(xhr.responseText);
        } else {
            console.log('unsuccessful');
        }
    }
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if('widthCredentials' in xhr) {
        xhr.open(method, url, true)
    } else if (typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null
    }
    return xhr;
}

var request = createCORSRequest('get', 'http://www.baidu.com');
if(request) {
    request.onload = function () {

    }

    request.send();
}