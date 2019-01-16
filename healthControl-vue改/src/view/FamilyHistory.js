import globalMixin from "../mixins/global.js";

export default {
  name: "FamilyHistory",
  template:
    '<div class="content-box smoking">'+
      '<h5>家族病史<span>（父母亲、兄弟姐妹、祖父祖母）</span></h5>'+
      '<ul class="drinkingSelect" id="mSelectList">'+
        '<li id="0">无</li>'+
        '<li v-for="item in diseaseList" v-bind:id="item.HealthTypeID">{{item.HealthTypeName}}</li>'+
      '</ul>'+

      '<textarea class="textarea" placeholder="可输入其他疾病，多个疾病用逗号隔开" v-model="otherDisease"></textarea>'+

      '<div id="gxy" style="display: none">'+
        '<h4>是否父母都有高血压史？</h4>'+
        '<ul class="drinkingSelect" id="drinkingSelect">'+
          '<li>是</li>'+
          '<li>否</li>'+
        '</ul>'+
      '</div>'+

      '<div id="diabetesBox" style="display: none">'+
        '<h4>是否父母都有糖尿病史？</h4>'+
        '<ul class="drinkingSelect" id="diabetes">'+
          '<li>是</li>'+
          '<li>否</li>'+
        '</ul>'+
      '</div>'+

      '<input type="submit" class="common-btn" value="保存" v-on:click="setFamiliyData" />'+
    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
      diseaseList: {},
      otherDisease:"",
      BothDiabetes: false,
      BothHypertensive: false,
    }
  },
  computed: {
  },
  watch: {
  },
  beforeCreate() {
  },
  created() {

  },
  mounted() {
    this.getData().then(()=> {
      this.mSelectList();
      this.selectList();
    });
  },
  methods: {
    mSelectList() {
      $("#mSelectList li").on("click",function () {
        let that = $(this);
        if(that.hasClass("active")) {
          that.removeClass("active");
          if(that.html() === "无") {
            that.siblings().removeClass("active").removeAttr("disabled");
          }
          if(that.html() === "高血压") {
            $("#gxy").hide();
          }
          if(that.html() === "糖尿病") {
            $("#diabetesBox").hide();
          }
        }
        else {
          if(that.attr("disabled") !== "disabled") {
            if(that.html() === "无") {
              that.siblings().removeClass("active").attr("disabled","disabled");
              $("#drinkingSelect li").removeClass("active");
              $("#diabetes li").removeClass("active");
              $("#gxy").hide();
              $("#diabetesBox").hide();
            }
            that.addClass("active");
            if(that.html() === "高血压") {
              $("#gxy").show();
            }
            if(that.html() === "糖尿病") {
              $("#diabetesBox").show();
            }
          }
        }
      });
    },

    //单选
    selectList() {
      let that = this;
      $("#drinkingSelect li").on("click",function () {
        if($(this).html() === "是") {
          that.BothHypertensive = true;
        }
        else {
          that.BothHypertensive = false;
        }
        $(this).addClass("active").siblings().removeClass("active");
      });
      $("#diabetes li").on("click",function () {
        if($(this).html() === "是") {
          that.BothDiabetes = true;
        }
        else {
          that.BothDiabetes = false;
        }
        $(this).addClass("active").siblings().removeClass("active");
      });
    },

    //获取数据
    getData() {
      let that = this;
      return that.$fetch(that.$api.HealthTypeApi)
        .then(function(res){
          if (res.data.IsSuccess === true) {
            that.diseaseList = res.data.ReturnData;
          }
        })
        .catch(function(error){
          console.log(error);
          that.errorDialogeShow(error);
        });
    },

    //提交家族数据
    setFamiliyData() {
      let diseaseId = [];
      $("#mSelectList .active").each(function () {
        diseaseId += $(this).attr("id") + ",";
      });

      let that = this;

      let upData = {
        BothDiabetes: that.BothDiabetes,
        BothHypertensive: that.BothHypertensive,
        FamilyHistoryRemark: that.otherDisease,
        HealthCategoryIDs: diseaseId
      };
      that.$fetch(that.$api.FamilyHistoryApi,{
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
    },

  }
}

