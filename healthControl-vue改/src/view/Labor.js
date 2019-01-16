import "../assets/css/iosSelect.css";
import "../assets/js/zepto.js";
import "../assets/js/iosSelect.js";
import globalMixin from "../mixins/global.js";

let selectData = [
  {'id': '5', 'value': '羽毛球'},
  {'id': '6', 'value': '跑步'},
  {'id': '7', 'value': '游泳'},
  {'id': '21', 'value': '乒乓球'},
  {'id': '22', 'value': '自行车'}
];

export default {
  name: "Labor",
  template:
    '<div class="content-box smoking">'+
      '<h4>您工作性质是？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-on:click="selectStatus(0)" v-bind:class="{active:isActive === 0}">轻体力劳动者</li>'+
        '<li v-on:click="selectStatus(1)" v-bind:class="{active:isActive === 1}">中等体力劳动者</li>'+
        '<li v-on:click="selectStatus(2)" v-bind:class="{active:isActive === 2}">重体力劳动者</li>'+
      '</ul>'+

      '<ul class="drinkInfo">'+
        '<li class="clearfix">'+
          '<p>您每周锻炼</p>'+
          '<div class="wb">次</div>'+
          '<input type="number" v-model="WeeklyExercise"/>'+
        '</li>'+
        '<li class="clearfix">'+
          '<p>平均每次锻炼</p>'+
          '<div class="wb">次</div>'+
          '<input type="number" v-model="ExerciseMinutes" />'+
        '</li>'+
      '</ul>'+

      '<h4>您锻炼的自我感觉是？</h4>'+
      '<ul class="drinkingSelect">'+
        '<li v-on:click="selectStatusChild(0)" v-bind:class="{active:isActiveChild === 0}">自我感觉轻松</li>'+
        '<li v-on:click="selectStatusChild(1)" v-bind:class="{active:isActiveChild === 1}">自我感觉稍累</li>'+
        '<li v-on:click="selectStatusChild(2)" v-bind:class="{active:isActiveChild === 2}">自我感觉较累</li>'+
      '</ul>'+

      '<h4>您经常进行的3种运动项目是？</h4>'+
      '<ul class="drinkInfo">'+
        '<li class="clearfix">'+
          '<p>项目一</p>'+
          '<div class="wb">次</div>'+
          '<div class="pc-box">'+
            '<input type="hidden" name="bank_id" id="sportId1" value="" />'+
            '<span id="showSport1">请选择</span>'+
          '</div>'+
        '</li>'+
        '<li class="clearfix">'+
          '<p>项目二</p>'+
          '<div class="wb">次</div>'+
          '<div class="pc-box">'+
            '<input type="hidden" name="bank_id" id="sportId2" value="" />'+
            '<span id="showSport2">请选择</span>'+
          '</div>'+
        '</li>'+
        '<li class="clearfix">'+
          '<p>项目三</p>'+
          '<div class="wb">次</div>'+
          '<div class="pc-box">'+
            '<input type="hidden" name="bank_id" id="sportId3" value="" />'+
            '<span id="showSport3">请选择</span>'+
          '</div>'+
        '</li>'+
      '</ul>'+

      '<h4>其他</h4>'+
      '<textarea class="textarea" placeholder="请输入其他运动项目，用逗号隔开" v-model="ExerciseOtherMode"></textarea>'+

      '<input type="submit" class="common-btn" value="保存" v-on:click="setPersonSport" />'+

    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {
      LifeStyleID:null,
      isActive: null,
      isActiveChild: null,
      WeeklyExercise: null,
      ExerciseMinutes: null,
      ExerciseOtherMode: null,
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
    this.getPersonSport().then(()=> {
      this.selectSports();
    });

  },
  methods: {
    selectStatus(i) {
      this.isActive = i;
    },
    selectStatusChild(i) {
      this.isActiveChild = i;
    },

    selectSports() {
      let idBox = ["sportId1","sportId2","sportId3"];
      let showBox = ["showSport1","showSport2","showSport3"];
      for(let i in idBox) {
        let showBankDom = $('#' + showBox[i]);
        let bankIdDom = $('#' + idBox[i]);

        showBankDom.on('click', function () {
          let genderId = showBankDom.attr("data-id");
          let genderName = showBankDom.attr('data-value');

          let bankSelect = new IosSelect(1,
            [selectData],
            {
              container: '.container',
              title: '选择运动',
              itemHeight: 50,
              itemShowCount: 3,
              oneLevelId: genderId,
              callback: function (selectOneObj) {
                bankIdDom.value = selectOneObj.value;
                showBankDom.html(selectOneObj.value)
                showBankDom.attr('data-id',selectOneObj.id);
                showBankDom.attr('data-value',selectOneObj.value);
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

    sportsKind(data) {
      let sports = "", sportsId = null;
      if(data !== null) {
        let pd = parseInt(data);
        switch (pd) {
          case 5:
            sports = "羽毛球";
            sportsId = 5;
            break;
          case 6:
            sports = "跑步";
            sportsId = 6;
            break;
          case 7:
            sports = "游泳";
            sportsId = 7;
            break;
          case 21:
            sports = "乒乓球";
            sportsId = 21;
            break;
          case 22:
            sports = "骑自行车";
            sportsId = 22;
            break;
        }

      }
      else {
        sports = "请选择";
      }
      return {sports,sportsId};
    },

    //获取运动数据
    getPersonSport() {
      let that = this;
      return that.$fetch(that.$api.GetPersonSportApi)
        .then(function(res){
          if (res.data.IsSuccess === true) {
            let getData = res.data.ReturnData;
            console.log(res.data);
            that.LifeStyleID = getData.LifeStyleID;
            that.isActive = parseInt(getData.IsExercise) - 1;
            that.isActiveChild = parseInt(getData.ExerciseState) - 1;
            that.WeeklyExercise = getData.WeeklyExercise;
            that.ExerciseMinutes = getData.ExerciseMinutes;
            that.ExerciseOtherMode = getData.ExerciseOtherMode;

            document.querySelector('#showSport1').innerText = that.sportsKind(getData.ExerciseMode).sports;
            document.querySelector('#showSport1').dataset['id'] = that.sportsKind(getData.ExerciseMode).sportsId;
            document.querySelector('#showSport2').innerText = that.sportsKind(getData.ExerciseMode2).sports;
            document.querySelector('#showSport2').dataset['id'] = that.sportsKind(getData.ExerciseMode2).sportsId;
            document.querySelector('#showSport3').innerText = that.sportsKind(getData.ExerciseMode3).sports;
            document.querySelector('#showSport3').dataset['id'] = that.sportsKind(getData.ExerciseMode3).sportsId;
          }
        })
    },

    //提交运动数据
    setPersonSport() {
      let that = this;

      let upData = {
        LifeStyleID: that.LifeStyleID,
        IsExercise: that.isActive + 1,
        ExerciseState: that.isActiveChild + 1,
        WeeklyExercise: that.WeeklyExercise,
        ExerciseMinutes: that.ExerciseMinutes,
        ExerciseOtherMode: that.ExerciseOtherMode,
        ExerciseMode: document.querySelector('#showSport1').dataset['id'],
        ExerciseMode2: document.querySelector('#showSport2').dataset['id'],
        ExerciseMode3: document.querySelector('#showSport3').dataset['id']
      };

      that.$fetch(that.$api.SavePersonSportApi,{
        method: 'post',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(upData)
      })
        .then(function(res){
          if (res.data.IsSuccess === true) {
            //console.log(res.data);
            that.errorDialogeShow("提交成功！");
          }
        })
    },
  }
}

  
