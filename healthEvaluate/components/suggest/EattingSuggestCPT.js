/*
    饮食组件
*/
let eattingChild_noData = Vue.component('eatting-suggest-child-nodata',{
	template:'<div>'+
				'<div class="suggetion_content_text" style="padding-top:40px;">' +
					'&nbsp;&nbsp;为了科学的为您定制饮食计划，您需要完善您的健康档案信息。请完善您的<strong style="color:red;"> 身高、体重、体力活动 </strong>信息'+
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
		'data',
	], 
	template:
	'<div>'+
    	'<div class="categary_list">'+
        	'<div class="categary_cell" v-for="(cellItem,index) in foodCategarylist" v-bind:key="index">'+
            	'<div class="food_categary_subtitle">{{cellItem.title}}</div>'+
            	'<div class="food_categary_content">'+
               		'<div class="food_categary_item" v-for="item in cellItem.contents">'+
                    	'<img v-bind:src="item.image" style="width:40px; height:40px;"></img><br/>'+
                    	'<span >{{item.subtitle}}</span><span style="color:rgb(0, 141, 253);">{{item.amount}}</span><span>{{item.unit}}</span>'+
               	 	'</div>'+
            	'</div>'+
        	'</div>'+
    	'</div>'+
    	'<div class="red_tips">*每日食盐摄入量<6g，水1500-1700毫升 &#10;*饮食方案仅适用于正常成年人</div>'+
    '</div>'
    ,computed:{
    	foodCategarylist(){
 			let tempArr = [];
 			let titleArr = [
 								{title:"谷薯类",contents:[{subtitle:"大米",key:"Rice",unit:"两",amount:"0",image:"img/rice1.png"}, {subtitle:"馒头",key:"SteamedBun",unit:"两",amount:"0",image:"img/rice2.png"},{subtitle:"红薯",key:"Potato",unit:"两",amount:"0",image:"img/rice3.png"}]},
 								{title:"肉蛋类",contents:[{subtitle:"牛肉",key:"Meat",unit:"两",amount:"0",image:"img/meat1.png"}, {subtitle:"鸡蛋",key:"Egg",unit:"个",amount:"0",image:"img/meat2.png"}, {subtitle:"鱼",key:"Fish",unit:"两",amount:"0",image:"img/meat3.png"}]},
 								{title:"豆奶类",contents:[{subtitle:"牛奶",key:"Milk",unit:"ml",amount:"0",image:"img/milk1.png"}, {subtitle:"南方豆腐",key:"Tofu",unit:"两",amount:"0",image:"img/milk2.png"}, {subtitle:"豆腐干",key:"DriedTofu",unit:"两",amount:"0",image:"img/milk3.png"}]},
 								{title:"蔬菜类",contents:[{subtitle:"番茄",key:"ChineseCabbage",unit:"两",amount:"0",image:"img/vegetables1.png"}, {subtitle:"南瓜",key:"Pumpkin",unit:"两",amount:"0",image:"img/vegetables2.png"}, {subtitle:"胡萝卜",key:"Carrot",unit:"两",amount:"0",image:"img/vegetables3.png"}]},
 								{title:"水果类",contents:[{subtitle:"苹果",key:"Apple",unit:"两",amount:"0",image:"img/fruits1.png"}, {subtitle:"香蕉",key:"Banana",unit:"两",amount:"0",image:"img/fruits2.png"}, {subtitle:"西瓜",key:"Watermelon",unit:"两",amount:"0",image:"img/fruits3.png"}]},
 								{title:"油脂类",contents:[{subtitle:"各种动植物油",key:"Oil",unit:"汤匙(10g每汤匙)",amount:"0",image:"img/grease.png"}]}
 							];

 			for (var i = 0; i < titleArr.length; i++) {
 				let item = titleArr[i];
 				let contents = item.contents;
 				
 				for(var j = 0; j < contents.length; j++){
 					let keyString = contents[j].key;
 					contents[j].amount = this.data[keyString];
 				}
 			}

 			return titleArr;
    	}
    }
});


let categary_chart_item = Vue.component('categary-chart-item',{
	props:[
		'itemData',
	],template:'<div class="chart_item">'+
					'<img v-bind:src="itemData.image"></img>'+
					'<div class="chart_item_title">{{itemData.title}}</div>'+
					'<div class="chart_item_percent">{{itemData.percent + \'%\'}}</div>'+
			   '</div>',
});

