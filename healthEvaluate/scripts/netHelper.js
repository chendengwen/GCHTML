
var Config = function(window, undefined) {
    let baseUrl = "http://yapi.demo.qunar.com/mock/28962/gary/test/";

    this.APIs = {
        'LoginApi': "login",
        'RegisterApi': "register",
        'UserInfoApi': "getUserInfo",
        'LoginOutApi': "loginOut",
    };

    this.getUrl = function(api,params) {
        var paramStr = '?';
        for (var key in params) {
            var value = params[key] || '';
            paramStr += key + '=' + value + '&';
        }
        paramStr = paramStr.substring(0, paramStr.length - 1)
        
        return baseUrl + api + paramStr;
    }
}