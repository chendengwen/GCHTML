// 手动封装fetch，实现拦截器

var oldFetch = fetch

var newFetch = function (url, options = {}) {
    var request = {
        url,
        options
    }

    return new Promise((resolve, reject) => {
        // 设置有拦截器时使用新方法，没有拦截器就用旧方法
        if (this.interceptors.length > 0) {
            //执行请求前的拦截操作
            this.runInterceptors(0, request)
                .then(req => {
                    oldFetchFuc(this, req)
                        .then(req => {
                            resolve(req);
                        })
                        .catch(err => {
                            reject(err);
                        });
                });
        } else {
            oldFetchFuc(this, request)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        }
    });
};

var oldFetchFuc = function (that, request) {
    return new Promise((resolve, reject) => {
        if (!request.options.headers) {
            request.options.headers = {}
        }
        var options = Object.assign(request.options.headers, that.defaults.headers);
        //var options = Object.assign(request.options,that.defaults);

        console.log('Fetch request', request);
        oldFetch(request.url, request.options)
            .then(response => {
                that.interceptors_res[0](response);
                return response.json();
            })
            .then(res => {
                // 执行请求后的拦截操作
                var response = res;
                console.log('Fetch response', response);
                if (that.interceptors_after.length > 0) {
                    that.runInterceptorsAfter(0, response)
                        .then(data => {
                            resolve(data);
                        });
                }
                // 成功后的回调
                resolve(res);
            })
            .catch(err => {
                console.log('Fetch error == ', err);
                that.runInterceptorsAfter(0, err)
                reject(err);
            });
    });
};


var FetchManager = function () {
    this.defaults = {
        timeout: 1000,
        headers: {
            "Content-Type": "application/json"
        }
    }
};
FetchManager.prototype.newFetch = newFetch;
FetchManager.prototype.interceptors = [];
FetchManager.prototype.interceptors_after = [];
FetchManager.prototype.interceptors_res = [];
FetchManager.prototype.runInterceptors = function (i, request) {
    var _that = this;
    if (i == 0) this.interceptors_after = [];

    return new Promise((resolve, reject) => {
        // 数组越界处理，resolve(request)--让请求继续正常执行
        if (i >= this.interceptors.length) {
            //在Promise的excutor函数中调用resolve方法时，Promise的状态就变成fulfilled，即操作成功状态
            resolve(request);
        }

        this.interceptors[i](request, function (callback) {
            if (callback) {
                // callback 存入请求后执行的数组
                _that.interceptors_after.push(callback);
            }

            // 递归执行 i 后面的所有拦截器，用以把所有 callback 存入上面行的回调数组
            _that.runInterceptors(++i, request).then(req => {
                resolve(req);
            });
        })
    });
};

FetchManager.prototype.runInterceptorsAfter = function (i, response) {
    var _that = this;
    return new Promise((resolve, reject) => {
        if (i >= this.interceptors_after.length) {
            resolve(response);
        }

        this.interceptors_after[i](response, function () {
            _that.runInterceptorsAfter(++i, response).then(res => {
                resolve(res);
            });
        });
    });
};

var fetchManager = new FetchManager();
var _fetch = function (url, options = {}) {
    return new Promise((resolve, reject) => {
        fetchManager.newFetch(url, options)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export default fetchManager
export { _fetch } 
