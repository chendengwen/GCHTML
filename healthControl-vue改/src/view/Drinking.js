import globalMixin from "../mixins/global.js";

export default {
  name: "Drinking",
  template:
    '<div class="content-box drinking">'+
      '<h4>你饮酒吗？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-on:click="selectStatus(0)" v-bind:class="{active:isActive ===0}">饮酒</li>'+
        '<li v-on:click="selectStatus(1)" v-bind:class="{active:isActive ===1}">已戒酒</li>'+
        '<li v-on:click="selectStatus(2)" v-bind:class="{active:isActive ===2}">从不饮酒</li>'+
      '</ul>'+

      '<div v-if="drinkInfo ===0">'+
        '<h4>您平均每天饮多少酒？(只填写您常喝的酒类)</h4>'+
        '<ul class="drinkInfo">'+
          '<li class="clearfix">'+
            '<p>白酒</p>'+
            '<div class="wb">两/天</div>'+
            '<input type="number" v-model="SpiritDailyDrink" />'+
          '</li>'+
          '<li class="clearfix">'+
            '<p>啤酒</p>'+
            '<div class="wb">毫升/天</div>'+
            '<input type="number" v-model="BeerDailyDrink" />'+
          '</li>'+
          '<li class="clearfix">'+
            '<p>红酒</p>'+
            '<div class="wb">毫升/天</div>'+
            '<input type="number" v-model="RedWineDailyDrink" />'+
          '</li>'+
          '<li class="clearfix">'+
            '<p>黄酒</p>'+
            '<div class="wb">两/天</div>'+
            '<input type="number" v-model="YellowWineDailyDrink" />'+
          '</li>'+
        '</ul>'+
      '</div>'+

      '<input type="submit" class="common-btn" value="保存" v-on:click="setSavePersonDrink" />'+

    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
      LifeStyleID: null,
      drinkInfo: null,
      isActive: null,
      SpiritDailyDrink: null,
      BeerDailyDrink: null,
      RedWineDailyDrink: null,
      YellowWineDailyDrink: null
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
    this.getSavePersonDrink();
  },
  methods: {
    selectStatus(i) {
      this.isActive = i;
      this.drinkInfo = i;
    },

    //获取饮酒数据
    getSavePersonDrink() {
      let that = this;
      that.$fetch(that.$api.GetPersonDrinkApi)
      .then(function(res){
        if (res.data.IsSuccess === true) {
          let getData = res.data.ReturnData;
          console.log(res.data);
          that.drinkInfo = getData.IsDrink - 1;
          that.isActive = getData.IsDrink - 1;
          that.LifeStyleID = getData.LifeStyleID;
          if(that.isActive === 0) {
            that.SpiritDailyDrink = getData.SpiritDailyDrink;
            that.BeerDailyDrink = getData.BeerDailyDrink;
            that.RedWineDailyDrink = getData.RedWineDailyDrink;
            that.YellowWineDailyDrink = getData.YellowWineDailyDrink;
          }
        }
      })
      .catch(function(error){
        console.log(error);
        that.errorDialogeShow(error);
      });
    },

    //提交饮酒数据
    setSavePersonDrink() {
      let that = this;
      let upData = {
        LifeStyleID: null,
        IsDrink: null,
        RedWineDailyDrink: null,
        SpiritDailyDrink: null,
        YellowWineDailyDrink: null,
        BeerDailyDrink: null,
        OtherDrinkName: null,
      };
      if(that.isActive === 0) {
        upData = Object.assign({}, upData,{ LifeStyleID: that.LifeStyleID, IsDrink: 1, RedWineDailyDrink: that.RedWineDailyDrink, SpiritDailyDrink: that.SpiritDailyDrink, YellowWineDailyDrink: that.YellowWineDailyDrink,BeerDailyDrink: that.BeerDailyDrink});
      }
      if(that.isActive === 1) {
        upData = Object.assign({}, upData,{ LifeStyleID: that.LifeStyleID, IsDrink: 2});
      }
      if(that.isActive === 2) {
        upData = Object.assign({}, upData,{ LifeStyleID: that.LifeStyleID, IsDrink: 3});
      }
      console.log(upData);

      that.$fetch(that.$api.SavePersonDrinkApi,{
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

