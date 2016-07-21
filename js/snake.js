$(function() {
  //画场景 规划坐标
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      var g = Math.floor(Math.random() * 50);
      var b = Math.floor(Math.random() * 155 + 100);
      $('<div>').addClass('block').attr('id', i + '-' + j).css('backgroundColor', 'rgba(100,' + g + ',' + b + ',0.6)').appendTo('.box');
    }
  }
  //数据
  var dict={
  	'0-0':true,
  	'0-1':true,
  	'0-2':true
  }
  var she = [{
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 1
  }, {
    x: 0,
    y: 2
  }];
  for (var i = 0; i < she.length; i++) {
    $('#' + she[i].x + '-' + she[i].y).addClass('she');
  }
  var shiwubox=function() {
  	do{
  		var a = Math.floor(Math.random() * 20);
    	var b = Math.floor(Math.random() * 20);
  	}while(dict[a+'-'+b]); 
    $('#' + a + '-' + b).addClass('shiwu');
    return {
      x: a,
      y: b
    };
  }
  //移动函数
  var shiwu = shiwubox();
  var fangxiang = 'you';
  var move = function() {
    var jiutou = she[she.length - 1];
    var xintou = {x: jiutou.x,y: jiutou.y + 1};
    if (fangxiang === 'you') {
      var xintou = {
        x: jiutou.x,
        y: jiutou.y + 1
      };
    }else if (fangxiang === 'zuo') {
      var xintou = {
        x: jiutou.x,
        y: jiutou.y - 1
      };
    }else if (fangxiang === 'xia') {
      var xintou = {
        x: jiutou.x + 1,
        y: jiutou.y
      };
    }else if (fangxiang === 'shang') {
      var xintou = {
        x: jiutou.x - 1,
        y: jiutou.y
      };
    }
    if(xintou.y>19||xintou.y<0||xintou.x<0||xintou.x>19){
      	$('.gameover').css('display','block');
      	zanting();
      	return;
     }
    if(dict[xintou.x+'-'+xintou.y]){
    	$('.gameover').css('display','block');
      	zanting();
      	return;
    }
    she.push(xintou);
    dict[xintou.x+'-'+xintou.y]=true;
    $('#' + xintou.x + '-' + xintou.y).addClass('she');
    if (xintou.x === shiwu.x && xintou.y === shiwu.y) {
      $('#' + shiwu.x + '-' + shiwu.y).removeClass('shiwu');
      shiwu = shiwubox();
    } else {
      var weiba = she.shift();
      delete dict[weiba.x+'-'+weiba.y];
      $('#' + weiba.x + '-' + weiba.y).removeClass('she');
    }
  }
  var t;
  var kaishi = function() {
  	clearInterval(t);
    t = setInterval(move, 150);
  }
  var zanting = function() {
    clearInterval(t);
  }
  $('.kaishi').on('click',function(){
  	kaishi();
    // $('.box').css('display','block');
  })
  $('.zanting').on('click',function(){
    zanting();
  })
  $('.restart').on('click',function(){
    location.reload();
  })
  $(document).on('keydown', function(e) {
    e.preventDefault();
    var biao={
    	'you':39,
    	'zuo':37,
    	'shang':38,
    	'xia':40
    }
    if(Math.abs(e.keyCode-biao[fangxiang])==2){
    	return;
    }
    if (e.keyCode === 37) {
      fangxiang = 'zuo';
    }
    if (e.keyCode === 39) {
      fangxiang = 'you';
    }
    if (e.keyCode === 38) {
      fangxiang = 'shang';
    }
    if (e.keyCode === 40) {
      fangxiang = 'xia';
    }
  });
})