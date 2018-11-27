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
            { title: "油脂类", content: [{ title: "各类植物油和动物油汤匙(10g汤匙)", weight: "6" }] },
        ];
        state.sportSuggestion = ["体重","您经常进行的运动项目"];
        state.mentalSuggestion = "这说明你可能身体已经得病，需要到医院进一步检查和治疗，要特别注意检查血压的变化。"+
        "平时你应该注意心平气和，保持愉快的心情。您应该经常参加一些体育锻炼活动。但尽量避免感冒。身体不舒服的时候，"+
        "要注意充分休息。当焦虑感比较强烈的时候，不妨约请朋友搞一些社交活动。您可以将此时的心境告诉父母或朋友，以求他们的帮助。"+
        "你应该经常参加一些集体性的社交活动，对一些比较剧烈的或刺激性较强的活动更应该多参加。如果有条件，可以在各种活动中尝试去表现自己。"+
        "你要注意多交朋友，经常和朋友在一起谈心和交流思想感情。你白天尽量不要睡觉，也不要午睡。晚上睡不着时，也不要吃安眠药物，可以用调节呼吸，"+
        "闭目养神的办法，使自己逐渐入睡。晚上入睡前可以洗热水澡或用热水烫脚，不要在晚上喝茶水，以免影响睡眠。要逐渐养成定时睡眠、定时起床的习惯。";
        state.societySuggestion = "你不必忧心忡忡、因为一个人的社会适应能力是随着年龄的增长、知识经验的丰富而不断增强的。只要你充满信心，刻苦学习，"+
        "虚心求教，加强锻炼，你一定会成为适应社会的成功者。不管现实环境多么令人不愉快，只有接触环境，才能了解和适应环境。建议您多参与一些社交活动，"+
        "通过与他人的比较，更好地认识自己，调整自我评价。建议您重新审视自己，是否低估了自身优点或者低估了周围人能够提供的支持。您应该尝试主动寻求帮助，"+
        "从别人身上寻找有效的解决问题的途径，并且保持一份良好的心情。不要怕别人会嘲笑您，也不要怕别人帮不了您，问题一定会有解决的办法。当然，当您遇到快乐的事情，"+
        "也不要忘记将自己的快乐心情分享给家人和朋友。";

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

