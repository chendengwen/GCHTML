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
		'<div class="commom_food_example">常见食物举例</div>'+
    	'<div class="categary_list">'+
        	'<div class="categary_cell" v-for="(cellItem,index) in dataList" v-bind:key="index">'+
            	'<div class="food_categary_subtitle">{{cellItem.title}}</div>'+
            	'<div class="food_categary_content">'+
               		'<div class="food_categary_item" v-for="item in cellItem.content">'+
                    	'<img style="width:150px; height:150px;"></img>'+
                    	'<span >{{item.title}}</span><span>{{item.weight}}</span><span>两</span>'+
               	 	'</div>'+
            	'</div>'+
        	'</div>'+
    	'</div>'+
    '</div>'
});

let eattingChild_withData = Vue.component('eatting-suggest-child-data',{
	props:[
		'dataList',
	],
	components:{ 
		'categaryCell':common_food_categary,
	},
	template:'<div>'+
				'<strong style="margin:20px;color:rgb(51,51,51);line-height:24px;">' +
				'&nbsp;&nbsp;数据很完美,很好<strong style="color:red;">身高、体重、体力活动</strong>信息</strong>'+
				'<categary-cell :dataList="dataList"></categary-cell>'+
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