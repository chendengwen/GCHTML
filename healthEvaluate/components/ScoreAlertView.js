// 生理 心理 社会 弹框信息
function ScoreAlertView (options) {
	this.options = options;
}

/**
* 弹框信息
* @param 按钮索引 1、2、3
*/
ScoreAlertView.prototype.show = function(index,content){
	this.mobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	if (this.mobile) {
		document.querySelector("html").classList.add("mobile");
	}
	this.animation = false;
	this.time = 0;
	var me = this;

	// 遮罩层、显示层、标题、关闭按钮
	// this.alertViewLayer = document.body.getElementsByClassName("alert_view_layer")[0];
	// if (this.alertViewLayer == undefined) {
		this.alertViewLayer = document.createElement('div');
	// }
	
	var innerHtml = '<div class="alert_view">'+
						'<div class="alert_title">健康评估结果</div>'+
						'<div class="close_view"></div>'+
						'<div class="alert_line"></div>'+
					'</div>';

	this.alertViewLayer.className = "alert_view_layer";
	this.alertViewLayer.innerHTML = innerHtml;
	document.body.appendChild(this.alertViewLayer);

	// 根据需要添加显示组件
	var containter = document.createElement('div');
	containter.className = "alert_items_bg";
	this.alertViewLayer.firstChild.appendChild(containter);
	if (index == 1) {
		this.physiology(containter,content);
	}else if (index == 2) {
		this.mental(containter,content);
	}else if (index == 3) {
		this.society(containter,content);
	}
	

	this.forbidScroll = function (e) {
		e.preventDefault && e.preventDefault();
		e.returnValue = false;
		e.stopPropagation && e.stopPropagation();
		return false;
	}

	this.isShow;
	this.toggleShow = function () {
		var now = new Date();
		if (now < me.end_time) {
			me.animation = true;
			var op = (me.end_time - now)/me.trans_time;
			op = me.toggle?(0.6*(1-op)):(0.6*op);
			me.alertViewLayer.style.background = "rgba(170,170,170,"+op+")";
			// me.alertViewLayer.style.opactity = op;
			if (!me.isShow) {
				console.log('op ===' + op);
				
				me.alertViewLayer.firstChild.style.display = "none";
			}
			
			window.requestAnimationFrame(me.toggleShow);
		}else {
			if (!me.toggle) {
				me.alertViewLayer.style.display = "none";
				document.querySelector("html").classList.remove("lock");

				document.body.removeChild(me.alertViewLayer);
			}else{
				me.alertViewLayer.style.background = "rgba(170,170,170,0.6)";
			}
			me.animation = false;
		}
	}

	this.showLayer = function () {
		me.alertViewLayer.style.display = "block";
		me.trans_time = 200;
		me.end_time = +new Date()+me.trans_time;
		me.toggle = me.isShow = true;
		me.toggleShow();

		document.querySelector("html").classList.add("lock");
		window.addEventListener("mousewheel",me.forbidScroll);
		window.addEventListener("touchmove",me.forbidScroll,{passive:false});
	}

	this.hideLayer = function () {
		me.trans_time = 200;
		me.end_time = +new Date() + me.trans_time;
		me.toggle = me.isShow = false;
		me.toggleShow();

		window.removeEventListener("mousewheel", me.forbidScroll);
		window.removeEventListener("touchmove",me.forbidScroll,{passive:false});
	}

	document.addEventListener('click', function (e) {
		if (me.animation) {
			return;
		}

		var cl = e.target.classList;
		console.log(e.target.id);
		if (cl.contains("report_radius") || cl.contains("report_radius_span") || RegExp(/report_radius_span_/).test(e.target.id)) {
			me.showLayer();
			if (me.time) {
				setTimeout(function () {
					me.hideLayer();
				}, me.time+me.trans_time);
			}
		}else if (cl.contains("alert_view_layer") || cl.contains("close_view")) {
			me.hideLayer();
		}
	});

	/*　
	** 适配iphone   
	** 适配iphone上 document.addEventListener 不起作用
	*/
	if (navigator.userAgent.match(/(iPhone|iPod|ios)/i)) {
    	document.addEventListener('touchend', function(e) {
        	if (me.animation) {
            	return;
        	}

	        var cl = e.target.classList;
	        console.log(e.target.id);
	        if (cl.contains("report_radius") || cl.contains("report_radius_span") || RegExp(/report_radius_span_/).test(e.target.id)) {
	            me.showLayer();
	            if (me.time) {
	                setTimeout(function() {
	                    me.hideLayer();
	                }, me.time + me.trans_time);
	            }
	        } else if (cl.contains("alert_view_layer") || cl.contains("close_view")) {
	            me.hideLayer();
	        }
	    });
	}

};

