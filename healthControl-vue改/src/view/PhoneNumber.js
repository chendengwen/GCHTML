import globalMixin from "../mixins/global.js";

export default {
    name: 'PhoneNumber',
    template:
      '<div class="phone-verification">'+
        '<h4>欢迎您！</h4>'+
        '<p class="prompt">请输入手机号</p>'+
        '<input type="text" v-model="number" class="phone-number" name="mobile" required />'+
        '<div style="height: 36px;margin-top: 10px"><p v-if="verificationWarning" class="warning-red">输入有误，请重新输入11位手机号！</p></div>'+
        '<input type="submit" value="下一步" class="phone-number-btn" v-on:click="submitNumberData"/>'+
      '</div>'
    ,
    mixins: [globalMixin],
    data() {
      return {
        number:"",
        verificationWarning: false,
        VerificationState: false,
      }
    },
    computed: {
    },
    watch: {
      number(newNumber) {
        this.isPoneAvailable(newNumber);
        this.addSpace(newNumber);
      }
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

        that.$fetch(that.$api.getWebTokenApi + "?code=" + code )
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

      //校验手机号
      isPoneAvailable() {
        let mobile = this.number.replace(/[^0-9]/ig, "");
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

        if (mobile.length === 0) {
          this.verificationWarning = true;
          return false;
        }
        if (mobile.length !== 11) {
          this.verificationWarning = true;
          return false;
        }
        if (!myreg.test(mobile)) {
          this.verificationWarning = true;
          return false;
        }
        this.verificationWarning = false;
        return true;
      },

      //在手机号码里面添加隔断
      addSpace(newNumber) {
        let value = newNumber;
        value = value.replace(/[^0-9]/ig, "");
        let arr = value.split('');
        if (arr.length >= 4) {
          arr.splice(3, 0, ' ');
        }
        if (arr.length >= 9) {
          arr.splice(8, 0, ' ');
        }
        value = arr.join('');
        this.number = value;
      },

      //第一次获取验证码
      submitNumberData () {
        // let recordNo = this.$common.getQueryVariable('RecordNo');
        // if(recordNo) {
        //   this.$store.commit("updateRecordNo",recordNo);
        // }
        
        let mobile = this.number;
        mobile = mobile.replace(/[^0-9]/ig, "");
        if(!this.isPoneAvailable(mobile)) {
          return false;
        }

        // alert('token ' + that.$common.getLocalWxToken().access_token);
        // return;
        let that = this;
        that.$fetch(that.$api.phone + mobile,{
          headers:{
            "token": that.$common.getLocalWxToken().access_token,
          }
        })
        .then(function(res){
          console.log('res ==',  res);
          if(res.IsSuccess === true) {
            that.$store.commit('updateNumber', mobile);
            that.$router.replace({path: '/verificationCode'});
          }
          if(res.IsSuccess === false) {
            that.errorDialogeShow(res.ReturnMessage);
          }
        })
      },

    }
};
