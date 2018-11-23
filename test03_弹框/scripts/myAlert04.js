function PopupLayer(options) {
    this.eles = [];
    this.times = [];
    this.contents = [];
    this.time = 0;
    this.animation = false;
    this.isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
    if(this.isMobile){
        document.querySelector("html").classList.add("mobile");
    }
    
    // init layer
    var html = '<div class="layer-content"><div class="content"></div></div>';
    this.layer = document.createElement('div');
    this.layer.className = "layer J_layer";
    this.layer.innerHTML = html;
    document.body.appendChild(layer);
    
    this.addElement = function(ele_options){
        if(!ele_options.ele){
            console.log("need ele option.");
            return;
        }
        // init trigger element
        document.querySelector(ele_options.ele).classList.add("J_popup");
        this.times.push(ele_options.time);
        this.eles.push(ele_options.ele);
        this.contents.push(ele_options.content);
    };
    
    this.forbidScroll = function(e) {
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
        e.stopPropagation && e.stopPropagation();
        return false;
    }
    
    var me = this;
    
    this.toggleShow = function(){
        var now = +new Date();
        if(now<me.end_time){
            me.animation = true;
            var op = (me.end_time - now)/me.trans_time;
            op = me.toggle?(0.9*(1-op)):(0.9*op);
            me.layer.style.background = "rgba(0,0,0,"+op+")";
            //console.log(op);
            window.requestAnimationFrame(me.toggleShow);
        }else{
            if(!me.toggle){
                me.layer.style.display = "none";
                document.querySelector("html").classList.remove("lock");
            }else{
                me.layer.style.background = "rgba(0,0,0,0.9)";
            }
            me.animation = false;
        }
    }
    
    this.showLayer = function(){
        me.layer.style.display = "block";
        me.trans_time = 200;
        me.end_time = +new Date()+me.trans_time;
        me.toggle = true;
        me.toggleShow();
        document.querySelector("html").classList.add("lock");
        window.addEventListener("mousewheel", me.forbidScroll);
        window.addEventListener("touchmove", me.forbidScroll,{passive:false});
    }
    
    this.hideLayer = function(){
        me.trans_time = 200;
        me.end_time = +new Date()+me.trans_time;
        me.toggle = false;
        me.toggleShow();
        window.removeEventListener("mousewheel",me.forbidScroll);
        window.removeEventListener("touchmove",me.forbidScroll,{passive:false});
    }
    
    document.addEventListener("click", function(e) {
        if(me.animation){
            return;
        }
        var cl = e.target.classList;
        if (cl.contains("J_popup")) {
            // choose content
            var len = cl.length;
            while(len--){
                var index = me.eles.indexOf('.'+cl.item(len));
                if(index>-1){
                    document.querySelector(".layer-content .content").innerText = me.contents[index];
                    me.time = me.times[index];
                    break;
                }
            }
            me.showLayer();
            if(me.time){
                setTimeout(function(){
                    me.hideLayer();
                },me.time+me.trans_time);
            }
        } else if (e.target.classList.contains("J_layer")) {
            me.hideLayer();
        }
    });
}

var layer = new PopupLayer();

layer.addElement({
    ele: '.popup',
    content: 'content of layer'
});
layer.addElement({
    ele: '.popup300',
    content: 'content of layer 300',
    time: 300
})