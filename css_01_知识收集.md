## CSS知识点

####一、清除ul li的默认样式
```ul,li { 
    padding:0;
    margin:0;
    list-style:none; -- 去除自带无序圆点
}
```

####二、去除a标签默认样式
```text-decoration: blink;```

####三、去除手机上的点击阴影
```
-webkit-tap-highlight-color:transparent;
-webkit-appearance:none;    
outline:none
```

####三、IMG自动适应DIV容器大小
```
#IMG样式 -- 简单的做法
width:100%;
height:100%;

#IMG样式 -- 考虑失真的做法
max-width: 100%;
max-height: 100%;

#DIV样式 -- 元素居中显示
display:flex;
align-items:center; 
justify-content:center;

```
