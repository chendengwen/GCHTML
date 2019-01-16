import api from "../api/index.js";
import globalMixin from "../mixins/global.js";

export default {
  name: 'BloodOxygenReport',
  template:
    '<div class="blood-oxygen-report">'+

      '<!--导航-->'+
      '<ul class="nav clearfix">'+
        '<li v-for="(item , index) in tabNav" v-bind:class="{active: showBoxId === index}" v-on:click="changeBox(index)">{{item.text}}</li>'+
      '</ul>'+
      '<!--导航-->'+

      '<ul class="content-box">'+

        '<li>'+
          '<ul class="report-menu">'+
            '<li><img src="../assets/img/icon-value.png" /></li>'+
            '<li>平均值</li>'+
            '<li>{{allData.AverBloodSugar}}<br/><span>mmol/L</span></li>'+
            '<li><img src="../assets/img/icon-balanced.png" /></li>'+
            '<li>模拟糖化</li>'+
            '<li>{{allData.Saccharification}}%</li>'+
          '</ul>'+

          '<ul class="distributed-infor">'+
            '<li>'+
              '<div ref="bloodSugarReport" style="width:4rem; height:4rem; background-color:#fff; margin-top: 0;z-index: 2" ></div>'+
              '<div class="all-accout">{{allData.Count}}次<br/><span>测量</span></div>'+
            '</li>'+
            '<li>'+
              '<ul class="right-list-infor">'+
                '<li v-for="item in allData.ResultPercentList" v-bind:class="{color1: item.TypeName == \'偏低\',color2:item.TypeName == \'正常\',color3:item.TypeName == \'偏高\'}">'+
                  '<span></span>'+
                  '<span>{{item.TypeName}}</span>'+
                  '<span><i>{{item.Count}}</i>次</span>'+
                  '<span>{{item.Percentage}}%</span>'+
                '</li>'+

              '</ul>'+
            '</li>'+
          '</ul>'+

          '<ul class="data-column">'+
            '<li>'+
              '<div class="value-title">血糖值(mmol/L）</div>'+
              '<ul>'+
                '<li><p><i>{{allData.MaxBloodSugar}}</i><br/><span v-bind:style="{height: h1[0]}"></span>最高值</p></li>'+
                '<li><p><i>{{allData.MinBloodSugar}}</i><br/><span v-bind:style="{height: h1[1]}"></span>最低值</p></li>'+
              '</ul>'+
            '</li>'+
            '<li>'+
              '<div class="value-title">血糖值(mmol/L）</div>'+
              '<ul>'+
                '<li><p><i>{{allData.AverFasting}}</i><br/><span v-bind:style="{height: h2[0]}"></span>空腹</p></li>'+
                '<li><p><i>{{allData.AverBeforeLunch}}</i><br/><span v-bind:style="{height: h2[1]}"></span>餐前</p></li>'+
                '<li><p><i>{{allData.AverAfterLunch}}</i><br/><span v-bind:style="{height: h2[2]}"></span>餐后</p></li>'+
                '<li><p><i>{{allData.AverAfterSleep}}</i><br/><span v-bind:style="{height: h2[3]}"></span>睡前</p></li>'+
              '</ul>'+
            '</li>'+
          '</ul>'+

          '<div class="watch-more">查看详细日志<i></i></div>'+

          '<template v-for="item in allData.IndexDataList">'+
            '<div class="detailed-log-titt">{{item.GroupTime}}</div>'+
            '<ul class="detailed-log">'+
              '<li v-for="x in item.DetailedRecords">'+
                '<span></span>'+
                '<span>{{x.Time}}</span>'+
                '<span>{{x.ItemType}}</span>'+
                '<span>{{x.RecordValue}}mmol/L</span>'+
                '<span v-bind:class="{color1: x.ResultType == \'偏低\',color2:x.ResultType == \'正常\',color3:x.ResultType == \'偏高\'}">{{x.ResultType}}</span>'+
              '</li>'+
            '</ul>'+
          '</template>'+
        '</li>'+
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
          "text":"近一周"
        },
        "1": {
          "text":"近一月"
        },
        "2": {
          "text":"近三月"
        }
      },
      allData: {},
      h1: [],
      h2: [],
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.getReport(0);
  },
  methods: {
    //切换
    changeBox (i) {
      this.showBoxId = i;
      this.getReport(i);
    },

    //计算柱状图高度
    columnHeight(data) {
      let newData = [];
      let heightData = [];

      for(let i in data) {
        newData[i] = data[i];
      }
      let max = Math.max.apply(null,newData);
      for(let i in data) {
        heightData[i] = data[i] / max + "rem";
      }
      return heightData;
    },

    //创建饼状图
    createCharts() {
      let data = [];
      for(let i in this.allData.ResultPercentList) {
        data[i] = Object.assign({}, data[i], {value: this.allData.ResultPercentList[i].Count, name: this.allData.ResultPercentList[i].TypeName});
      }
      let bs = this.$echarts.init(this.$refs.bloodSugarReport);
      bs.setOption(this.$common.getPieCharts(data));
    },


    //获取血糖报告
    getReport(i) {
      let type = "";
      if(i == 0) {
        type = "week";
      }
      else if(i == 1) {
        type = "onemonth";
      }
      else {
        type = "threemonth";
      }
      let that = this;
      that.$fetch(that.$api.BloodSugarReport + "?reportTimeType=" + type)
        .then(function(res){
          if (res.data.IsSuccess === true) {
            let data = res.data.ReturnData;

            for(let i in data.IndexDataList) {
              let date1 = data.IndexDataList[i].GroupTime.split("T");
              data.IndexDataList[i] = Object.assign({}, data.IndexDataList[i], { GroupTime: date1[0]});
              for(let j in data.IndexDataList[i].DetailedRecords) {
                let date2 = data.IndexDataList[i].DetailedRecords[j].Time.split("T");
                data.IndexDataList[i].DetailedRecords[j] = Object.assign({}, data.IndexDataList[i].DetailedRecords[j], {Time: date2[1]});
              }
            }

            that.allData = Object.assign({}, that.allData,data);
            //console.log(that.allData);

            that.createCharts();

            let d1 = [that.allData.MaxBloodSugar,that.allData.MinBloodSugar];
            let d2 = [that.allData.AverFasting,that.allData.AverBeforeLunch,that.allData.AverAfterLunch,that.allData.AverAfterSleep];
            that.h1 = that.columnHeight(d1);
            that.h2 = that.columnHeight(d2);


          }
        })
        .catch(function(error){
          console.log(error);
          that.errorDialogeShow(error.response);
        });
    },

  }
}



