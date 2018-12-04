/*
   运动组件
*/ 
let sportChild_noData = Vue.component('sport-suggest-child-nodata',
{
	props:['suggestion'],
	template:'<div>'+
				'<div class="suggetion_content_text" style="padding-top:40px;">' +
					'&nbsp;&nbsp;为了科学的为您制定运动计划，您需要完善您的健康档案信息。请完善您的：'+
				'</div>'+
				'<div v-for="(item, index) in suggestion" class="suggetion_content_text">'+
					'&nbsp;&nbsp;&nbsp;&nbsp;{{"（" +index+"）"  + item}}</div>'+
				'<div class="noRecord_background"><div/></div>'+
				'<div class="suggetion_content_text nodata_text" style="text-align:center;">没有数据哦</div>'+
			'</div>',
});

let sportChild_withData = Vue.component('sport-suggest-child-data',
{
	props:['suggestion'],
	template:'<div>'+
				'<div style="padding-top:30px;"></div>'+
				'<div class="sport_plan_header">'+
					'<div class="sportImg_container"><img src="img/sport/sportIcon.png"/></div>'+
					'<div class="sport_title_text">您最近一周的有氧运动计划</div>'+
			 	'</div>'+
			 	'<div class="dayItem_container">'+
					'<div class="dayItem" style="" v-for="dayItem in dayItemArray">'+
						'<div class="sport_day_title sport_title_text">{{dayItem.WeekName ? dayItem.WeekName : dayItem}}</div>'+
						'<img v-bind:src="dayItem.SportIcon ? dayItem.SportIcon : \'img/sport/noSport.png\'" style="width:30px; height:30px;" />'+
						'<div class="sport_time_title sport_subtitle_text">{{dayItem.SportType ? (dayItem.SportTimeMin+\'-\'+dayItem.SportTimeMax) : \'&nbsp;\'}}</div>'+
						'<div class="sport_subtitle_text">{{dayItem.SportType ? \'min\' : \'&nbsp;\'}}</div>'+
				 	'</div>'+
				 '</div>'+
				 '<div class="sport_plan_state sport_content_text" style="margin:10px;">按照上述安排进行锻炼，您本周可以通过运动消耗热量： <strong>{{suggestion.Calory}}</strong>Kcal'+
				 '，相当于减少脂肪： <strong>{{suggestion.Fat}}</strong>g</div>'+
				 '<div style="background-color: rgb(242,242,242); height: 10px; margin-top:15px;"></div>'+

				 '<div class="sport_title_text" style="height:32px; position:relative;"><div style="position:absolute; height:14px; padding-left:10px; top:8px;">运动流程</div></div>'+
				 '<div style="background-color: rgb(242,242,242); height: 1px;"></div>'+
				 '<div class="sport_content_text" style="margin:15px 10px; line-height:20px; white-space:pre-wrap;">'+
				 	'&nbsp;&nbsp;（1）准备活动：进行5分钟左右速度稍慢的快走，并活动全身关节 '+
				 	'&#10;&nbsp;&nbsp;（2）主体部分：按照运动计划进行{{suggestion.SportContent}} '+
				 	'&#10;&nbsp;&nbsp;（3）整体活动：'+
				 	'&#10; &emsp; &emsp;1）慢走3分钟（预防突然停止运动所导致的头晕、休克）'+
				 	'&#10; &emsp; &emsp;2）进行全身各大肌肉群的牵拉练习，每个动作保持20秒'+
				 '</div>'+
				 '<div style="background-color: rgb(242,242,242); height: 1px;"></div>'+
			 '</div>',
	computed:{
		dayItemArray(){
			var originArray = this.suggestion.SportWeekPlanDetailList;

			var tempArray = new Array("周一","周二","周三","周四","周五","周六","周日");
			for (var i = 0; i < originArray.length; i++) {
				let dayItem = originArray[i];

				for (var j = 0; j < tempArray.length; j++) {
					if (tempArray[j] == dayItem.WeekName) {
						tempArray.splice(j, 1, dayItem);
						break;
					}
				}
			}

			return tempArray;
		}
	}
});

let sportCPT = Vue.component('sport-suggest',{
	props:[
		'data',
	],
	components:{ 
		'nodata':sportChild_noData,
		'withdata':sportChild_withData 
	},
	template:'<div>'+
				'<div v-if="sportSuggestion instanceof Array">'+
					'<nodata :suggestion="sportSuggestion"></nodata>' +
			 	'</div>' +
			 	'<div v-else-if="typeof sportSuggestion == \'object\' ">'+
					'<withdata :suggestion="sportSuggestion"></withdata>'+
			 	'</div>'+
			'</div>',

	// 复用组件时，想对路由 "参数的变化" 作出响应的话，你可以简单地 watch (监测变化) $route 对象：
	// 或者使用 2.2 中引入的 beforeRouteUpdate 导航守卫
	computed: {
		sportSuggestion(){
			return this.$store.state.sportSuggestion;
		},
		
	},
	watch:{
		'$route' (to,from){
			// 对路由变化作出响应...
			alert("路由来了:" + $route.params.param);
		}
	},
	/*
	beforeRouteEnter (to, from, next) {
    	// 在渲染该组件的对应路由被 confirm 前调用
    	// 不！能！获取组件实例 `this`
  	  	// 因为当守卫执行前，组件实例还没被创建
  	  	alert("路由来了:" + 'beforeRouteEnter');
  	 	next()
  	},
	beforeRouteUpdate (to, from, next) {
    	alert("路由来了:" + 'beforeRouteUpdate');
    	next()
  	},
  	beforeRouteLeave (to, from, next) {
    	// 导航离开该组件的对应路由时调用
    	// 可以访问组件实例 `this`
    	alert("路由来了:" + 'beforeRouteLeave');
    	next()
  	},
  	*/
}); 