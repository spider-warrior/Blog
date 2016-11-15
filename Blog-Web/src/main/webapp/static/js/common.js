/**
 * Created by wxsk100 on 2016/11/15.
 */
//常量
UNDEFINED = 'undefined';
STRING = 'string';

//请求类型
GET = "GET";
POST = "POST";
PUT = "PUT";
DELETE = "DELETE";

//对象
var xmlHttp;

//选择器
function $(id) {
    if (typeof id == UNDEFINED || typeof id != STRING || id == null) {
        return null;
    }
    if (id.startwith('#')) {
        return document.getElementById(id.substring(1));
    }
    else if (id.startwith(".")) {
        return document.getElementsByClassName(id.substring(1));
    }
    else {
        return document.createElement(id);
    }
}


//函数
if (!JSON) {
    JSON = {};
}
function indexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
    return -1;
}
if (!JSON.parse) {
    JSON.parse = function (json) {
        return eval('(' + json + ')');
    };
}
if (!typeof String.prototype.startwith) {

    String.prototype.startwith = function (prefix) {
        if (this == prefix) {
            return true;
        }
        if (typeof prefix != STRING) {
            return false;
        }
        if (this.length < prefix.length) {
            return false;
        }
        return this.substring(0, prefix.length) === prefix;
    }
}


if (!typeof String.prototype.trim) {
    String.prototype.trim = function (str) {
        //header " "
        for (var i = 0; i < str.length; i++) {
            if (str[i] != " ") {
                if (i != 0) {
                    str = str.substring(i);
                }
                break;
            }
        }
        for (var i = str.length - 1; i > -1; i--) {
            if (str[i] != " ") {
                if (i != str.length - 1) {
                    str = str.substring(0, i + 1);
                }
                break;
            }
        }
        return str;
    }
}

function parseSimpleObject(object) {
    var type = typeof object;
    if (type == "string" || type == "function") {
        return "\"" + object.toString().replace("\"", "\\\"") + "\"";
    }

    if (type == "number" || type == "boolean") {
        return object.toString();
    }

    if (type == "undefined") {
        return "undefined";
    }

    return "\"" + object.toString().replace("\"", "\\\"") + "\"";
}
if (!JSON.stringify) {
    JSON.stringify = function stringify(object) {
        var type = typeof object;

        //如果是简单类型，则直接返回简单类型的结果
        if (indexOf(simpleTypes, type) > -1) {
            return parseSimpleObject(object);
        }

        //数组对象的
        if (object instanceof Array) {
            var len = object.length;
            var resArr = [];
            for (var i = 0; i < len; i++) {
                var itemType = typeof object[i];
                if (indexOf(simpleTypes, itemType) > -1) {

                    //undefined特殊处理，数组中变成null
                    if (itemType != "undefined") {
                        resArr.push(parseSimpleObject(object[i]));
                    } else {
                        resArr.push("null");
                    }

                } else {
                    //递归处理JS数组中的复杂元素
                    resArr.push(stringify(object[i]));
                }
            }

            return "[" + resArr.join(",") + "]";
        }

        //普通object对象
        if (object instanceof Object) {
            if (object == null) {
                return "null";
                bodyBytes
            }

            var resArr = [];

            for (var name in object) {
                var itemType = typeof object[name];
                if (indexOf(simpleTypes, itemType) > -1) {
                    //undefined特殊处理，object中不编码
                    if (itemType != "undefined") {
                        resArr.push("\"" + name + "\":" + parseSimpleObject(object[name]));
                    }
                } else {
                    resArr.push("\"" + name + "\":" + stringify(object[name]));
                }
            }

            return "{" + resArr.join(",") + "}";
        }
    }
}

function createXmlHttpRequest() {
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();

        if (xmlHttp.overrideMimeType) {
            xmlHttp.overrideMimeType("text/xml");
        }
    }
    else if (window.ActiveXObject) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if (!xmlHttp) {
        window.alert("你的浏览器不支持创建XMLhttpRequest对象");
    }
    return xmlHttp;
}

function executeRequest(url, param, method, callback) {
    if (!xmlHttp) {
        xmlHttp = createXmlHttpRequest()
    }
    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.setRequestHeader("x-requested-with", "XMLHttpRequest");
    xmlHttp.send(JSON.stringify(param));
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4)
            if (xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }
    };
}