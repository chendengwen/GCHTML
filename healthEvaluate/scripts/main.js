var AppVM;
define(['../../components/suggest/EattingSuggestCPT',
	'../../components/suggest/SportSuggestCPT',
	'../../components/suggest/MentalSuggestCPT',
	'../../components/suggest/SocietySuggestCPT'],
function () {

const router = new VueRouter({
	routes:[
		{
			path:'/',
			component: eattingCPT,
			// props:{  
			// 	userName: 'nobody'
			// },
		},
		{
			// 可以在一个路由中设置多段“路径参数”  /sport/:username/post/:post_id
			path:'/sport',component: sportCPT,
			children: [
			// // 动态路径参数 以冒号开头
				{name:'nodata',path:':param2',component:sportChild_noData},
				{name:'data',path:':param2',component:sportChild_withData}
			]
		},
		{
			path:'/mental',component: mentalCPT,
		},
		{
			path:'/society',component: societyCPT,
		},
	]
});

// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  // 需要的操作...  可以做状态验证(是否登录、是否是会员
  /*if (!auth.loggedIn()) {
    	redirect({
      		path: '/login',
      		query: { redirect: route.fullPath }
    	})
  	} else {
    	next()
  	}*/

  next()  // next(false): 中断当前的导航 // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址
})

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    eattingSuggestion:'',	// 饮食建议数据
    sportSuggestion:'',
    mentalSuggestion:'',
    societySuggestion:'',
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const appVM = new Vue({
	el:'#middle',
	store,
	router:router,
	data:{
		linkerList:[
			{title:"饮食建议",path:'/'},
			{title:"运动建议",path:'/sport'},
			{title:"心理建议",path:'/mental'},
			{title:"社会建议",path:'/society'},
		],
		
	},
});

AppVM = appVM;
})
