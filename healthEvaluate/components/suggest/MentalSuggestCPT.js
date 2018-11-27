/*
   心理组件
*/

let mental_noData = Vue.component('mental-suggest-child-nodata',
{
	template:'<div>'+
				'<div class="suggetion_content_text" style="padding-top:40px;">' +
					'&nbsp;&nbsp;为了科学的为您制定心理建议,您需要完善您的健康档案信息。'+
				'</div>'+
				'<div class="noRecord_background"><div/></div>'+
				'<div class="suggetion_content_text" style="text-align:center;">没有数据哦</div>'+
			'</div>',
});

let mental_withData = Vue.component('mental-suggest-child-nodata',
{
	props:['suggestion'],
	template:'<div>'+
				'<div class="suggetion_content_text" style="padding-top:40px;">&nbsp;&nbsp;&nbsp;&nbsp;{{suggestion}}</div>'+
			'</div>',
});


let mentalCPT = Vue.component('mental-suggest',{
	props:[
		'data',
	],
	components:{
		'nodata':mental_noData,
		'withdata':mental_withData,
	},
	template:'<div>'+
				'<div v-if="mentalSuggestion">' +
					'<withdata :suggestion="mentalSuggestion"></withdata>'+
				'</div>'+
				'<div v-else>'+
					'<nodata></nodata>'+
				'</div>'+
			'</div>',
	computed: {
		mentalSuggestion(){
			return this.$store.state.mentalSuggestion;
		},
		
	},
}); 
