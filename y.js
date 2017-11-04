
  //得当前样式
    function getStyle(obj,arrt){
  //兼容IE
      return obj.currentStyle ? obj.currentStyle[arrt] : getComputedStyle(obj,null)[arrt];
  }

  var main = document.getElementById('main');
  var go = document.getElementById('go');
  var count = document.getElementById('count');
  var cols = ['#1AAB8A','#E15650','#121B39','#80A84E'];


  //动态创建div
    function cDiv(classname){
  //创建div
      var oDiv = document.createElement('div');
  //随机值
      var index = Math.floor(Math.random()*4);
  //行 添加相应的class类
      oDiv.className = classname; 
  //创建行之后再动态创建4个小div并添加到行里面 
        for(var j =0;j<4;j++){
          var iDiv = document.createElement('div'); 
          oDiv.appendChild(iDiv); 
        }
  //然后把行添加到main里面
  //判断需要添加的位置
        if(main.children.length == 0){
          main.appendChild(oDiv);
        }else {
          main.insertBefore(oDiv, main.children[0]);
        }
  //随机给行里面的某一个div添加背景色 
    oDiv.children[index].style.backgroundColor = cols[index];
  //标记颜色盒子
    oDiv.children[index].className = "i";
  }


  //移动div
  function move(obj){
  //关闭上一个定时器
      clearInterval(obj.timer);
  //默认速度与计分
      var speed = 5,num = 0;
  //定时器管理与开启定时器
      obj.timer = setInterval(function(){
  //速度 
      var step = parseInt(getStyle(obj,'top')) + speed;
  //移动盒子
      obj.style.top = step + 'px';
  //判断并创建新的盒子
        if(parseInt(getStyle(obj,'top')) >= 0){  
          cDiv('row');
          obj.style.top = -150 + 'px';
        }
  //删除边界外的盒子
        if(obj.children.length == 6){
  //删除前，如果有盒子没有点击则结束游戏
          for(var i = 0;i<4;i++){
            if(obj.children[obj.children.length - 1].children[i].className == 'i'){
  //游戏结束
              obj.style.top = '-150px';
              count.innerHTML = '游戏结束,最高得分: ' + num;
  //关闭定时器
              clearInterval(obj.timer);
  //显示开始游戏
              go.children[0].innerHTML = 'Renew game';
              go.style.display = "block";  
            }
          }  
          obj.removeChild(obj.children[obj.children.length - 1]);
        }

  //点击与计分
  obj.onmousedown = function(event){
  //点击的不是白盒子 
  // 兼容IE
      event = event || window.event;
      if((event.target? event.target : event.srcElement).className          == 'i'){
  //点击后的盒子颜色
        (event.target? event.target : event.srcElement).style.backgroundColor = "#bbb";
  //清除盒子标记
        (event.target? event.target : event.srcElement).className             = '';
  //计分
        num++;
  //显示得分
        count.innerHTML = '当前得分: ' + num;
        bgm.play();
        }
        else{
  //游戏结束
          obj.style.top = 0;
          count.innerHTML = '游戏结束,最高得分: ' + num;
  //关闭定时器
          clearInterval(obj.timer);
  //显示开始游戏
          go.children[0].innerHTML = 'Renew game';
          go.style.display = "block";
        }
  //盒子加速
      if(num%10 == 0){
        speed++;
      }
    }
  //松开触发停止
    obj.onmouseup=function(event){
    
    }
  },20) 
    }


  //开始游戏
  go.children[0].onclick = function(){
  //开始前判断main里面是否有盒子，有则全部删除
    if(main.children.length){
  //暴力清楚main里面所有盒子
        main.innerHTML = '';
      }
  //清空计分
    count.innerHTML = '游戏开始'; 
  //隐藏开始盒子
    this.parentNode.style.display = "none";
  //调用定时器
    move(main);
  } 
 