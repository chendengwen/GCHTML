/*
   运动组件
*/
let sportChild_noData = Vue.component('sport-suggest-child-nodata',{
	template:'<strong style="margin:20px;color:rgb(51,51,51);line-height:24px;">' +
	'&nbsp;&nbsp;运动组件无数据<strong style="color:red;">身高、体重、体力活动</strong>信息</strong>'
});

let sportChild_withData = Vue.component('sport-suggest-child-data',{
	template:'<strong style="margin:20px;color:rgb(51,51,51);line-height:24px;">' +
	'&nbsp;&nbsp;运动组件很好<strong style="color:red;">{{$route.params.param2}}身高、体重、体力活动</strong>信息</strong>'
});

let sportCPT = Vue.component('sport-suggest',{
	props:[
		'data2',
	],
	components:{ sportChild_noData,sportChild_withData },
	template:'<div>运动建议组件'+
				'<br>' +
				'<span>{{$route.params.param2}}</span>'+
				'<router-view></router-view>'+
			'</div>',
	// 复用组件时，想对路由 "参数的变化" 作出响应的话，你可以简单地 watch (监测变化) $route 对象：
	// 或者使用 2.2 中引入的 beforeRouteUpdate 导航守卫
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