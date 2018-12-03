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
let config = new Config();
let apiStr = config.getUrl(config.APIs.HealthEvaluateInfo) // { 'phone': '123', 'pwd': '321' }
let headerSet = {headers:{Token:'c2d7de775d864a9dbc7e2184f0a53ab4'}}; // localStorage.token

// var headers = new Headers();
// headers.append('Accept', 'application/json'); 
// headers.append('Token', 'c2d7de775d864a9dbc7e2184f0a53ab4'); 
// var request = new Request(apiStr, {
//     headers: headers,
//     method:"GET"
// });
fetch(apiStr,headerSet).then(response => {
        return response.json();
    }).then(jsonData => {

        // 默认设置样式 display: none，加载完成后，在执行 display:block
        document.getElementById('content').style.display = "block";

        // 修改 vue 数据
        let state = window.AppVM.$store.state;
        state.food_categary_data = [
            // { title: "蔬菜类22", content: [{ title: "番茄", weight: "6" }, { title: "南瓜", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            // { title: "肉蛋类22", content: [{ title: "猪肉", weight: "6" }, { title: "鸡蛋", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            // { title: "豆奶类22", content: [{ title: "大米", weight: "6" }, { title: "馒头", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            // { title: "水果类", content: [{ title: "大米", weight: "6" }, { title: "馒头", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            // { title: "油脂类", content: [{ title: "大米", weight: "6" }, { title: "馒头", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            // { title: "谷薯类", content: [{ title: "大米", weight: "6" }, { title: "馒头", weight: "8.4" }, { title: "红薯", weight: "24" }] },
            // { title: "油脂类", content: [{ title: "各类植物油和动物油汤匙(10g汤匙)", weight: "6" }] },
        ];
        state.eattingSuggestion = Object.assign(jsonData.ReturnData.DietAdvice, jsonData.ReturnData.DietAdviseDetail);
        console.log(state.eattingSuggestion);
        state.sportSuggestion = jsonData.ReturnData.SportAdvice;
        state.mentalSuggestion = jsonData.ReturnData.PsychologyResult.BehaviorSuggestion;
        state.societySuggestion = jsonData.ReturnData.SocialResult.BehaviorSuggestion;

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

        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            window.webkit.messageHandlers.dataLoaded.postMessage();
        }
        
    }).catch(e => {
            console.error('error' + e);
            window.webkit.messageHandlers.dataLoaded.postMessage({code:-1,message:"获取数据失败"});
    })

})

