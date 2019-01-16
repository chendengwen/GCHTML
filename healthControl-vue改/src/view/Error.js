let component = Vue.component('Error',{ 
    template:
      '<div class="content-box">'+
        '<div class="errorImg"></div>'+
        '<div class="error">'+
          '<h4>{{errorInfor}}</h4>'+
          '<p>'+
            '您可以：<br />'+
            '1. 扫描评估报告二维码<br />'+
            '2. 联系药店工作人员'+
          '</p>'+
        '</div>'+
      '</div>'
    ,
    data() {
      return {
        errorInfor: "出错了！",
      }
    },
    computed: {
    },
    watch: {
    },
    created() {
    },
    mounted() {
      this.getError();
    },
    methods:{
      getError() {
        let err = this.$route.query.err;
        if (err) {
          let s = decodeURIComponent(err);
          this.errorInfor = s;
        }
      }
    },

});

export default component