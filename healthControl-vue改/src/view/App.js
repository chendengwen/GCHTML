
import ErrorDialoge from "../components/ErrorDialoge.js";
import Loading from "../components/Loading.js"

export default {
  name: 'App',
	template:
			'<div>'+
				'<router-view/>' +
				'<loading v-if="this.$store.state.loading.show" ></loading>'+
				'<ErrorDialoge v-if="this.$store.state.errorDialoge.show"></ErrorDialoge>'+
			'</div>'
	,
	data() {
    return {};
  },
  computed: {},
  components: {
      Loading,
      ErrorDialoge
  },
  mounted() {
    this.getWindowWidth();
  },
  methods: {
    getWindowWidth() {
    		let w = $(window).width()/10;
    		if(w >= 76.8) {
      		$("html").css("font-size","76.8px");
    		}
    		else {
      		$("html").css("font-size",w +"px");
    		}
    }
  }
}
