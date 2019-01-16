import api from "../api/index.js";
import globalMixin from "../mixins/global.js";

export default {
  name: 'BloodPressureReport',
  template:
    '<div class="blood-pressure-report">'+

    '<!--导航-->'+
    '<ul class="nav clearfix">'+
      '<li v-for="(item , index) in tabNav" v-bind:class="{active: showBoxId === index}" v-on:click="changeBox(index)">{{item.text}}</li>'+
    '</ul>'+
    '<!--导航-->'+

    '<ul class="content-box">'+

      '<li>'+

        '<ul class="distributed-infor">'+
          '<li>'+
            '<div ref="bloodPressureReport" style="width:4rem; height:4rem; background-color:#fff; margin-top: 0;z-index: 2" ></div>'+
            '<div class="all-accout">{{allData.Count}}次<br/><span>测量</span></div>'+
          '</li>'+
          '<li>'+
            '<ul class="right-list-infor pressure">'+
              '<li v-for="item in allData.ResultPercentList"  v-bind:class="{color2: item.TypeName == \'正常\',color3:item.TypeName == \'正常高值\',color4:item.TypeName == \'轻度\',color5:item.TypeName == \'中度\',color6:item.TypeName == \'重度\',color1:item.TypeName == \'偏低\'}">'+
                '<span></span>'+
                '<span>{{item.TypeName}}</span>'+
                '<span>{{item.Percentage}}%</span>'+
              '</li>'+
            '</ul>'+
          '</li>'+
        '</ul>'+

        '<ul class="data-column pressure-column">'+
          '<li>'+
            '<div class="value-title">血糖值(mmol/L）<span><i></i>收缩压</span><span><i></i>舒张压</span></div>'+
            '<ul>'+
              '<li><p><i>{{allData.MaxSystolic}}</i><br/><span v-bind:style="{height: h1[0],backgroundColor:\'#00cbe9\'}"></span>最高值</p></li>'+
              '<li><p><i>{{allData.MaxDiastolic}}</i><br/><span v-bind:style="{height: h1[1],backgroundColor:\'#6ccc56\'}"></span>最高值</p></li>'+
            '</ul>'+
            '<ul>'+
              '<li><p><i>{{allData.MinSystolic}}</i><br/><span v-bind:style="{height: h1[2],backgroundColor:\'#00cbe9\'}"></span>最低值</p></li>'+
              '<li><p><i>{{allData.MinDiastolic}}</i><br/><span v-bind:style="{height: h1[3],backgroundColor:\'#6ccc56\'}"></span>最低值</p></li>'+
            '</ul>'+
            '<ul>'+
              '<li><p><i>{{allData.AverSystolic}}</i><br/><span v-bind:style="{height: h1[4],backgroundColor:\'#00cbe9\'}"></span>平均值</p></li>'+
              '<li><p><i>{{allData.AverDiastolic}}</i><br/><span v-bind:style="{height: h1[5],backgroundColor:\'#6ccc56\'}"></span>平均值</p></li>'+
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
              '<span></span>'+
              '<span>血压{{x.Systolic}}/{{x.Diastolic}}</span>'+
              '<span v-bind:class="{color2:x.Result == \'正常\',color3:x.Result == \'正常高值\',color4:x.Result == \'轻度\',color5:x.Result == \'中度\',color6:x.Result == \'重度\',color1:x.Result == \'偏低\'}">{{x.Result}}</span>'+
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
      let bs = this.$echarts.init(this.$refs.bloodPressureReport);
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
      that.$fetch(that.$api.BloodPressureReport + "?reportTimeType=" + type)
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

          let d1 = [that.allData.MaxSystolic,that.allData.AverSystolic,that.allData.MinSystolic,that.allData.MaxDiastolic,that.allData.AverDiastolic,that.allData.MinDiastolic];
          that.h1 = that.columnHeight(d1);
        }
      })
      .catch(function(error){
        console.log(error);
        that.errorDialogeShow(error.response);
      });
    },

  }
}


