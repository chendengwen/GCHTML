
import globalMixin from "../mixins/global.js";
    
export default {
  name: "MedicationRecord",
  template:
    '<div>'+
      '1'+
    '</div>'
  ,
  mixins: [globalMixin],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.redirectToIndex();
  },
  methods: {},
}
