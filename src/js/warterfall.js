(function() {
    var columnH = [],
        num = 1,
        flag = false;

    function init() {
        ajaxFun("get", "getPics.php", "cpage=1", showlist, true);
    }

    function ajaxFun(method, url, data, callback, flag) {
        var xhr = null,
            method = method.toUpperCase();
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHttp');
        }
        if (method == "GET") {
            xhr.open(method, url + '?' + data, flag);
            xhr.send();
        } else if (method == "POST") {
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(xhr.responseText);
                }
            }
        }
    }

    function showlist(data) {
        var str = JSON.parse(data),
            elem = '',
            imgH = 0,
            content = document.getElementsByClassName("wrapper")[0],
            minIndex;
        if (str.length > 0) {
            str.forEach(function(item, index) {
                var oDiv = document.createElement("div");
                oDiv.className = "box";
                imgH = Math.ceil(228 * item.height / item.width);
                elem = '<a href="' + item.url + '" alt ="' + item.title + '" style="height:' + imgH + 'px">\
				        <img src ="' + item.preview + '" height ="' + imgH + '"  width="228" alt="' + item.title + '">\
				        </a>';
                elem += item.title.length == 0 ? "" : '<p>' + item.title + '</p>';
                if (index < 4 && columnH.length != 4) {
                    oDiv.style.left = 260 * index + "px";
                    oDiv.style.top = "0px";
                    oDiv.innerHTML = elem;
                    content.appendChild(oDiv);
                    columnH.push(oDiv.offsetHeight);
                } else {
                    minIndex = minH(columnH);
                    oDiv.style.left = 260 * minIndex + "px";
                    oDiv.style.top = columnH[minIndex] + 10 + "px";
                    oDiv.innerHTML = elem;
                    content.appendChild(oDiv);
                    columnH[minIndex] += oDiv.offsetHeight + 10;
                }
            });
            flag = false;
        }else{
            var div = document.createElement("div");
            div.innerHTML = "没有更多的内容展示了，亲！";
            div.className = "bot";
            document.body.appendChild(div);
        }
    }

    function showdate() {
        var Mtop = getScroll();
        pageH = parseInt(columnH[minH(columnH)]),
            MaxH = document.documentElement.clientHeight || document.body.clientHeight;
        if (pageH <= MaxH + Mtop.y) {
            if (!flag) {
                flag = true;
                num++;
                // console.log(num);
                ajaxFun("get", "getPics.php", "cpage=" + num, showlist, true);

            }

        }

    }
    init();

    window.onscroll = choke(showdate, 100);


})();


function minH(arr) {
    var minh = arr[0],
        i = 1,
        index = 0;
    for (; i < arr.length; i++) {
        if (minh > arr[i]) {
            minh = arr[i];
            index = i;
        }
    }
    return index;
}

function getScroll() {
    if (window.pageXoffset) {
        return {
            x: window.pageXoffset,
            y: window.pageYoffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

function choke(func, wait) {
    var lastTime = 0;
    return function() {
        var _self = this,
            _arg = arguments;
        var nowTime = Date.now();
        if (nowTime - lastTime > wait) {
            func.apply(_self, _arg);
            lastTime = nowTime;
        }
    }
}