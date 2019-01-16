import api from "../api/index.js";
import globalMixin from "../mixins/global.js";

export default {
  name: 'HealthNotes',
  template:
    '<div class="health-notes">'+

      '<!--导航-->'+
      '<ul class="nav clearfix">'+
        '<li v-for="(item , index) in tabNav" v-bind:class="{active: showBoxId === index}" v-on:click="changeBox(index)">{{item.text}}</li>'+
      '</ul>'+
      '<!--导航-->'+

      '<ul class="content-box">'+

        '<!--血压-->'+
        '<li v-if="showBoxId === \'0\'">'+

          '<div class="mid-cont">'+
            '<h3>最近血压</h3>'+
            '<ul>'+
              '<li><p><span>收缩压</span><br/>{{allData.Systolic}}<span>mmol/L</span></p></li>'+
              '<li><p><span>舒张压</span><br/>{{allData.Diastolic}}<span>mmol/L</span></p></li>'+
              '<li>'+
                '<p v-bind:class="{color2:allData.Result == \'正常\',color3:allData.Result == \'正常高值\',color4:allData.Result == \'轻度\',color5:allData.Result == \'中度\',color6:allData.Result == \'重度\',color1:allData.Result == \'偏低\'}" class="blood-status">{{allData.Result}}</p>'+
              '</li>'+
            '</ul>'+
          '</div>'+

          '<div class="mid-cont">'+
            '<h3>血压趋势</h3>'+
            '<div class="last-time">{{allData.LastTestTime}}</div>'+
            '<div ref="bloodChart" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>'+
          '</div>'+

          '<div class="btn-box">'+
            '<router-link :to="{name:\'manual\',params:{ showId: 0}}">手动输入</router-link>'+
            '<router-link :to="{name:\'blood-pressure-report\'}">查看报告</router-link>'+
          '</div>'+

        '</li>'+
        '<!--血压-->'+

        '<!--血糖-->'+
        '<li v-if="showBoxId === \'1\'">'+
          '<div class="mid-cont">'+
            '<h3>最近血糖</h3>'+
            '<ul>'+
              '<li><p style="font-size: 0.4rem;color: #00cbe9">{{allData.SugarType}}</p></li>'+
              '<li><p>{{allData.Sugar}}<span>mmol/L</span></p></li>'+
              '<li>'+
                '<p v-bind:class="{color2:allData.Result === \'正常\',color3:allData.Result === \'正常高值\',color4:allData.Result === \'轻度\',color5:allData.Result === \'中度\',color6:allData.Result === \'重度\',color1:allData.Result === \'偏低\'}" class="blood-status">{{allData.Result}}</p>'+
              '</li>'+
            '</ul>'+
          '</div>'+

          '<div class="mid-cont">'+
            '<h3>血糖趋势</h3>'+
            '<div class="last-time">{{allData.LastTestTime}}</div>'+
            '<div ref="bloodSugar" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>'+
          '</div>'+

          '<div class="btn-box">'+
            '<router-link :to="{name:\'manual\',params:{ showId: 1}}">手动输入</router-link>'+
            '<router-link :to="{name:\'blood-oxygen-report\'}">查看报告</router-link>'+
          '</div>'+
        '</li>'+
        '<!--血糖-->'+

        '<!--心率-->'+
        '<li v-if="showBoxId === \'2\'">'+
          '<div class="mid-cont">'+
            '<h3>最近心率</h3>'+
            '<ul>'+
              '<li><p>{{allData.Rate}}<span>次/分</span></p></li>'+
              '<li>'+
                '<p v-bind:class="{color2:allData.Result === \'正常\',color3:allData.Result === \'正常高值\',color4:allData.Result === \'轻度\',color5:allData.Result === \'中度\',color6:allData.Result === \'重度\',color1:allData.Result === \'偏低\'}" class="blood-status">{{allData.Result}}</p>'+
              '</li>'+
            '</ul>'+
          '</div>'+

          '<div class="mid-cont">'+
            '<h3>心率趋势</h3>'+
            '<div class="last-time">{{allData.LastTestTime}}</div>'+
            '<div ref="heartRate" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>'+
          '</div>'+

          '<div class="btn-box">'+
            '<router-link :to="{name:\'manual\',params:{ showId: 2}}">手动输入</router-link>'+
          '</div>'+
        '</li>'+
        '<!--心率-->'+

        '<!--步数-->'+
        '<li v-if="showBoxId === \'3\'">'+
          '<div class="mid-cont">'+
            '<h3>最近步数</h3>'+
            '<ul>'+
              '<li><p>{{allData.Step}}<span>步</span></p></li>'+
              '<li>'+
                '<p v-bind:class="{color2:allData.Result === \'正常\',color3:allData.Result === \'正常高值\',color4:allData.Result === \'轻度\',color5:allData.Result === \'中度\',color6:allData.Result === \'重度\',color1:allData.Result === \'偏低\'}" class="blood-status">{{allData.Result}}</p>'+
              '</li>'+
            '</ul>'+
          '</div>'+

          '<div class="mid-cont">'+
            '<h3>步数趋势</h3>'+
            '<div class="last-time">{{allData.StepTime}}</div>'+
            '<div ref="stepCount" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>'+
          '</div>'+

          '<div class="btn-box">'+
            '<router-link :to="{name:\'manual\',params:{ showId: 3}}">手动输入</router-link>'+
          '</div>'+
        '</li>'+
        '<!--步数-->'+

        '<!--血氧-->'+
        '<li v-if="showBoxId === \'4\'">'+
          '<div class="mid-cont">'+
            '<h3>最近血氧</h3>'+
            '<ul>'+
              '<li><p>{{allData.Oxygen}}<span>%</span></p></li>'+
              '<li>'+
                '<p v-bind:class="{color2:allData.Result === \'正常\',color3:allData.Result === \'正常高值\',color4:allData.Result === \'轻度\',color5:allData.Result === \'中度\',color6:allData.Result === \'重度\',color1:allData.Result === \'偏低\'}" class="blood-status">{{allData.Result}}</p>'+
              '</li>'+
            '</ul>'+
          '</div>'+

          '<div class="mid-cont">'+
            '<h3>血氧趋势</h3>'+
            '<div class="last-time">{{allData.LastTestTime}}</div>'+
            '<div ref="bloodOxygen" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>'+
          '</div>'+

          '<div class="btn-box">'+
            '<router-link :to="{name:\'manual\',params:{ showId: 4}}">手动输入</router-link>'+
          '</div>'+
        '</li>'+
        '<!--血氧-->'+

        '<!--肺活量-->'+
        '<li v-if="showBoxId === \'5\'">'+
          '<div class="mid-cont">'+
            '<h3>最近肺活量</h3>'+
            '<ul>'+
              '<li><p>{{allData.VitalCapacity}}<span>ml</span></p></li>'+
              '<li>'+
                '<p v-bind:class="{color2:allData.Result === \'呼吸功能正常\',color3:allData.Result === \'正常高值\',color4:allData.Result === \'轻度\',color5:allData.Result === \'中度\',color6:allData.Result === \'重度\',color1:allData.Result === \'偏低\'}" class="blood-status">{{allData.Result}}</p>'+
              '</li>'+
            '</ul>'+
          '</div>'+

          '<div class="mid-cont">'+
            '<h3>肺活量趋势</h3>'+
            '<div class="last-time">{{allData.LastTestTime}}</div>'+
            '<div ref="vitalCapacity" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>'+
          '</div>'+

          '<div class="btn-box">'+
            '<router-link :to="{name:\'manual\',params:{ showId: 5}}">手动输入</router-link>'+
          '</div>'+
        '</li>'+
        '<!--肺活量-->'+

      '</ul>'+


    '</div>'
  ,
  mixins: [globalMixin],
  components: {
  },
  data() {
    return {
      showBoxId: "0",   //切换框
      tabNav: {
        "0": {
          "text":"血压"
        },
        "1": {
          "text":"血糖"
        },
        "2": {
          "text":"心率"
        },
        "3": {
          "text":"步数"
        },
        "4": {
          "text":"血氧"
        },
        "5": {
          "text":"肺活量"
        }
      },
      allData: {},
    };
  },
  computed: {},
  created() {
    this.redirectToIndex();
  },
  mounted() {
    let getShow = this.$route.query.id;
    if(getShow) {
      this.$common.getToken(this.$store.state.recordNo).then(val => {
        this.getReport(getShow);
      });
    }
    else {
      this.$common.getToken(this.$store.state.recordNo).then(val => {
        this.getReport(0);
      });
    }
  },
  methods: {
    //切换
    changeBox (i) {
      this.showBoxId = i;
      this.getReport(i);
    },

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

    //获取数据
    getReport(i) {
      let that = this;
      let showApi = "";
      if(i == 0) {
        showApi = that.$api.BloodPressureApi;
      }
      else if(i == 1) {
        showApi = that.$api.BloodSugarApi;
      }
      else if(i == 2) {
        showApi = that.$api.HeartRateApi;
      }
      else if(i == 3) {
        showApi = that.$api.StepApi;
      }
      else if(i == 4) {
        showApi = that.$api.BloodOxygenApi;
      }
      else {
        showApi = that.$api.VitalCapacityApi;
      }

      that.$fetch(showApi)
        .then(function(res){
          if (res.data.IsSuccess === true) {
            let data = res.data.ReturnData;
            that.allData = Object.assign({}, that.allData,data);
            //console.log(that.allData);

            if(i == 0) {
              let data1 = Object.assign({}, data1,{ name: "舒张压", data: data.DiastolicList,xData: data.CheckTimeList});
              let data2 = Object.assign({}, data2,{ name: "收缩压", data: data.SystolicList,});
              let bs = that.$echarts.init(that.$refs.bloodChart);
              bs.setOption(that.$common.getCharts(data1,data2),true);
              if(that.allData.LastTestTime) {
                let newTime = that.allData.LastTestTime.split("T");
                that.allData.LastTestTime = newTime[0] + " " + newTime[1];
              }
              else {
                that.errorDialogeShow("暂无数据！");
              }
            }
            else if(i == 1) {
              let data1 = Object.assign({}, data1,{ name: "血糖", data: data.SugarList,xData: data.CheckTimeList});
              let bs = that.$echarts.init(that.$refs.bloodSugar);
              bs.setOption(that.$common.getCharts(data1),true);
              if(that.allData.LastTestTime) {
                let newTime = that.allData.LastTestTime.split("T");
                that.allData.LastTestTime = newTime[0] + " " + newTime[1];
              }
              else {
                that.errorDialogeShow("暂无数据！");
              }
            }
            else if(i == 2) {
              let data1 = Object.assign({}, data1,{ name: "心率", data: data.RateList,xData: data.CheckTimeList});
              let bs = that.$echarts.init(that.$refs.heartRate);
              bs.setOption(that.$common.getCharts(data1),true);
              if(that.allData.LastTestTime) {
                let newTime = that.allData.LastTestTime.split("T");
                that.allData.LastTestTime = newTime[0] + " " + newTime[1];
              }
              else {
                that.errorDialogeShow("暂无数据！");
              }
            }
            else if(i == 3) {
              let data1 = Object.assign({}, data1,{ name: "步数", data: data.StepsList,xData: data.StepsTimeList});
              let bs = that.$echarts.init(that.$refs.stepCount);
              bs.setOption(that.$common.getCharts(data1),true);
              if(that.allData.StepTime) {
                let newTime = that.allData.StepTime.split("T");
                that.allData.LastTestTime = newTime[0] + " " + newTime[1];
              }
              else {
                that.errorDialogeShow("暂无数据！");
              }
            }
            else if(i == 4) {
              let data1 = Object.assign({}, data1,{ name: "血氧", data: data.OxygenList,xData: data.CheckTimeList});
              let bs = that.$echarts.init(that.$refs.bloodOxygen);
              bs.setOption(that.$common.getCharts(data1),true);
              if(that.allData.LastTestTime) {
                let newTime = that.allData.LastTestTime.split("T");
                that.allData.LastTestTime = newTime[0] + " " + newTime[1];
              }
              else {
                that.errorDialogeShow("暂无数据！");
              }
            }
            else {
              let data1 = Object.assign({}, data1,{ name: "肺活量", data: data.VitalCapacityList,xData: data.CheckTimeList});
              let bs = that.$echarts.init(that.$refs.vitalCapacity);
              bs.setOption(that.$common.getCharts(data1),true);
              if(that.allData.LastTestTime) {
                let newTime = that.allData.LastTestTime.split("T");
                that.allData.LastTestTime = newTime[0] + " " + newTime[1];
              }
              else {
                that.errorDialogeShow("暂无数据！");
              }
            }
          }
        })
    },

  }
}

