/*
   运动组件
*/ 
let sportChild_noData = Vue.component('sport-suggest-child-nodata',
{
	props:['suggestion'],
	template:'<div>'+
				'<div class="suggetion_content_text" style="padding-top:40px;">' +
					'&nbsp;&nbsp;为了科学的为您制定运动计划,您需要完善您的健康档案信息。请完善您的:'+
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
	template:'<div><strong style="margin:20px;color:rgb(51,51,51);line-height:24px;">' +
	'&nbsp;&nbsp;运动组件很好<strong style="color:red;">{{$route.params.param2}}身高、体重、体力活动</strong>信息</strong></div>'
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
			 	'<div v-else-if="typeof sportSuggestion == \'string\' ">'+
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