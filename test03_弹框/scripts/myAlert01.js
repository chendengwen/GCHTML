function MyAlert(options) {
  this.options = options ;
}
/**
 * 提示窗口
 * @param title 提示标题，默认为""
 * @param content 提示内容,默认为""
 * @param closeTime 提示窗口自动关闭时间，单位为ms，默认为2000ms
 */
MyAlert.prototype.alert = function (title,content,closeTime) {
  var div_background = document.createElement("div");
  div_background.style.position = "absolute";
  div_background.style.left = "0";
  div_background.style.top = "0";
  div_background.style.width = "100%";
  div_background.style.height = "100%";
  div_background.style.backgroundColor = "rgba(0,0,0,0.1)";
  div_background.style.zIndex = "1001";
  var div_alert = document.createElement("div");
  div_alert.style.position = "absolute";
  div_alert.style.left = "40%";
  div_alert.style.top = "0";
  div_alert.style.width = "20%";
  div_alert.style.height = "20%";
  div_alert.style.overflow = "auto";
  div_alert.style.backgroundColor = "rgba(255,255,255,0.5)";
  div_alert.style.zIndex = "1002";
  div_alert.style.border = "1px solid blue";
  div_alert.style.borderRadius = "10px";
  div_alert.style.boxShadow = "0 0 10px gray";
  var div_title = document.createElement("div");
  div_title.style.backgroundColor = "rgba(0,255,0,0.3)";
  div_title.style.textAlign = "center";
  var span_title = document.createElement("span");
  span_title.style.fontSize = "20px";
  span_title.style.fontWeight = "bold";
  var text_title = document.createTextNode((title === undefined || title === null) ? "" : title) ;
  span_title.appendChild(text_title);
  div_title.appendChild(span_title);
  div_alert.appendChild(div_title);
  var div_content = document.createElement("div");
  div_content.style.lineHeight = "35px";
  div_content.style.paddingLeft = "10px";
  var span_content = document.createElement("span");
  var text_content = document.createTextNode((content === undefined || content === null) ? "" : content);
  span_content.appendChild(text_content);
  div_content.appendChild(span_content);
  div_alert.appendChild(div_content);
  document.body.appendChild(div_background);
  document.body.appendChild(div_alert);
  setTimeout(function () {
    document.body.removeChild(div_alert);
    document.body.removeChild(div_background);
  },(closeTime === undefined || closeTime === null || closeTime === "") ? 2000 : closeTime);
};