/*
    饮食推荐图表组件
*/
let recommend_food_chart = Vue.component('recommend-food-chart',{
	props:[
		'data',
	],
	computed:{
		percentList(){

			return [
						{title:"谷薯类",percent:this.data.Potato,image:"img/diet.png"},
						{title:"肉蛋类",percent:this.data.MeatEgg,image:"img/diet1.png"},
						{title:"豆奶类",percent:this.data.SoyMilk,image:"img/diet2.png"},
						{title:"蔬菜类",percent:this.data.Vegetables,image:"img/diet3.png"},
						{title:"水果类",percent:this.data.Fruits,image:"img/diet4.png"},
						{title:"油脂类",percent:this.data.Fats,image:"img/diet5.png"}
					];
		}
	},
	components:{
		'chartItem':categary_chart_item,
	},
	template:'<div>'+
				'<div class="food_recommend_text">您目前的体重指数：<strong>{{data.BMI}}</strong>kg/m²，属于<strong>{{data.BMIDescription}}</strong>。&#10;为您推荐每日饮食热量供给量： <strong>{{data.DietCalory}}</strong> kcal</div>'+
				'<div class="chart_background">'+
					'<chart-item v-for="(item,index) in percentList" v-bind:key="index" :class="{right_chart_item:index>2}" :itemData="item"></chart-item>'+
					'<div class="chart_circle">'+
						'<svg height="100%" width="100%">'+
							'<circle cx="150" cy="70" r="55" fill="rgb(242,242,242)"/>'+
							'<text x="150" y="70" fill="rgb(51,51,51)" textLength="50" style="font-size:25px; text-anchor:middle;">2800'+
								'<tspan x="150" y="92" style="font-size:16px;">kcal</tspan>'+
							'</text>'+
	    					'<symbol>'+
	    						'<circle id="circle_path" cx="150" cy="70" r="55"  stroke-width="20" stroke-dasharray="86.35 259.05" fill="none"/>'+
							'</symbol>'+
							'<use xlink:href="#circle_path" id="circle_path1" stroke="rgb(32,228,164)" stroke-dashoffset="0"/>'+
							'<use xlink:href="#circle_path" id="circle_path2" stroke="rgb(149,188,12)" stroke-dashoffset="-12.78"/>'+
							'<use xlink:href="#circle_path" id="circle_path3" stroke="rgb(220,103,17)" stroke-dashoffset="-25.56"/>'+
							'<use xlink:href="#circle_path" id="circle_path4" stroke="rgb(230,174,28)" stroke-dashoffset="-70.46"/>'+
							'<use xlink:href="#circle_path" id="circle_path5" stroke="rgb(200,51,129)" stroke-dashoffset="-90"/>'+
							// 补偿计算
							'<use xlink:href="#circle_path" id="circle_path6" stroke="rgb(71,58,140)" stroke-dashoffset="-154"/>'+
							'<use xlink:href="#circle_path" id="circle_path6" stroke="rgb(71,58,140)" stroke-dashoffset="86.35"/>'+
							'<use xlink:href="#circle_path" id="circle_path6" stroke="rgb(71,58,140)" stroke-dashoffset="171"/>'+
						'</svg>'+
					'</div>'+
				'</div>'+
	
				'<div class="chart_background_after" ></div>'+
			 '</div>',
}); 


let eattingChild_withData = Vue.component('eatting-suggest-child-data',{
	props:[
		'suggestionData',
		'suggestionDetailData',
	],
	components:{ 
		'categaryList':common_food_categary,
		'foodChart':recommend_food_chart,
	},
	template:'<div>'+
				'<food-chart :data="suggestionData"></food-chart>'+
				'<categary-list :data="suggestionDetailData"></categary-list>'+
			'</div>'
});


let eattingCPT = Vue.component('eatting-suggest',{
	components:{ 
		'nodata':eattingChild_noData,
		'withdata':eattingChild_withData 
	},
	template:'<div>'+
				'<div v-if="typeof dietSuggestion == \'object\'  &&  dietSuggestionDetail != null">'+
					'<withdata :suggestionData="dietSuggestion" :suggestionDetailData="dietSuggestionDetail"></withdata>'+
				'</div>'+
				'<div v-else>'+
					'<nodata></nodata>'+
				'</div>'+
				'<br>' + 
			'</div>'
	,
	computed: {
		dietSuggestion(){
			return this.$store.state.dietSuggestion;
		},
		dietSuggestionDetail(){
			console.log('typeof dietSuggestionDetail ===' + typeof this.$store.state.dietSuggestionDetail + '  value ==' + this.$store.state.dietSuggestionDetail);
			return this.$store.state.dietSuggestionDetail;
		}
	},
	
	// watch: {
	// 	cpt_data_list: function(a, b) {
	// 		console.log("修改前为：" + a);
	// 		console.log("修改后为：" + b);
	// 	}
	// }

}); 