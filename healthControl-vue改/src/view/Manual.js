import "../assets/css/iosSelect.css";
import "../assets/js/zepto.js";
import "../assets/js/iosSelect.js";
import globalMixin from "../mixins/global.js";

export default {
  name: "VitalCapacity",
  template:
    '<div class="content-box">'+

      '<template v-if="showBox === 0">'+
        '<ul class="manual">'+
          '<li>'+
            '<div class="text-tit"><span>*</span>收缩压</div>'+
            '<div class="text-input"><input type="text" v-model="bloodPressure.SystolicBloodPressure" /></div>'+
            '<div class="ico">mmHg</div>'+
          '</li>'+
          '<li>'+
            '<div class="text-tit"><span>*</span>舒张压</div>'+
            '<div class="text-input"><input type="text" v-model="bloodPressure.DiastolicBloodPressure" /></div>'+
            '<div class="ico">'+
              '<div class="ico">mmHg</div>'+
            '</div>'+
          '</li>'+
          '<li>'+
            '<div class="text-tit"><span>*</span>测量时间</div>'+
            '<div class="text-input">'+
              '<div class="form-item item-line selectDate">'+
                '<div class="pc-box">'+
                  '<span data-year="" data-month="" data-date="" class="showDate" id="bloodPressure">请选择时间</span>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="ico">'+
              '<img src="./src/assets/img/arrow.jpg" />'+
            '</div>'+
          '</li>'+
        '</ul>'+
        '<input type="submit" class="manual-btn" value="保存" v-on:click="getData(0)" />'+
      '</template>'+

      '<template v-if="showBox === 1">'+
        '<ul class="manual">'+
          '<li>'+
            '<div class="text-tit"><span>*</span>时间段</div>'+
            '<div class="text-input">'+
              '<div class="pc-box">'+
                '<input type="hidden" name="bank_id" id="bankId" value="" />'+
                '<span id="showBank">请选择</span>'+
              '</div>'+
            '</div>'+
            '<div class="ico"><img src="./src/assets/img/arrow.jpg" /></div>'+
          '</li>'+
          '<li>'+
            '<div class="text-tit"><span>*</span>血糖值</div>'+
            '<div class="text-input"><input type="text" v-model="bloodSugar.amount" /></div>'+
            '<div class="ico">mmol/L</div>'+
          '</li>'+
          '<li>'+
            '<div class="text-tit"><span>*</span>测量时间</div>'+
            '<div class="text-input">'+
              '<div class="form-item item-line selectDate">'+
                '<div class="pc-box">'+
                  '<span data-year="" data-month="" data-date="" class="showDate" id="bloodSugar">请选择时间</span>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="ico">'+
              '<img src="./src/assets/img/arrow.jpg" />'+
            '</div>'+
          '</li>'+
        '</ul>'+
        '<input type="submit" class="manual-btn" value="保存" v-on:click="getData(1)" />'+
      '</template>'+

      '<template v-if="showBox === 2">'+
        '<ul class="manual">'+
          '<li>'+
            '<div class="text-tit"><span>*</span>心率</div>'+
            '<div class="text-input"><input type="text" v-model="heartRate.amount" /></div>'+
            '<div class="ico">次/分</div>'+
          '</li>'+
          '<li>'+
            '<div class="text-tit"><span>*</span>测量时间</div>'+
            '<div class="text-input">'+
              '<div class="form-item item-line selectDate">'+
                '<div class="pc-box">'+
                  '<span data-year="" data-month="" data-date="" class="showDate" id="heartRate">请选择时间</span>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="ico">'+
              '<img src="./src/assets/img/arrow.jpg" />'+
            '</div>'+
          '</li>'+
        '</ul>'+
        '<input type="submit" class="manual-btn" value="保存" v-on:click="getData(2)" />'+
      '</template>'+

      '<template v-if="showBox === 3">'+
        '<ul class="manual">'+
          '<li>'+
            '<div class="text-tit"><span>*</span>步数</div>'+
            '<div class="text-input"><input type="text" v-model="stepCount.amount" /></div>'+
            '<div class="ico">步</div>'+
          '</li>'+
          '<li>'+
            '<div class="text-tit"><span>*</span>计步时间</div>'+
            '<div class="text-input">'+
              '<div class="form-item item-line selectDate">'+
                '<div class="pc-box">'+
                  '<span data-year="" data-month="" data-date="" class="showDate" id="stepCount">请选择时间</span>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="ico">'+
              '<img src="./src/assets/img/arrow.jpg" />'+
            '</div>'+
          '</li>'+
        '</ul>'+
        '<input type="submit" class="manual-btn" value="保存" v-on:click="getData(3)" />'+
      '</template>'+

      '<template v-if="showBox === 4">'+
        '<ul class="manual">'+
          '<li>'+
            '<div class="text-tit"><span>*</span>血氧</div>'+
            '<div class="text-input"><input type="text" v-model="bloodOxygen.amount" /></div>'+
            '<div class="ico">%</div>'+
          '</li>'+
          '<li>'+
            '<div class="text-tit"><span>*</span>测量时间</div>'+
            '<div class="text-input">'+
              '<div class="form-item item-line selectDate">'+
                '<div class="pc-box">'+
                  '<span data-year="" data-month="" data-date="" class="showDate" id="bloodOxygen">请选择时间</span>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="ico">'+
              '<img src="./src/assets/img/arrow.jpg" />'+
            '</div>'+
          '</li>'+
        '</ul>'+
        '<input type="submit" class="manual-btn" value="保存" v-on:click="getData(4)" />'+
      '</template>'+

      '<template v-if="showBox === 5">'+
        '<ul class="manual">'+
          '<li>'+
            '<div class="text-tit"><span>*</span>肺活量</div>'+
            '<div class="text-input"><input type="text" v-model="vitalCapacity.amount" /></div>'+
            '<div class="ico">ml</div>'+
          '</li>'+
          '<li>'+
            '<div class="text-tit"><span>*</span>测量时间</div>'+
            '<div class="text-input">'+
              '<div class="form-item item-line selectDate">'+
                '<div class="pc-box">'+
                  '<span data-year="" data-month="" data-date="" class="showDate" id="vitalCapacity">请选择时间</span>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="ico">'+
              '<img src="./src/assets/img/arrow.jpg" />'+
            '</div>'+
          '</li>'+
        '</ul>'+
        '<input type="submit" class="manual-btn" value="保存" v-on:click="getData(5)" />'+
      '</template>'+

    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
      showBox: null,
      bloodPressure: {
        SystolicBloodPressure: "",
        DiastolicBloodPressure: "",
        time: "",
        title: "手动输入血压"
      },
      bloodSugar: {
        date: "",
        amount: "",
        time: "",
        title: "手动输入血糖"
      },
      heartRate: {
        amount: "",
        time: "",
        title: "手动输入心率"
      },
      stepCount: {
        amount: "",
        time: "",
        title: "手动输入步数"
      },
      bloodOxygen: {
        amount: "",
        time: "",
        title: "手动输入血氧"
      },
      vitalCapacity: {
        amount: "",
        time: "",
        title: "手动输入肺活量"
      },
    }
  },
  computed: {
  },
  watch: {
  },
  beforeCreate() {
  },
  created() {
    this.showBox = parseInt(this.$route.params.showId);
  },
  mounted() {
    this.setTitle(this.showBox);
    this.setDate();
    this.setTime();
  },
  methods: {
    //设置标题
    setTitle(i) {
      let titName = "";
      switch (i) {
        case 0:
          titName = this.bloodPressure.title;
          break;
        case 1:
          titName = this.bloodSugar.title;
          break;
        case 2:
          titName = this.heartRate.title;
          break;
        case 3:
          titName = this.stepCount.title;
          break;
        case 4:
          titName = this.bloodOxygen.title;
          break;
        case 5:
          titName = this.vitalCapacity.title;
          break;
      }
      $(document).find("title").html(titName);
    },

    setDate() {
      let selectDateDom = $(".selectDate");
      let showDateDom = $(".showDate");
      // 初始化时间
      let now = new Date();
      let nowYear = now.getFullYear();
      let nowMonth = now.getMonth() + 1;
      let nowDate = now.getDate();
      showDateDom.attr('data-year', nowYear);
      showDateDom.attr('data-month', nowMonth);
      showDateDom.attr('data-date', nowDate);
      // 数据初始化
      function formatYear (nowYear) {
        let arr = [];
        for (let i = nowYear - 5; i <= nowYear + 5; i++) {
          arr.push({
            id: i + '',
            value: i + '年'
          });
        }
        return arr;
      }
      function formatMonth () {
        let arr = [];
        for (let i = 1; i <= 12; i++) {
          arr.push({
            id: i + '',
            value: i + '月'
          });
        }
        return arr;
      }
      function formatDate (count) {
        let arr = [];
        for (let i = 1; i <= count; i++) {
          arr.push({
            id: i + '',
            value: i + '日'
          });
        }
        return arr;
      }
      let yearData = function(callback) {
        // settimeout只是模拟异步请求，真实情况可以去掉
        // setTimeout(function() {
        callback(formatYear(nowYear))
        // }, 2000)
      };
      let monthData = function (year, callback) {
        // settimeout只是模拟异步请求，真实情况可以去掉
        // setTimeout(function() {
        callback(formatMonth());
        // }, 2000);
      };
      let dateData = function (year, month, callback) {
        // settimeout只是模拟异步请求，真实情况可以去掉
        // setTimeout(function() {
        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
          callback(formatDate(31));
        }
        else if (/^(4|6|9|11)$/.test(month)) {
          callback(formatDate(30));
        }
        else if (/^2$/.test(month)) {
          if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
            callback(formatDate(29));
          }
          else {
            callback(formatDate(28));
          }
        }
        else {
          throw new Error('month is illegal');
        }
        // }, 2000);
        // ajax请求可以这样写
        /*
        $.ajax({
            type: 'get',
            url: '/example',
            success: function(data) {
                callback(data);
            }
        });
        */
      };
      selectDateDom.bind('click', function () {
        let oneLevelId = showDateDom.attr('data-year');
        let twoLevelId = showDateDom.attr('data-month');
        let threeLevelId = showDateDom.attr('data-date');
        let iosSelect = new IosSelect(3,
          [yearData, monthData, dateData],
          {
            title: '地址选择',
            itemHeight: 35,
            oneLevelId: oneLevelId,
            twoLevelId: twoLevelId,
            threeLevelId: threeLevelId,
            showLoading: true,
            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
              showDateDom.attr('data-year', selectOneObj.id);
              showDateDom.attr('data-month', selectTwoObj.id);
              showDateDom.attr('data-date', selectThreeObj.id);
              showDateDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
            }
          });
      });
    },

    //选择时间段
    setTime() {
      if(this.showBox === 1) {
        let selectData = [
          {'id': '1000004', 'value': '空腹'},
          {'id': '060500', 'value': '随机'},
          {'id': '060501', 'value': '早餐后'},
          {'id': '060502', 'value': '午餐前'},
          {'id': '060503', 'value': '午餐后'},
          {'id': '060504', 'value': '晚餐前'},
          {'id': '060505', 'value': '晚餐后'},
          {'id': '060506', 'value': '睡前'},
          {'id': '060507', 'value': '凌晨'},
        ];
        let showBankDom = document.querySelector('#showBank');
        let bankIdDom = document.querySelector('#bankId');

        showBankDom.addEventListener('click', function () {
          let genderId = showBankDom.dataset['id'];
          let genderName = showBankDom.dataset['value'];

          let bankSelect = new IosSelect(1,
            [selectData],
            {
              container: '.container',
              title: '选择时段',
              itemHeight: 50,
              itemShowCount: 3,
              oneLevelId: genderId,
              callback: function (selectOneObj) {
                bankIdDom.value = selectOneObj.value;
                showBankDom.innerHTML = selectOneObj.value;
                showBankDom.dataset['id'] = selectOneObj.id;
                showBankDom.dataset['value'] = selectOneObj.value;
              },
              fallback: function () {
                console.log(1);
              },
              maskCallback: function () {
                console.log(2);
              }
            });
        });
      }
    },

    //数据校验
    dataDetection(i) {
      switch (i) {
        case 0:
          if(this.bloodPressure.SystolicBloodPressure === "" || this.bloodPressure.DiastolicBloodPressure === "" || document.querySelector('#bloodPressure').innerText === "请选择时间") {
            return false;
          }
          else {
            return true;
          }
        case 1:
          if(document.querySelector('#showBank').innerText === "请选择" || this.bloodSugar.amount === "" || document.querySelector('#bloodSugar').innerText === "请选择时间") {
            return false;
          }
          else {
            return true;
          }
        case 2:
          if(this.heartRate.amount === "" || document.querySelector('#heartRate').innerText === "请选择时间") {
            return false;
          }
          else {
            return true;
          }
        case 3:
          if(this.stepCount.amount === "" || document.querySelector('#stepCount').innerText === "请选择时间") {
            return false;
          }
          else {
            return true;
          }
        case 4:
          if(this.bloodOxygen.amount === "" || document.querySelector('#bloodOxygen').innerText === "请选择时间") {
            return false;
          }
          else {
            return true;
          }
        case 5:
          if(this.vitalCapacity.amount === "" || document.querySelector('#vitalCapacity').innerText === "请选择时间") {
            return false;
          }
          else {
            return true;
          }
      }
    },

    //获取数据
    getData(i) {
      let that = this;
      let showApi = "";
      let upData = {};
      let createDate = "";
      if(i == 0) {
        if(!that.dataDetection(0)) {
          that.errorDialogeShow("请完整的输入信息！");
          return false;
        }
        showApi = that.$api.SaveBloodPressureApi;
        createDate = document.querySelector('#bloodPressure').dataset['year'] + "-" + document.querySelector('#bloodPressure').dataset['month'] + "-" + document.querySelector('#bloodPressure').dataset['date'];
        upData = Object.assign({}, upData,{ Systolic: that.bloodPressure.SystolicBloodPressure, Diastolic: that.bloodPressure.DiastolicBloodPressure, ExamTime: createDate});
      }
      else if(i == 1) {
        if(!that.dataDetection(1)) {
          that.errorDialogeShow("请完整的输入信息！");
          return false;
        }
        showApi = that.$api.SaveBloodSugarApi;
        createDate = document.querySelector('#bloodSugar').dataset['year'] + "-" + document.querySelector('#bloodSugar').dataset['month'] + "-" + document.querySelector('#bloodSugar').dataset['date'];
        let sugarType = document.querySelector('#showBank').dataset['id'];
        upData = Object.assign({}, upData,{ SugarType: sugarType, Sugar: that.bloodSugar.amount, ExamTime: createDate});
      }
      else if(i == 2) {
        if(!that.dataDetection(2)) {
          that.errorDialogeShow("请完整的输入信息！");
          return false;
        }
        showApi = that.$api.SaveHeartRateApi;
        createDate = document.querySelector('#heartRate').dataset['year'] + "-" + document.querySelector('#heartRate').dataset['month'] + "-" + document.querySelector('#heartRate').dataset['date'];
        upData = Object.assign({}, upData,{ Rate: that.heartRate.amount, ExamTime: createDate});
      }
      else if(i == 3) {
        if(!that.dataDetection(3)) {
          that.errorDialogeShow("请完整的输入信息！");
          return false;
        }
        showApi = that.$api.SaveStepRecordApi;
        createDate = document.querySelector('#stepCount').dataset['year'] + "-" + document.querySelector('#stepCount').dataset['month'] + "-" + document.querySelector('#stepCount').dataset['date'];
        upData = Object.assign({}, upData,{ Step: that.stepCount.amount, StepTime: createDate});
      }
      else if(i == 4) {
        if(!that.dataDetection(4)) {
          that.errorDialogeShow("请完整的输入信息！");
          return false;
        }
        showApi = that.$api.SaveBloodOxygenRecordApi;
        createDate = document.querySelector('#bloodOxygen').dataset['year'] + "-" + document.querySelector('#bloodOxygen').dataset['month'] + "-" + document.querySelector('#bloodOxygen').dataset['date'];
        upData = Object.assign({}, upData,{ Step: that.bloodOxygen.amount, ExamTime: createDate});
      }
      else {
        if(!that.dataDetection(5)) {
          that.errorDialogeShow("请完整的输入信息！");
          return false;
        }
        showApi = that.$api.SaveVitalCapacityRecordApi;
        createDate = document.querySelector('#vitalCapacity').dataset['year'] + "-" + document.querySelector('#vitalCapacity').dataset['month'] + "-" + document.querySelector('#vitalCapacity').dataset['date'];
        upData = Object.assign({}, upData,{ Step: that.vitalCapacity.amount, ExamTime: createDate});
      }

      that.$fetch(showApi,{
        method: 'post',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(upData)
      })
      .then(function(res){
        if (res.data.IsSuccess === true) {
          console.log(res.data);
        }
      })
      .catch(function(error){
        console.log(error);
        that.errorDialogeShow(error);
      });

      showApi = "";
      upData = {};
      createDate = "";
    },

  },

}

