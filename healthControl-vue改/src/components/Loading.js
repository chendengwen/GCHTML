export default { 
  	template:'<div class="loading-wrap">'+
              '<div class="loading-masker"><img src="./src/assets/img/center.png" /></div>'+
              '<div class="loading-box"><i class="loading-icon"></i><span class="text"></span></div>'+
          '</div>'
       ,
    name: 'Loading',
    data() {
          return {};
    },
    props: {
      text: {
         type: String,
         default: "正在加载……"
      }
    },
    computed: {},
    components: {},
    mounted() {},
    methods: {}
  }