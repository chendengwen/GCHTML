import globalMixin from "../mixins/global.js";

export default {
  name: "EatingHabits",
  template:
    '<div class="content-box smoking">'+
      '<h4>一般情况下，您一周中会有几天食用新鲜蔬菜？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-bind:class="{active: WeeklyVegetables == 7}" v-on:click="selectList(1,7)">5天以上</li>'+
        '<li v-bind:class="{active: WeeklyVegetables == 4}" v-on:click="selectList(1,4)">3-5天</li>'+
        '<li v-bind:class="{active: WeeklyVegetables == 1}" v-on:click="selectList(1,1)">2天以下</li>'+
      '</ul>'+

      '<h4>每天大概吃多少？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-bind:class="{active: DailyVegetables == 7}" v-on:click="selectList(2,7)">1斤以上</li>'+
        '<li v-bind:class="{active: DailyVegetables == 4}" v-on:click="selectList(2,4)">6两到1斤</li>'+
        '<li v-bind:class="{active: DailyVegetables == 1}" v-on:click="selectList(2,1)">6两以下</li>'+
      '</ul>'+

      '<h4>一般情况下，您一周中会有几天食用新鲜水果？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-bind:class="{active: WeeklyFruit == 7}" v-on:click="selectList(3,7)">5天以上</li>'+
        '<li v-bind:class="{active: WeeklyFruit == 4}" v-on:click="selectList(3,4)">3-5天</li>'+
        '<li v-bind:class="{active: WeeklyFruit == 1}" v-on:click="selectList(3,1)">2天以下</li>'+
      '</ul>'+

      '<h4>每天大概吃多少？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-bind:class="{active: DailyFruit == 7}" v-on:click="selectList(4,7)">8斤以上</li>'+
        '<li v-bind:class="{active: DailyFruit == 4}" v-on:click="selectList(4,4)">4两到8两</li>'+
        '<li v-bind:class="{active: DailyFruit == 1}" v-on:click="selectList(4,1)">4两以下</li>'+
      '</ul>'+

      '<h4>一般情况下，您一周中会有几天食用禽/瘦肉？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-bind:class="{active: WeeklyMeat == 7}" v-on:click="selectList(5,7)">5天以上</li>'+
        '<li v-bind:class="{active: WeeklyMeat == 4}" v-on:click="selectList(5,4)">3-5天</li>'+
        '<li v-bind:class="{active: WeeklyMeat == 1}" v-on:click="selectList(5,1)">2天以下</li>'+
      '</ul>'+

      '<h4>每天大概吃多少？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-bind:class="{active: DailyMeat == 7}" v-on:click="selectList(6,7)">1.5两以上</li>'+
        '<li v-bind:class="{active: DailyMeat == 4}" v-on:click="selectList(6,4)">1两-1.5两</li>'+
        '<li v-bind:class="{active: DailyMeat == 1}" v-on:click="selectList(6,1)">1两以下</li>'+
      '</ul>'+

      '<h4>每天食盐摄入量(一啤酒瓶盖的盐约为6克)？</h4>'+
      '<ul class="drinkingSelect" style="margin-bottom: 1.8rem">'+
        '<li v-bind:class="{active: DailySalt == 7}" v-on:click="selectList(7,7)">6g以上</li>'+
        '<li v-bind:class="{active: DailySalt == 4}" v-on:click="selectList(7,4)">3g到6g</li>'+
        '<li v-bind:class="{active: DailySalt == 1}" v-on:click="selectList(7,1)">3g以下</li>'+
      '</ul>'+

      '<input type="submit" class="common-btn" value="保存" v-on:click="setPersonEatHabit" />'+

    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
      LifeStyleID: null,
      WeeklyVegetables: null,
      DailyVegetables: null,
      WeeklyFruit: null,
      DailyFruit: null,
      WeeklyMeat: null,
      DailyMeat: null,
      DailySalt: null
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
    this.getPersonEatHabit().then(()=> {
      this.selectList();
    });
  },
  methods: {
    selectList(x,i) {
      switch (x) {
        case 1:
          this.WeeklyVegetables = i;
          break;
        case 2:
          this.DailyVegetables = i;
          break;
        case 3:
          this.WeeklyFruit = i;
          break;
        case 4:
          this.DailyFruit = i;
          break;
        case 5:
          this.WeeklyMeat = i;
          break;
        case 6:
          this.DailyMeat = i;
          break;
        case 7:
          this.DailySalt = i;
          break;
      }
    },

    //获取饮食数据
    getPersonEatHabit() {
      let that = this;
      return that.$fetch(that.$api.GetPersonEatHabitApi)
      .then(function(res){
        if (res.data.IsSuccess === true) {
          let getData = res.data.ReturnData;
          that.WeeklyVegetables = getData.WeeklyVegetables;
          that.DailyVegetables = getData.DailyVegetables;
          that.WeeklyFruit = getData.WeeklyFruit;
          that.DailyFruit = getData.DailyFruit;
          that.WeeklyMeat = getData.WeeklyMeat;
          that.DailyMeat = getData.DailyMeat;
          that.DailySalt = getData.DailySalt;
          that.LifeStyleID = getData.LifeStyleID;
        }
      })
      .catch(function(error){
        console.log(error);
        that.errorDialogeShow(error);
      });
    },

    //提交饮食数据
    setPersonEatHabit() {
      let that = this;
      let upData = {
        LifeStyleID: that.LifeStyleID,
        WeeklyVegetables: that.WeeklyVegetables,
        DailyVegetables: that.DailyVegetables,
        WeeklyFruit: that.WeeklyFruit,
        DailyFruit: that.WeeklyMeat,
        DailyMeat: that.DailyMeat,
        DailySalt: that.DailySalt,
        WeeklyMeat:that.WeeklyMeat
      };

      that.$fetch(that.$api.SavePersonEatHabitApi,{
        method: 'post',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(upData)
      })
      .then(function(res){
        if (res.data.IsSuccess === true) {
          //console.log(res.data);
          that.errorDialogeShow("保存成功");
        }
      })
      .catch(function(error){
        console.log(error);
        that.errorDialogeShow(error);
      });
    },
  }
}
