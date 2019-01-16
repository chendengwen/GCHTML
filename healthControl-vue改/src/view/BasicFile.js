// import "../assets/css/iosSelect.css";
import "../assets/js/zepto.js";
import "../assets/js/iosSelect.js";
import globalMixin from "../mixins/global.js";
import provinces from "../assets/js/areaData_v2.js";

export default {
  name: "BasicFile",
  template:
    '<div class="basic-file">'+
      '<ul>'+
        '<li class="clearfix">'+
          '<p><span>*</span>真实姓名</p>'+
          '<div class="wb"></div>'+
          '<input type="text" v-model.lazy="allData.Name"/>'+
        '</li>'+
        '<li class="clearfix">'+
          '<p>身份证</p>'+
          '<div class="wb"></div>'+
          '<input type="number" v-model.lazy="allData.PersonNo"/>'+
        '</li>'+
        '<li class="clearfix">'+
          '<p><span>*</span>性别</p>'+
          '<div class="wb"><img src="../assets/img/arrow.jpg" height="10" width="6"/></div>'+
          '<div class="pc-box">'+
            '<input type="hidden" name="bank_id" id="bankId" value="" />'+
            '<span id="showBank" ref="genderData">请选择</span>'+
          '</div>'+
        '</li>'+
        '<li class="clearfix">'+
          '<p><span>*</span>出生年月</p>'+
          '<div class="wb"><img src="../assets/img/arrow.jpg" height="10" width="6"/></div>'+
          '<div class="form-item item-line" id="selectDate">'+
            '<div class="pc-box">'+
              '<span data-year="" data-month="" data-date="" id="showDate" ref="birthDateData">请选择时间</span>'+
            '</div>'+
          '</div>'+
        '</li>'+'+'+
        '<!--<li class="clearfix">-->'+
          '<!--<p>居住地</p>-->'+
          '<!--<div class="wb"><img src="../assets/img/arrow.jpg" height="10" width="6"/></div>-->'+
          '<!--<div class="form-item item-line" id="select_contact">-->'+
            '<!--<div class="pc-box">-->'+
              '<!--<input type="hidden" name="contact_province_code" data-id="0001" id="contact_province_code" value="" data-province-name="">-->'+
              '<!--<input type="hidden" name="contact_city_code" id="contact_city_code" value="" data-city-name=""><span data-city-code="510100" data-province-code="510000" data-district-code="510105" id="show_contact" ref="birthAreaData">省、市</span>-->'+
            '<!--</div>-->'+
          '<!--</div>-->'+
        '<!--</li>-->'+
        '<!--<li class="clearfix">-->'+
          '<!--<p>详细地址</p>-->'+
          '<!--<div class="wb"></div>-->'+
          '<!--<input type="text" v-model="address.DetailedAddress"/>-->'+
        '<!--</li>-->'+
        '<li class="clearfix">'+
          '<p>身高</p>'+
          '<div class="wb">cm</div>'+
          '<input type="number" v-model="allData.Height" />'+
        '</li>'+
        '<li class="clearfix">'+
          '<p>体重</p>'+
          '<div class="wb">kg</div>'+
          '<input type="number" v-model="allData.Weight" />'+
        '</li>'+
        '<li class="clearfix">'+
          '<p>婚姻史</p>'+
          '<div class="wb"></div>'+
          '<div class="pc-box">'+
            '<input type="hidden" name="bank_id" id="marriageId" value="">'+
            '<span id="showMarriage" ref="marriageData">请选择</span>'+
          '</div>'+
        '</li>'+
      '</ul>'+

      '<input type="submit" value="保存" class="phone-number-btn" v-on:click="setPersonInfor"/>'+

    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
      proData:{},   //接收省份信息

      name: "",     //真实姓名
      cordNumber: null,  //身份证号码
      gender: "",    //性别
      birthDate:"",     //出生日期
      birthArea: "",    //出生地
      address: "",    //详细地址
      bodyHeight: null,   //身高
      bodyWeight: null,   //体重
      marriage: "",      //婚姻

      allData: {},
    }
  },
  computed: {
  },
  watch: {
    cordNumber(val) {
      this.isCardNo(val);
    },

  },
  created() {
  },
  mounted() {
    this.getPPersonInfor().then(()=> {
      this.choseGender();
      this.choseDate();
      this.choseArea();
      this.choseMemm();
    });

  },
  methods: {

    //身份证号码验证
    isCardNo(card) {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(reg.test(card) === false)
      {
        this.errorDialogeShow("身份证输入不合法");
        return  false;
      }
    },

    //获取基本信息
    getPPersonInfor() {
      let that = this;

      let upData = {
        IsExercise: that.isActive + 1,
      };

      return that.$fetch(that.$api.GetPersonInfoApi)
        .then(function(res){
          if (res.data.IsSuccess === true) {
            let getData = res.data.ReturnData;
            that.allData = Object.assign({}, that.allData, getData);
            that.address = Object.assign({}, that.address, getData.Address);
            //console.log(that.allData);

            //性别
            if(that.allData.Gender == 1) {
              document.querySelector('#showBank').innerText = "男";
              document.querySelector('#showBank').dataset['id'] = "1";
            }
            else {
              document.querySelector('#showBank').innerText = "女";
              document.querySelector('#showBank').dataset['id'] = "2";
            }
            //婚姻
            let me = parseInt(that.allData.MarriageStatus);
            switch (me) {
              case 10:
                document.querySelector('#showMarriage').innerText = "未婚";
                document.querySelector('#showMarriage').dataset['id'] = "10";
                break;
              case 20:
                document.querySelector('#showMarriage').innerText = "已婚";
                document.querySelector('#showMarriage').dataset['id'] = "20";
                break;
              case 30:
                document.querySelector('#showMarriage').innerText = "丧偶";
                document.querySelector('#showMarriage').dataset['id'] = "30";
                break;
              case 40:
                document.querySelector('#showMarriage').innerText = "离婚";
                document.querySelector('#showMarriage').dataset['id'] = "40";
                break;
              case 90:
                document.querySelector('#showMarriage').innerText = "请选择";
                document.querySelector('#showMarriage').dataset['id'] = "90";
                break;
            }

            //出生日期
            if(that.allData.Birthdate == null) {
              let d1 = that.allData.Birthdate.split("T");
              let d2 = d1[0].split("-");
              document.querySelector('#showDate').innerText = d1[0];
              document.querySelector('#showDate').dataset['year'] = d2[0];
              document.querySelector('#showDate').dataset['month'] = d2[1];
              document.querySelector('#showDate').dataset['date'] = d2[2];
            }

            //居住地
            // let address = "";
            // that.proData = provinces;
            // for(let i in that.proData.iosProvinces) {
            //   if(that.proData.iosProvinces[i].id == that.address.ProvinceID) {
            //     address += that.proData.iosProvinces[i].value;
            //     document.querySelector('#show_contact').dataset['provinceCode'] = that.address.ProvinceID;
            //   }
            // }
            // for(let i in that.proData.iosCitys) {
            //   if(that.proData.iosCitys[i].id == that.address.CityID) {
            //     address += " " + that.proData.iosCitys[i].value;
            //     document.querySelector('#show_contact').dataset['cityCode'] = that.address.CityID;
            //   }
            // }
            // for(let i in that.proData.iosCountys) {
            //   if(that.proData.iosCountys[i].id == that.address.CountyID) {
            //     address += that.proData.iosCountys[i].value;
            //     document.querySelector('#show_contact').dataset['districtCode'] = that.address.CountyID;
            //   }
            // }
            // document.querySelector('#show_contact').innerText = address;
          }
        })
    },

    //提交基本信心
    setPersonInfor() {
      if(this.allData.Name == "" || this.name == null) {
        this.errorDialogeShow("请填写你的姓名！");
        return;
      }
      this.gender = this.$refs.genderData.innerHTML;
      if(this.gender == "请选择") {
        this.errorDialogeShow("请选择你的性别！");
        return;
      }
      this.birthDate = this.$refs.birthDateData.innerHTML;
      if(this.birthDate == "请选择时间") {
        this.errorDialogeShow("请选择你的出生日期！");
        return;
      }
      this.marriage = this.$refs.marriageData.innerHTML;
      if(this.marriage == "请选择") {
        this.marriage = "";
      }

      let that = this;

      let upData = {
        Name: that.allData.Name,
        PersonNo: that.allData.PersonNo,
        Height: that.allData.Height,
        Weight: that.allData.Weight,
        // Address:{
        //   DetailedAddress : that.address.DetailedAddress,
        //   ProvinceID: document.querySelector('#show_contact').dataset['provinceCode'],
        //   CityID: document.querySelector('#show_contact').dataset['cityCode'],
        //   CountyID: document.querySelector('#show_contact').dataset['districtCode'],
        // },
        MarriageStatus: document.querySelector('#showMarriage').dataset['id'],
        Gender: document.querySelector('#showBank').dataset['id'],
        Birthdate: document.querySelector('#showDate').dataset['year'] + "-" + document.querySelector('#showDate').dataset['month'] + "-" + document.querySelector('#showDate').dataset['date'],
      };

      // that.$axios.post(that.$api.SavePerson,upData)
      that.$fetch(that.$api.SavePerson,upData)
        .then(function(res){
          if (res.data.IsSuccess === true) {
            console.log(res.data);
            that.errorDialogeShow("保存成功！");
          }
        })
    },
  }
}

