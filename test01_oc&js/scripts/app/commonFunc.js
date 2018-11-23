function topButtonClicked(message){
	alert("按钮被点击  message: " + message);
}

function bottomButtonClicked (message) {
	alert(message ? message : "未设置弹框内容");	
}

function function_01 (message) {
	// alert("收到消息:  " + message);
	var message = {'message' :'You choose the A'};
	window.webkit.messageHandlers.function_oc.postMessage(message);
}