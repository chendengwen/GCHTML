// (function (window,undefined) {
// 	// 用一个函数域包起来，就是所谓的沙箱
//    	// 在这里边var定义的变量，属于这个函数域内的局部变量，避免污染全局
// 	// 把当前沙箱需要的外部变量通过函数参数引入进来
//    	// 只要保证参数对内提供的接口的一致性，还可以随意替换传进来的这个参数
// 	"use strict";
	
// 	jQuery = function (str) {
// 		// body... 
// 		alert(str);
// 	}

// 	window.jQuery = window.$ = jQuery;
// })(window);


define(['../../components/ScoreAlertView'],function(){
	return {
		/**
		* @param index 按钮索引
		* @param message 消息对象
		*/
		showScoreTips : function(index,message) {
        	// alert("showScoreTips");
        	// window.open('test01.html', '_blank')
        	new ScoreAlertView().show(index,message);
    	}
	}
});






























