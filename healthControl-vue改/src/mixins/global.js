import provinces from "../assets/js/areaData_v2.js";

var globalMixin = {
    data() {
        return {

        };
    },
    watch: {
      loading() {
        this.$forceUpdate();
      }
    },
    beforeCreate() {
    },
    mounted() {
    },
    methods: {
      // 加载loading
      showLoading() {
        this.$store.commit("updateLoadingStatus","true");
       },
      // 隐藏 loading
      hideLoading() {
        this.$store.commit("updateLoadingStatus","false");
      },

      //消息提示框
      errorDialogeShow(err) {
        if(err) {
          this.$store.commit("errorDialogeShow",err);
        }
        else {
          this.$store.commit("errorDialogeShow","出错了！");
        }

        setTimeout(()=> {
          this.$store.commit("errorDialogeHide");
        },3000);
      },

      //点击跳转
      toUrl(url) {
        this.$router.push(url);
      },

      //倒计时
      setTime: function (i) {
        let countdown = i;
        let that = this;
        let time;
        let beforeTime = that.getTime();

        let h = setInterval(function () {
          countdown = countdown - (((that.getTime() - beforeTime) / 1000).toFixed(0));
          time = countdown + "秒";
          if (countdown == 0) {
            clearInterval(h);
            if (i === 60) {
              time = '重新发送';
              that.$nextTick(() => {
                $(".prompt span").on("click",function(){
                  that.againGetInfor();
                })
              });
            }
            if (i === 4) {
              that.$router.replace({name: 'report',params:{RecordNo: that.$store.state.recordNo}});
            }
          }
          beforeTime = that.getTime();
          that.time = time;
        }, 1000);
      },

      getTime: function () {
        return Date.now();
      },


      //选择性别
      choseGender() {
        let selectData = [
          {'id': '1', 'value': '男'},
          {'id': '2', 'value': '女'},
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
              title: '选择性别',
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
      },

      //选择日期
      choseDate() {
        let selectDateDom = $('#selectDate');
        let showDateDom = $('#showDate');
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
          for (let i = nowYear - 100; i <= nowYear; i++) {
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

      //选择地址
      choseArea() {
        let that = this;
        that.proData = provinces;
        let selectContactDom = $('#select_contact');
        let showContactDom = $('#show_contact');
        let contactProvinceCodeDom = $('#contact_province_code');
        let contactCityCodeDom = $('#contact_city_code');
        selectContactDom.on('click', function () {
          let oneLevelId = showContactDom.attr('data-province-code');
          let twoLevelId = showContactDom.attr('data-city-code');
          let threeLevelId = showContactDom.attr('data-district-code');
          let iosSelect = new IosSelect(3,
            [that.proData.iosProvinces, that.proData.iosCitys, that.proData.iosCountys],
            {
              title: '地址选择',
              itemHeight: 35,
              relation: [1, 1],
              oneLevelId: oneLevelId,
              twoLevelId: twoLevelId,
              threeLevelId: threeLevelId,
              callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                contactProvinceCodeDom.val(selectOneObj.id);
                contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
                contactCityCodeDom.val(selectTwoObj.id);
                contactCityCodeDom.attr('data-city-name', selectTwoObj.value);

                showContactDom.attr('data-province-code', selectOneObj.id);
                showContactDom.attr('data-city-code', selectTwoObj.id);
                showContactDom.attr('data-district-code', selectThreeObj.id);
                showContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
              }
            });
        });
      },

      //选择婚姻
      choseMemm() {
        let selectData = [
          {'id': '10', 'value': '未婚'},
          {'id': '20', 'value': '已婚'},
          {'id': '30', 'value': '丧偶'},
          {'id': '40', 'value': '离婚'},
        ];

        let showBankDom = document.querySelector('#showMarriage');
        let bankIdDom = document.querySelector('#marriageId');

        showBankDom.addEventListener('click', function () {
          let genderId = showBankDom.dataset['id'];
          let genderName = showBankDom.dataset['value'];

          let bankSelect = new IosSelect(1,
            [selectData],
            {
              container: '.container',
              title: '选择性别',
              itemHeight: 50,
              itemShowCount: 3,
              oneLevelId: genderId,
              callback: function (selectOneObj) {
                bankIdDom.value = selectOneObj.id;
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
      },

    }
}    

export default globalMixin
