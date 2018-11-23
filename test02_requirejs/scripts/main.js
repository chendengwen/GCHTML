/*
	.注意：在main.js中所设置的脚本是异步加载的。
	所以如果你在页面中配置了其它JS加载，则不能保证它们所依赖的JS已经加载成功。
*/
//配置模块加载位置, 同时可以给模块起一个更短更好记的名字
requirejs.config({
	//加载 baseUrl 路径下所有模块
	baseUrl:'scripts/lib',
    //配置的路径是相对于 baseUrl 的路径
    //加载模块时不用写.js后缀的，当然也是不能写后缀
	paths:{
		moduleA:'../app/moduleA', //本地脚本
		moduleB:'../app/moduleB', //本地脚本
		//可以配置多个路径，如果远程cdn库没有加载成功，可以加载本地的库
		jquery:["http://libs.baidu.com/jquery/2.0.3/jquery", "js/jquery"],//网络脚本
	}
});

/*
	// require会定义三个变量：define,require,requirejs，
	// 其中require === requirejs，一般使用require更简短
	// define来定义一个模块, 然后再页面中使用：require(["js/a"]);
	// equire API的第二个参数是callback，用来处理加载完毕后的逻辑
 */
 // // ** 注意require中的依赖是一个数组，即使只有一个依赖，也必须使用数组来定义
requirejs(['jquery','moduleA','moduleB'],function (jquery,moduleA,moduleB) {
	// 模块全部加载成功在这里执行回调
	console.log(moduleA.color)
 	moduleB.moduleB_alert1()
});


