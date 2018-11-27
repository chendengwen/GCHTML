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
                    	'<img style="width:30px; height:30px;"></img><br/>'+
                    	'<span >{{item.title}}</span><span>{{item.weight}}</span><span>两</span>'+
               	 	'</div>'+
            	'</div>'+
        	'</div>'+
    	'</div>'+
    	'<div class="red_tips">*每日食盐摄入量<6g，水1500-1700毫升 &#10;*饮食方案仅适用于正常成年人</div>'+
    	// '<div class="red_tips">*饮食方案仅适用于正常成年人</div>'+
    '</div>'
});



let eattingChild_withData = Vue.component('eatting-suggest-child-data',{
	props:[
		'dataList',
	],
	components:{ 
		'categaryList':common_food_categary,
	},
	template:'<div>'+
				'<div></div>'+
				'<categary-list :dataList="dataList"></categary-list>'+
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
					'<withdata :dataList="cpt_data_list"></withdata>'+
				'</div>'+
				'<div v-else>'+
					'<nodata></nodata>'+
				'</div>'+
				'<br>' +
			'</div>'
	,computed: {
		cpt_data_list(){
			return this.$store.state.food_categary_list;
		}
	},
	// watch: {
	// 	cpt_data_list: function(a, b) {
	// 		console.log("修改前为：" + a);
	// 		console.log("修改后为：" + b);
	// 	}
	// }

}); 