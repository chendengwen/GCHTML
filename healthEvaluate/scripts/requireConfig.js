require.config({
	baseUrl:"scripts/lib",
	paths:{
		main:"../main",
		netHelper:"../netHelper",
		commonFunc:"../app/commonFunc",
	},
});

require(['commonFunc','netHelper','main'],function(commonFunc){

    // 网络请求
var config = new Config();
var apiStr = config.getUrl(config.APIs.UserInfoApi, { 'phone': '123', 'pwd': '321' })

fetch(apiStr).then(response => {
        return response.json();
    }).then(myjson => {
        // console.log(myjson);
        // 默认设置样式 display: none，加载完成后，在执行 display:block
        document.getElementById('content').style.display = "block";

        // 修改 vue 数据
        let state = window.AppVM.$store.state;
        state.food_categary_list = [
            { title: "蔬菜类22", content: [{ title: "番茄", weight: "6" }, { title: "南瓜", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            { title: "肉蛋类22", content: [{ title: "猪肉", weight: "6" }, { title: "鸡蛋", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            { title: "豆奶类22", content: [{ title: "大米", weight: "6" }, { title: "馒头", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            { title: "水果类", content: [{ title: "大米", weight: "6" }, { title: "馒头", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            { title: "油脂类", content: [{ title: "大米", weight: "6" }, { title: "馒头", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            { title: "谷薯类", content: [{ title: "大米", weight: "6" }, { title: "馒头", weight: "8.4" }, { title: "红薯", weight: "24" }] },
        ];
        state.sportSuggestion = ["体重","您经常进行的运动项目"];



        var message = 'got a messsage';
        //配置点击事件
        this.tempIndex = 0;
        that = this;
        for (var i = 1; i <= 3; i++) {
            var button = document.getElementById('report_radius_' + i);
            button.onclick = function(index,message) {
                return function() {
                    commonFunc.showScoreTips(index,message);
                }
            }(i,message)
        }

    }).catch(e => {
            console.error('error' + e);
    })

})

