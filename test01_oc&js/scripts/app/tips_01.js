// 写法 1
function fun1(){
  alert("it works");
}

fun1();


// 写法 2  --- 使用了块作用域来申明function防止污染全局变量
// (function(){
//     function fun1(){
//       alert("it works");
//     }

//     fun1();
// })()

/*
	当运行上面两种例子时不知道你是否注意到，alert执行的时候，html内容是一片空白的，
	html标签内容并未被显示，当点击确定后才出现.
	这就是JS阻塞浏览器渲染导致的结果。
*/
// 使用 require.js 后避免了阻塞
/*
<head>
    <script type="text/javascript" src="scripts/lib/require.js"></script>
    <script type="text/javascript">
        require(["scripts/app/tips_01"]);
    </script>
 </head>
 */

 