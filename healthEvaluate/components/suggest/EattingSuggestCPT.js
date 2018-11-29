/*
    饮食组件
*/
let eattingChild_noData = Vue.component('eatting-suggest-child-nodata',{
	template:'<div>'+
				'<div class="suggetion_content_text" style="padding-top:40px;">' +
					'&nbsp;&nbsp;为了科学的为您定制饮食计划,您需要完善您的健康档案信息。请完善您的<strong style="color:red;"> 身高、体重、体力活动 </strong>信息'+
				'</div>'+
				'<div class="noRecord_background"><div/></div>'+
				'<div class="suggetion_content_text nodata_text" style="text-align:center;">没有数据哦</div>'+
			'</div>'
});


/*
    食物分类组件
*/
let common_food_categary = Vue.component('common-food-categary',{
	props:[
		'dataList',
	],
	template:
	'<div>'+
    	'<div class="categary_list">'+
        	'<div class="categary_cell" v-for="(cellItem,index) in dataList" v-bind:key="index">'+
            	'<div class="food_categary_subtitle">{{cellItem.title}}</div>'+
            	'<div class="food_categary_content">'+
               		'<div class="food_categary_item" v-for="item in cellItem.content">'+
                    	'<img></img><br/>'+
                    	'<span >{{item.title}}</span><span>{{item.weight}}</span><span>两</span>'+
               	 	'</div>'+
            	'</div>'+
        	'</div>'+
    	'</div>'+
    	'<div class="red_tips">*每日食盐摄入量<6g，水1500-1700毫升 &#10;*饮食方案仅适用于正常成年人</div>'+
    	// '<div class="red_tips">*饮食方案仅适用于正常成年人</div>'+
    '</div>'
});


let categary_chart_item = Vue.component('categary-chart-item',{
	props:[
		'itemData',
	],template:'<div class="chart_item">'+
					'<img src="./img/diet.png"></img>'+
					'<div class="chart_item_title">肉蛋类</div>'+
					'<div class="chart_item_percent">23.88%</div>'+
			   '</div>',
});

/*
    饮食推荐图表组件
*/
let recommend_food_chart = Vue.component('recommend-food-chart',{
	props:[
		'chartData',
	],
	data:function () {
		return {
			 list:['11','22','33','44','55','66'],
		}
	},
	components:{
		'chartItem':categary_chart_item,
	},
	template:'<div>'+
				'<div class="food_recommend_text">您目前的体重指数<strong>{{11}}</strong>kg/m²，属于<strong>{{222}}</strong>。&#10;为您推荐每日饮食热量供给量： <strong>{{333}}</strong> kcal</div>'+
				'<div class="chart_background">'+
					'<chart-item v-for="(item,index) in list" :class="{right_chart_item:index>2}">{{item}}</chart-item>'+
					'<div class="chart_circle">'+
						'<svg height="100%" width="100%">'+
							'<circle cx="150" cy="70" r="55" fill="rgb(242,242,242)"/>'+
							'<text x="150" y="70" fill="red" textLength="80">健康评估'+
								'<tspan x="150" y="90">12cal</tspan>'+
							'</text>'+
	    					'<symbol>'+
	    						'<circle id="circle_path" cx="150" cy="70" r="55" stroke-width="20" stroke-dasharray="62.8 251.2" fill="none"/>'+
							'</symbol>'+
							'<use xlink:href="#circle_path" id="circle_path1" stroke="#ffb850" stroke-dashoffset="0"/>'+
							'<use xlink:href="#circle_path" id="circle_path2" stroke="#ff7e5d" stroke-dashoffset="62.8"/>'+
							'<use xlink:href="#circle_path" id="circle_path3" stroke="#8cd2a4" stroke-dashoffset="125.6"/>'+
							'<use xlink:href="#circle_path" id="circle_path4" stroke="#ff00fd" stroke-dashoffset="188.4"/>'+
							'<use xlink:href="#circle_path" id="circle_path5" stroke="#62adea" stroke-dashoffset="251.2"/>'+
						'</svg>'+
					'</div>'+
				'</div>'+
	
				'<div class="chart_background_after" ></div>'+
			 '</div>',
});


let eattingChild_withData = Vue.component('eatting-suggest-child-data',{
	props:[
		'data',
	],
	components:{ 
		'categaryList':common_food_categary,
		'foodChart':recommend_food_chart,
	},
	template:'<div>'+
				'<food-chart :chartData="data"></food-chart>'+
				'<categary-list :dataList="data"></categary-list>'+
			'</div>'
});


let eattingCPT = Vue.component('eatting-suggest',{
	// props:['userName'],
	components:{ 
		'nodata':eattingChild_noData,
		'withdata':eattingChild_withData 
	},
	template:'<div>'+
				'<div v-if="cpt_data_list instanceof Array">'+
					'<withdata :data="cpt_data_list"></withdata>'+
				'</div>'+
				'<div v-else>'+
					'<nodata></nodata>'+
				'</div>'+
				'<br>' +
			'</div>'
	,computed: {
		cpt_data_list(){
			return this.$store.state.food_categary_data;
		}
	},
	// watch: {
	// 	cpt_data_list: function(a, b) {
	// 		console.log("修改前为：" + a);
	// 		console.log("修改后为：" + b);
	// 	}
	// }

}); 