///  一个项高度为26px
/**
* 自定义需要添加到 alertView 内的组件
* @param containter 容器
* @param content 显示的信息内容  [{'desease':'糖尿病','level': level}]
*/
ScoreAlertView.prototype.physiology = function (containter,content) {
	var alertTitleElement = containter.parentNode.firstChild;
	alertTitleElement.innerHTML = "生理" + alertTitleElement.innerHTML;

	// title div容器
	var titleInnerHtml = '';
	for(var i = 0; i < content.length; i++){
		titleInnerHtml += '<div class="item_title">'+ content[i]['desease'] + '</div>';
	}
	var titleDiv = '<div class="title_containter">'+ titleInnerHtml + '</div>';


	// color div容器
	var subtitleArr = new Array();
	var colorInnerHtml = '';
	for(var i = 0; i < content.length; i++) {
        var value = parseFloat(content[i]['level']);
        var color;
        var subtitle;
        var width = 'width:' + value*100 + '%;';
        if (value >= 0.8) {
            color = 'background-color:#f94e93;';
            title = "高风险";
        } else if (value >= 0.5){
        	color = 'background-color:#fba034;';
            title = "中风险";
        } else if (value < 0.5 && value > 0.2) {
            color = 'background-color:#23d25d;'
            title = "低风险";
        } else if (value == 1.0){
        	color = 'background-color:#d91f1f;'
            title = "很高风险";
        } else {
        	color = 'background-color:#23d25d;'
            title = "极低风险";
        }
        subtitleArr.push(title);

        var styleStr = color+ width + 'border-radius: 5px;';

        colorInnerHtml += '<div class="item_color_bg">'+
	 						 '<div class="item_color_fg" style=' + '\"' + styleStr + '\"' + '></div>'+
	 					  '</div>'
	}
	var colorDiv = '<div class="color_containter" style="">'+ colorInnerHtml + '</div>';


	// subtitle div容器
	var subtitleInnerHtml = '';
	for(var i = 0; i < content.length; i++){
		subtitleInnerHtml += '<div class="item_subtitle">'+ subtitleArr[i] + '</div>';
	}
	var subtitleDiv = '<div class="subtitle_containter" style="">'+ subtitleInnerHtml + '</div>';


	containter.innerHTML = titleDiv + colorDiv + subtitleDiv;
}

/**
* 心理
* @param containter 容器
* @param content 显示的信息内容  {listdata:[{'desease':'糖尿病','level': level}], conclusion:'经测评，您目前...'}
*/
ScoreAlertView.prototype.mental = function (containter,content) {
	var alertTitleElement = containter.parentNode.firstChild;
	alertTitleElement.innerHTML = "心理" + alertTitleElement.innerHTML;

	var dataArr = content.listdata;

	// title div容器
	var titleInnerHtml = '';
	for(var i = 0; i < dataArr.length; i++){
		titleInnerHtml += '<div class="item_title">'+ dataArr[i]['desease'] + '</div>';
	}
	var titleDiv = '<div class="title_containter">'+ titleInnerHtml + '</div>';


	// color div容器
	var subtitleArr = new Array();
	var colorInnerHtml = '';
	for(var i = 0; i < dataArr.length; i++) {
        var value = parseFloat(dataArr[i]['level']);
        var color;
        var subtitle;
        var width = 'width:' + value*100 + '%;';
        if (value >= 0.8) {
            color = 'background-color:#f94e93;';
            title = "优";
        } else if (value >= 0.4 && value < 0.8) {
            color = 'background-color:#23d25d;'
            title = "中";
        } else {
        	color = 'background-color:#23d25d;'; // rgb(35, 210, 93)
            title = "差";
        }
        subtitleArr.push(title);

        var styleStr = color+ width + 'border-radius: 5px;';

        colorInnerHtml += '<div class="item_color_bg">'+
	 						 '<div class="item_color_fg" style=' + '\"' + styleStr + '\"' + '></div>'+
	 					  '</div>'
	}
	var colorDiv = '<div class="color_containter" style="">'+ colorInnerHtml + '</div>';


	// subtitle div容器
	var subtitleInnerHtml = '';
	for(var i = 0; i < dataArr.length; i++){
		subtitleInnerHtml += '<div class="item_subtitle">'+ subtitleArr[i] + '</div>';
	}
	var subtitleDiv = '<div class="subtitle_containter" style="">'+ subtitleInnerHtml + '</div>';


	// 总体结论
	var conclusionInnerHtml = '<div class="conclusion_containter">'+ 
								'<div class="conclusion_title" style="height=20px; text-align:left;">总体结论</div>'+
							  	'<div class="alert_line" style=""></div>'+ 
							  	'<div class="conclusion_title">'+ content.conclusion +'</div>'+
							  '</div>';

	containter.innerHTML = titleDiv + colorDiv + subtitleDiv + conclusionInnerHtml;
}

/**
* 社会
*/
ScoreAlertView.prototype.society = function (containter,content) {
	this.mental(containter,content);

	var alertTitleElement = containter.parentNode.firstChild;
	let innerHtml = alertTitleElement.innerHTML;
	alertTitleElement.innerHTML = innerHtml.replace("心理", "社会");
}


