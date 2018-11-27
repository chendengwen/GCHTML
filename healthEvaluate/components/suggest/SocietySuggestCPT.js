/*
   社会组件
*/

let society_noData = Vue.component('society-suggest-child-nodata',
{
	template:'<div>'+
				'<div class="suggetion_content_text" style="padding-top:40px;">' +
					'&nbsp;&nbsp;为了科学的为您制定社会建议,您需要完善您的健康档案信息。'+
				'</div>'+
				'<div class="noRecord_background"><div/></div>'+
				'<div class="suggetion_content_text" style="text-align:center;">没有数据哦</div>'+
			'</div>',
});

let society_withData = Vue.component('society-suggest-child-nodata',
{
	props:['suggestion'],
	template:'<div>'+
				'<div class="suggetion_content_text" style="padding-top:40px;">&nbsp;&nbsp;&nbsp;&nbsp;{{suggestion}}</div>'+
			'</div>',
});

let societyCPT = Vue.component('society-suggest',{
	props:[
		'data',
	],
	components:{
		'nodata':society_noData,
		'withdata':society_withData,
	},
	template:'<div>'+
				'<div v-if="societySuggestion">' +
					'<withdata :suggestion="societySuggestion"></withdata>'+
				'</div>'+
				'<div v-else>'+
					'<nodata></nodata>'+
				'</div>'+
			'</div>',
	computed: {
		societySuggestion(){
			return this.$store.state.societySuggestion;
		},
		
	},
});
