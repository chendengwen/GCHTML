import globalMixin from "../mixins/global.js";

export default {
  name: "IntegrationReport",
  template:
    '<div class="content-box">'+
      '<div class="bind-report">'+
        '<img src="../assets/img/archives.png" />'+
        '<p>您是否确定要将此新游客档案合并入您的档案？</p>'+
        '<input type="submit" value="确定" class="blue-btn" v-on:click="integrationReport"/>'+
        '<input type="submit" value="取消" class="gray-btn" v-on:click="cancelIntegration"/>'+
      '</div>'+
    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.redirectToIndex();
  },
  mounted() {
  },
  methods: {

    //获取recordno
    redirectToIndex() {
      let wxToken = this.$common.getLocalWxToken();
      let recordNo = this.$common.getQueryVariable('RecordNo') || 0;

      if (recordNo != 0) {
        this.$store.commit("updateRecordNo",recordNo);
      }
      else{
        let r = this.$store.state.recordNo;
        if (r != null) {
          recordNo = r;
        }
      }

      if(wxToken) {  //已有微信token
        let timestamp = (new Date()).valueOf();
        let goTime = (timestamp - wxToken.timestamp)/(60*60*1000);
        if( goTime > 24) {  //已经过期
          localStorage.removeItem("wxToken");
          globalMixin.errorDialogeShow("登录已过期！");
          this.redirectToIndex();
        }
      }
      else {   //无微信token
        let code = this.$common.getQueryVariable('code') || 0;

        if (code == 0) {
          let baseURL = window.location.href;  //window.location.protocol + "//" + window.location.host;
          this.$common.getCodeUrl(baseURL);
          return;
        }

        this.getWxToken(recordNo,code);
      }
    },

    //获取微信token
    getWxToken(recordNo,code) {
      let timestamp = (new Date()).valueOf();
      let that = this;
      that.$axios.get(that.$api.getWebTokenApi + "?code=" + code )
        .then(function(res){
          //console.log(res);
          let tk = Object.assign({}, res.data.ReturnData,{ timestamp: timestamp});
          if(res.data.IsSuccess === true) {
            localStorage.setItem("wxToken",JSON.stringify(tk));
            that.$common.getToken(recordNo, res.data.ReturnData.openid).then(val => {
            });
          }
        })
    },

    //整合档案
    integrationReport() {
      let that = this;
      let recordNo = that.$common.getQueryVariable('RecordNo') || 0;
      let openId = that.$common.getQueryVariable('OpenId') || 0;

      that.$fetch(that.$api.DataIntegrationApi,{
        method: "post",
        headers: {
          "token": that.$common.getLocalWxToken().access_token,
        },
        body: {
          OpenId: openId,
          Phone: "",
          RecordNo: recordNo
        }
      })
        .then(function(res){
          //console.log(res);
          if(res.data.IsSuccess === true) {
            that.errorDialogeShow("整合成功!");
            that.$router.replace({path: '/',query:{RecordNo:res.data.ReturnData}});
          }
          if(res.data.IsSuccess === false) {
            that.errorDialogeShow(res.data.ReturnMessage);
          }
        })
    },

    //取消整合
    cancelIntegration() {
      window.close();
      WeixinJSBridge.call('closeWindow');
    }
  },

}

