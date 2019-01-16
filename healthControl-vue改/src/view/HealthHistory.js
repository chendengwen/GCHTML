import globalMixin from "../mixins/global.js";

export default {
  name: "HealthHistory",
  template:
    '<div>'+
      '<ul class="living-habit">'+
        '<li class="row-background" v-for="item in liveData"  v-on:click="toUrl(item.to)" >'+
          '<div class="ul-center">'+
            '<ul>'+
              '<li class="li01"><img v-bind:src="item.img" class="listImg"></li>'+
              '<li class="li02">'+
                '<div class="centerStyle">'+
                  '<div class="lileft" v-html="item.text"></div>'+
                  '<div class="liright" v-html="item.percent"></div>'+
                  '<div class="completion-bar">'+
                    '<div class="bar-grad1" v-bind:style="{width:item.percent + '%'}"></div>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="li03">'+
                '<img src="./src/assets/img/arrow.jpg" />'+
              '</li>'+
            '</ul>'+
          '</div>'+
        '</li>'+
      '</ul>'+

      '<!--<input type="submit" class="common-btn" value="保存" />-->'+

    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
      liveData: {
        "0": {
          text:"家庭史",
          img: require("./src/assets/img/health1@2x.png"),
          percent: "",
          to: "/familyHistory"
        },
        "1": {
          text:"疾病史",
          img: require("./src/assets/img/health2@2x.png"),
          percent: "",
          to: "/medicalHistory"
        }
      }
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
    this.getHealthHistory();
  },
  methods: {
    getHealthHistory() {
      let that = this;
      return that.$fetch(that.$api.GetHealthInfoComplete)
        .then(function(res){
          that.liveData[0].percent = res.data.ReturnData.FamilyHistory;
          that.liveData[1].percent = res.data.ReturnData.DeseaseHistory;
        });
    }
  }
}

