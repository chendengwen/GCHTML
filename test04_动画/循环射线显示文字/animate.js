window.onload=function(){

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = window.innerWidth;
var ch = canvas.height = window.innerHeight;


var txt = "A225";
var txtH = 100;
var font = "sans-serif";

// txtCtx用来提取颜色的
var txtCanvas = document.createElement("canvas");
var txtCtx = txtCanvas.getContext("2d");
txtCtx.font = txtH + "px " + font;
txtCtx.textBaseline = "middle";
var txtW = Math.floor(txtCtx.measureText(txt).width);
txtCanvas.width = txtW;
txtCanvas.height = txtH*1.5;


var w2 = cw/2;
var h2 = ch/2;
var pi = Math.PI;
var pi2 = pi*.5;
var rayColor1 = "#e0f7fa";
var rayColor2 = "#18ffff";

var gradient = ctx.createRadialGradient(w2, h2, 0, w2, h2, txtW);
gradient.addColorStop(0, rayColor2);
gradient.addColorStop(1, rayColor1);
// ctx射线描边
ctx.strokeStyle = gradient;

// txtCtx射线填充
txtCtx.fillStyle = gradient;
txtCtx.font = txtH + "px " + font;
txtCtx.textBaseline = "middle";
// txtCtx填充文字
txtCtx.fillText(txt,0,txtH*.5);

//dirty adjust for descends
txtH *= 1.5;

var bufferCanvas = document.createElement("canvas");
bufferCanvas.width = txtW;
bufferCanvas.height = txtH;
var buffer = bufferCanvas.getContext("2d");

//文字显示位置
var sx = (cw-txtW)*0.5
var sy = (ch-txtH)*0.5

//generate data
var rays = [];
// 复制画布上指定矩形的像素数据
var txtData = txtCtx.getImageData(0,0,txtW,txtH);
for (var i = 0; i < txtData.data.length; i+=4) {
  var ii = i/4;
  var row = Math.floor(ii/txtW)
  var col = ii%txtW
  var alpha = txtData.data[i+3]
  if(alpha !== 0){
    // 获取画布上的颜色
    var c = "rgba("
    c += [txtData.data[i],txtData.data[i+1],txtData.data[i+2], alpha/255 ] 
    c += ")";
    // 保存代码块在数组中
    rays.push(new Ray(Math.floor(ii/txtW), ii%txtW, c));  
  }
}

var current = 1;
//start animation
tick();

function tick() {
  ctx.clearRect(0,0,cw,ch)
  // drawImage() 方法在画布上绘制图像、画布或视频
  ctx.drawImage(bufferCanvas, 0, 0, current, txtH, sx, sy, current, txtH)
  ctx.save()
  ctx.globalAlpha = .07;
  //设置如何将一个源（新的）图像绘制到目标（已有）的图像上  --- lighter 显示源图像+目标图像。
  ctx.globalCompositeOperation = "lighter";
  if(drawRays(current)){
    current++;
    current = Math.min(current, txtW)
    window.requestAnimationFrame(tick)  
  }else{
    fadeOut()
  }
  ctx.restore()
}

function fadeOut(){
  ctx.clearRect(0,0,cw,ch)
  ctx.globalAlpha *= .95;
  ctx.drawImage(bufferCanvas, 0, 0, current, txtH, sx, sy, current, txtH)
  if(ctx.globalAlpha > .01){
   window.requestAnimationFrame(fadeOut) 
  }else{
    window.setTimeout(restart, 500)
  }
}

function restart(){
  for(var i = 0; i < rays.length; i++){
    rays[i].reset()
  }
  ctx.globalAlpha = 1
  buffer.clearRect(0,0,txtW,txtH)
  current = 1;
  tick();
}

function drawRays(c){
  var count = 0;
  //开始一段新路径
  ctx.beginPath()
  for(var i = 0; i < rays.length; i++){
    //数组里保存的是颜色值
    var ray = rays[i];
    if(ray.col < c){
      count += ray.draw()
    }
  }
  ctx.stroke()
  return count !== rays.length;
}

function filterRays(r){
  return Boolean(r);
}

function Ray(row, col, f){
  this.col = col;
  this.row = row;
  
  var xp = sx + col;
  var yp = sy + row;
  var fill = f;
  
  var ath = (txtH/1.5) 
  
  var a = pi2 * (this.row - ath*.5) / ath;
  if(a === 0){
    a = (Math.random() - .5) * pi2;
  }
  var da = .02 * Math.sign(a);
  da += (Math.random() - .5) * .005;
  var l = 0;
  var dl = Math.random()*2 + 2;
  
  var buffered = false;
  this.reset = function(){
    a = pi2 * (this.row - ath*.5) / ath;
    if(a === 0){
      a = -pi2*.5;
    }
    l = 0;
    buffered = false
  }
  this.draw = function(){
    if(l < 0){
      if(!buffered){
        buffer.fillStyle = fill;
        buffer.fillRect(this.col, this.row, 1, 1);
        buffered = true
      }
      return 1;
    }else{
      ctx.moveTo(xp, yp)
      ctx.lineTo(xp + Math.cos(a) * l, yp + Math.sin(a) * l);
      a += da;
      l += Math.cos(a)*dl;
      return 0;
    }
  }
}
}