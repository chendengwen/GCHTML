define(["moduleA"],function(moduleA){

    return {
    	moduleB_alert1 : function(){
      		alert("moduleB_alert1");
    	},

    	moduleB_alert2 : function(){
      		console.log(moduleA.color);
    	}
    }
})