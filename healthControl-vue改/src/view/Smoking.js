import globalMixin from "../mixins/global.js";
    
export default {
  name: "Smoking",
  template:
    '<div class="content-box smoking">'+
      '<h4>你吸烟吗？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-on:click="selectStatus(0)" v-bind:class="{active:isActive ===0}" id="1">吸烟</li>'+
        '<li v-on:click="selectStatus(1)" v-bind:class="{active:isActive ===1}" id="2">已戒烟</li>'+
        '<li v-on:click="selectStatus(2)" v-bind:class="{active:isActive ===2}" id="3">从不吸烟</li>'+
      '</ul>'+

      '<div v-if="drinkInfo === 0">'+
        '<ul class="drinkInfo">'+
          '<li class="clearfix">'+
            '<p>开始吸烟的年龄</p>'+
            '<div class="wb">岁</div>'+
            '<input type="number" v-model="StartSmokingAge" />'+
          '</li>'+
          '<li class="clearfix">'+
            '<p>普通卷烟每日吸</p>'+
            '<div class="wb">支</div>'+
            '<input type="number" v-model="DailySmoking" />'+
          '</li>'+
          '<li class="clearfix">'+
            '<p>吸烟斗或者旱烟</p>'+
            '<div class="wb">次</div>'+
            '<input type="number" v-model="TobaccoDailySmoking" />'+
          '</li>'+
        '</ul>'+
      '</div>'+

      '<div v-if="drinkInfo === 1">'+
        '<ul class="drinkInfo">'+
          '<li class="clearfix">'+
            '<p>开始吸烟的年龄</p>'+
            '<div class="wb">岁</div>'+
            '<input type="number" v-model="QuitStartSmokingAge" />'+
          '</li>'+
          '<li class="clearfix">'+
            '<p>戒烟时候的年龄</p>'+
            '<div class="wb">岁</div>'+
            '<input type="number" v-model="QuitEndSmokingAge" />'+
          '</li>'+
        '</ul>'+

        '<h4>目前是否接触二手烟环境？</h4>'+

        '<ul class="drinkingSelect">'+
          '<li v-on:click="selectStatusChild(1)" v-bind:class="{active:isActiveChild ===1}">是</li>'+
          '<li v-on:click="selectStatusChild(0)" v-bind:class="{active:isActiveChild ===0}">否</li>'+
        '</ul>'+

      '</div>'+

      '<div v-if="drinkInfo === 2">'+
        '<h4>目前是否接触二手烟环境？</h4>'+
        '<ul class="drinkingSelect">'+
          '<li v-on:click="selectStatusChild(1)" v-bind:class="{active:isActiveChild ===1}">是</li>'+
          '<li v-on:click="selectStatusChild(0)" v-bind:class="{active:isActiveChild ===0}">否</li>'+
        '</ul>'+
      '</div>'+

      '<input type="submit" class="common-btn" value="保存" v-on:click="setSavePersonSmoke" />'+

    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
      LifeStyleID: null,
      drinkInfo: null,
      isActive: null,
      isActiveChild: null,
      StartSmokingAge: null,
      DailySmoking: null,
      TobaccoDailySmoking: null,
      QuitStartSmokingAge: null,
      QuitEndSmokingAge: null,
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
    this.getSavePersonSmoke();
  },
  methods: {
    selectStatus(i) {
      this.isActive = i;
      this.drinkInfo = i;
      this.isActiveChild = null;
    },
    selectStatusChild(i) {
      this.isActiveChild = i;
    },

    //获取吸烟数据
    getSavePersonSmoke() {
      let that = this;
      that.$fetch(that.$api.GetPersonSmokeApi)
        .then(function(res){
          if (res.data.IsSuccess === true) {
            let getData = res.data.ReturnData;
            console.log(res.data);
            that.drinkInfo = getData.IsSmoking - 1;
            that.isActive = getData.IsSmoking - 1;
            that.LifeStyleID = getData.LifeStyleID
            if(that.isActive === 0) {
              that.DailySmoking = getData.DailySmoking;
              that.StartSmokingAge = getData.StartSmokingAge;
              that.TobaccoDailySmoking = getData.TobaccoDailySmoking;
            }
            else if(that.isActive === 1) {
              that.QuitStartSmokingAge = getData.QuitStartSmokingAge;
              that.QuitEndSmokingAge = getData.QuitEndSmokingAge;
              that.isActiveChild = getData.QuitSecondhandSmoke;
            }
            else {
              that.isActiveChild = getData.SecondhandSmoke;
            }
          }
        })
        .catch(function(error){
          console.log(error);
          that.errorDialogeShow(error);
        });
    },

    //提交吸烟数据
    setSavePersonSmoke() {
      let that = this;
      let upData = {
        LifeStyleID: null,
        IsSmoking: null,
        StartSmokingAge: null,
        QuitStartSmokingAge: null,
        QuitEndSmokingAge: null,
        QuitSecondhandSmoke: null,
        SecondhandSmoke: null,
        DailySmoking: null,
        TobaccoDailySmoking: null,
        IsTobaccoSmoking: null,
        IsOrdinarySmoking: null,
      };
      if(that.isActive === 0) {
        upData = Object.assign({}, upData,{ LifeStyleID:that.LifeStyleID, IsSmoking: 1, StartSmokingAge: that.StartSmokingAge, DailySmoking: that.DailySmoking, TobaccoDailySmoking: that.TobaccoDailySmoking});
      }
      if(that.isActive === 1) {
        upData = Object.assign({}, upData,{ LifeStyleID:that.LifeStyleID, IsSmoking: 2, QuitStartSmokingAge: that.QuitStartSmokingAge, QuitEndSmokingAge: that.QuitEndSmokingAge, QuitSecondhandSmoke: that.isActiveChild});
      }
      if(that.isActive === 2) {
        upData = Object.assign({}, upData,{ LifeStyleID:that.LifeStyleID, IsSmoking: 3, SecondhandSmoke: that.isActiveChild});
      }

      that.$fetch(that.$api.SavePersonSmokeApi,{
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
