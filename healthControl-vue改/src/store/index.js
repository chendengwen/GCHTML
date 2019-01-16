
const store = new Vuex.Store({

  state: {
    number: null,   //发短信电话号码
    openid: null,   //微信openid
    login: false,   //用户是否登录
    code: null,     //code只能使用一次
    recordNo: null,   //体检报告编号

    //加载动画
    loading: {
      show: false,
      //text: "正在加载……"
    },
    //出错弹出信息
    errorDialoge: {
      show: false,
      text: "出错了！",
    },
  },
  mutations: {
    //保持手机号码
    updateNumber (state, data) {
      state.number = data;
    },
    //展开加载动画
    updateLoadingShow (state) {
      state.loading.show = true;
    },
    //收起加载动画
    updateLoadingHide (state) {
      state.loading.show = false;
    },
    //提示信息展开
    errorDialogeShow (state,data) {
      state.errorDialoge.show = true;
      state.errorDialoge.text = data;
    },
    //提示信息收起
    errorDialogeHide (state) {
      state.errorDialoge.show = false;
    },
    //保存code
    updateCode(state,data) {
      state.code = data;
    },
    //保存recordNo
    updateRecordNo(state,data) {
      state.recordNo = data;
    }

  },
  actions: {

  },
  modules: {

  },
  getter : {
  }

});


export default store;
