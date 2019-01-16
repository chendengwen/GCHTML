import App from './src/view/App.js';
import router from "./src/router/index.js";
import store from './src/store/index.js';
import fetchManager, { _fetch } from "./src/api/fetchManager.js";

import api from './src/api/index.js';
import globalMixin from "./src/mixins/global.js";
import common from "./src/common/common.js";

Vue.config.productionTip = false;
Vue.prototype.$fetch = _fetch;
Vue.prototype.$api = api;
Vue.prototype.$common = common;

//配置请求信息
fetchManager.defaults.timeout = 30000;
fetchManager.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
fetchManager.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
fetchManager.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET,POST';

Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,               //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

//路由拦截
router.beforeEach((to, from, next) => {

  //禁止直接进入验证码和绑定成功页面
  if(to.name === "verification-code"){
    if(from.name !== "phone-number") {
      next({
        path: "/phoneNumber",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
  if(to.name === "bing-succes"){
    if(from.name !== "verification-code") {
      next({
        path: "/phoneNumber",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }

  //添加页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  let wxToken = localStorage.getItem("wxToken");
  let token = localStorage.getItem("token");
  //判断是否已经绑定
  if(!to.meta.requireAuth) {
    next();
  }
  else if(wxToken && token) {   // 判断绑定状态
    next();
  }
  else if(store.state.login === true) {   // 判断绑定状态
    next();
  } else {
    next({
      path: "/phoneNumber",
      query: {
        redirect: to.fullPath
      }
    });
  }
});


let rootApp = new Vue({
  el:'#app',
  store,
  router,
  mixins: [globalMixin],
  components: { App },
  template: '<App/>'
});


// 添加请求拦截器
fetchManager.interceptors.push((req, next) => {

  //配置token
  let str = req.url;
  let reg = RegExp(/hmmobile/);
  if(reg.exec(str)){
    let token = localStorage.getItem("token");
    if(token) {
      req.options['token'] = JSON.parse(token).Token;
    }
  }

  store.commit('updateLoadingShow');

  // //在发送请求之前,参数格式转换
  // if(req.options.method == "post"){
  //   req.options.body = qs.stringify(req.options.body);
  // }

  // 添加响应拦截器 res可能正常也可能是错误
  next((res, after) => {
    store.commit("updateLoadingHide");
    // 解析res，处理正常和错误
    // console.log('res ===',res);

    if (!res.IsSuccess) {
      rootApp.errorDialogeShow("请求错误：" + res.ReturnMessage);
      // alert(str);
      switch (res.status) {
        case 401:
          router.push({path: '/'});
          break;
        case 404:
          router.push({path: '/error?error=' + error.response.status + ":" + error.response.statusText});
          break;
        case 500:
          router.push({path: '/error?error=' + error.response.status + ":" + error.response.statusText});
          break;
      }
    }
  });
  
});

