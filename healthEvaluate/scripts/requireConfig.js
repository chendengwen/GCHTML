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
let apiStr = config.getUrl(config.APIs.HealthEvaluateInfo) 
let headerSet = {headers:{Token:'7041e6f21b5d4f2fbfa28f733611b767'}}; // localStorage.token

/* 通过 request 对象发送请求
var headers = new Headers();
headers.append('Accept', 'application/json'); 
headers.append('Token', 'd13b50b4633b44b491a4dae6295db9cf'); 
var request = new Request(apiStr, {
    headers: headers,
    method:"GET"
});
*/
fetch(apiStr,headerSet).then(response => {
        return response.json();
    }).then(jsonData => {

        // 默认设置样式 display: none，加载完成后执行 display:block 显示内容
        document.getElementById('content').style.display = "block";

        // 修改 vue 数据
        let state = window.AppVM.$store.state;
        state.dietSuggestion = jsonData.ReturnData.DietAdvice;
        state.dietSuggestionDetail = jsonData.ReturnData.DietAdviseDetail;
        state.sportSuggestion = jsonData.ReturnData.SportAdvice;
        state.mentalSuggestion = jsonData.ReturnData.PsychologyResult.BehaviorSuggestion;
        state.societySuggestion = jsonData.ReturnData.SocialResult.BehaviorSuggestion;

        // 分数
        document.getElementById('head_span_score').innerHTML = jsonData.ReturnData.PersonDeseaseCategory.HealthScore;
        document.getElementById('head_span_grade').innerHTML = jsonData.ReturnData.PersonDeseaseCategory.HealthGrade;
        document.getElementById('report_radius_span_1').innerHTML = jsonData.ReturnData.PersonDeseaseCategory.PhysiologicalHealth;
        document.getElementById('report_radius_span_2').innerHTML = jsonData.ReturnData.PsychologyResult.Score;
        document.getElementById('report_radius_span_3').innerHTML = jsonData.ReturnData.SocialResult.Score;
        let time = jsonData.ReturnData.PersonDeseaseCategory.ModifiedTime.split('T')[0];
        document.getElementById('middle_span_comment').innerHTML = 
        '注: 您本次评估的健康档案信息完整度为' + jsonData.ReturnData.DataIntegrity + '%,评估时间为' + time + '。信息越完整,评估越精准! 建议完善信息后再次评估';

        // 风险因子  var colorArr = ["0.3","0.6"];
        /* 疾病 
        [
            {desease:'高血压',  ID: 1, level: {1:低风险,2:中等风险,3:高风险}},
            {desease:'糖尿病',  ID: 2, level: {4:极低风险,5:低风险,6:中等风险,7:高风险}},
            {desease:'脑卒中',  ID: 3, level: {8:很高风险,9:低风险,10:中等风险,11:高风险}},
            {desease:'高脂血症', ID: 4, level: {12:低风险,13:中等风险,14:高风险}},
            {desease:'ASCVD',  ID: 5, level: {15:低风险,16:中等风险,17:高风险}},
            {desease:'血脂异常', ID: 6, level: {18:极低风险,19:低风险,20:中等风险,21:高风险,22:很高风险}}
        ]
        */
        var physiologyDeseaseFactors = [];
        for (var i = 0; i < jsonData.ReturnData.HealthDeseaseCategoryList.length; i++) {
            let originFactor = jsonData.ReturnData.HealthDeseaseCategoryList[i];
            let levelID = originFactor.DangerLevelID;
            let level = 0.2;
            switch (levelID) {
                case 4,18:
                    level = 0.2; break;
                case 1,5,9,12,15,19:
                    level = 0.3; break;
                case 2,6,10,13,16,20:
                    level = 0.5; break;
                case 3,7,11,14,17,21:
                    level = 0.8; break;
                case 8,22:
                    level = 1.0; break;
                default: break;
            }
            let factor = { 'desease': originFactor.HealthDeseaseName,
                            'level': level
                        };
            physiologyDeseaseFactors.push(factor);
        }

        /* 心理 
            level: {1:低,2:中,3:优}
        */
        function getLevel (result) {
            switch(result) {
                case 1:
                    return 0.2;
                case 2:
                    return 0.5;
                case 3:
                    return 1.0;
                default: return 0.2;
            }
        }
        var psychologyResult = jsonData.ReturnData.PsychologyResult;
        var mentalDeseaseFactors = {
                                        conclusion: psychologyResult.GeneralConclusion,
                                        listdata: [
                                                    { 'desease': '焦虑', 'level': getLevel(psychologyResult.Item1) },
                                                    { 'desease': '抑郁', 'level': getLevel(psychologyResult.Item2) },
                                                    { 'desease': '睡眠', 'level': getLevel(psychologyResult.Item3) },
                                                    { 'desease': '心理躯体化', 'level': getLevel(psychologyResult.Item4) }
                                                  ]
                                    };

        /* 社会
            level: {1:差,2:中,3:优}
        */
        var socialResult = jsonData.ReturnData.SocialResult;
        var societyDeseaseFactors = {
                                        conclusion: socialResult.GeneralConclusion,
                                        listdata: [
                                                    { 'desease': '社会适应', 'level': getLevel(socialResult.Item1) }, 
                                                    { 'desease': '社会接触', 'level': getLevel(socialResult.Item2) },
                                                    { 'desease': '社会支持', 'level': getLevel(socialResult.Item3) }
                                                  ]
                                    };

        //配置点击事件
        var messageList = [physiologyDeseaseFactors,mentalDeseaseFactors,societyDeseaseFactors];
        for (var i = 1; i <= 3; i++) {
            var button = document.getElementById('report_radius_' + i);
            button.onclick = function(index,message) {
                return function() {
                    commonFunc.showScoreTips(index,message);
                }
            }(i,messageList[i-1])
        }

        // 通知手机数据加载完
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            window.webkit.messageHandlers.dataLoaded.postMessage({code:0,message:"获取数据成功"});
        }
        
    }).catch(e => {
            console.error('error' + e);
            if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
                window.webkit.messageHandlers.dataLoaded.postMessage({code:-1,message:"获取数据失败"});
            }
    })

})

