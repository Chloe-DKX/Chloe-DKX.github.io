

/*
下拉菜单 
例调用：Nav('#nav');
*/
function Nav(id){
	var oNav = $(id);
	var aLi = oNav.find('li');
	aLi.hover(function (){
        $(this).addClass('on');
	},function (){
        $(this).removeClass('on');
	})	
};
/*
搜索点击弹出效果 
例调用：SerMax('#gp-serBtn2','#gp-search2');
*/
function SerMax(id,main){
  var serBtn = $(id);
  var wrapSer = $(main);
    serBtn.click(function(){
    	$(this).filter('#gp-serBtn2').fadeOut(300);
    	$(this).filter('#gp-serBtn3').toggleClass('active');
      if($(main).hasClass('no-overlay')){
        wrapSer.toggleClass('active');
      }else{
        serFun ()
      }
      
    })
    function serFun (){
      wrapSer.toggleClass('active');
      if($(wrapSer).hasClass('active')){
      	$('body').css('overflow','hidden').addClass('searchActive');
      	$('.gp-overlay').fadeIn(300)
      }else{
        wrapSer.removeClass('active');
        $('.gp-overlay').fadeOut(300)
        $('body').css('overflow','auto').removeClass('searchActive');
      }
    }
  $('.gp-overlay').click(function(){
  	serFun ()
  	})
  //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
   $(document).click(function(event){
  	 var _con1 = serBtn  // 设置目标区域
  	 var _con2 = wrapSer;  // 设置目标区域
  	 if(!_con1.is(event.target) && _con1.has(event.target).length === 0 && !_con2.is(event.target) && _con2.has(event.target).length === 0){
      wrapSer.removeClass('active')
      serBtn.delay(300).fadeIn(300)
  	 }
  });
}


/*
移动端主导航 
例调用：mobileMenu('#gp-menu');
*/
function mobileMenu(id){
  var oMenu = $(id);
	oMenu.find(".gp-menu-header .gp-menu-header-icon").click(function(){
	  	oMenu.find(this).toggleClass("gp-menu-header-icon-click gp-menu-header-icon-out");
	  	$('.mobile_bg').fadeToggle(300)
	  	oMenu.find(".gp-menu-nav").filter('.gp-menu-dropdown1').slideToggle(300);//下拉竖排
	  	oMenu.find(".gp-menu-nav").filter('.gp-menu-dropdown2').slideToggle(300);//下拉横排
      oMenu.find(".gp-menu-nav").filter('.gp-menu-dropdown2').find('ul:first').children('li').find('a.iconfont').attr('href','javascript:void(0)')
	  	// oMenu.find(".gp-menu-nav").filter('.gp-menu-offcanvas1').slideToggle(300);//下拉横排
      $('body').toggleClass('open')
	  });
    $('.mobile_bg').click(function(){
      oMenu.find('.gp-menu-header-icon').toggleClass("gp-menu-header-icon-click gp-menu-header-icon-out");
      oMenu.find(".gp-menu-nav").filter('.gp-menu-dropdown1,.gp-menu-dropdown2').slideToggle(300);
      $(this).fadeToggle(300)
      $('body').removeClass('open');
    })
	  oMenu.find(".gp-menu-nav > ul > li").each(function( index ) {
      var len = oMenu.find(".gp-menu-nav > ul > li").length;
	  	$( this ).css({'animation-delay': (index/len)+'s'});
	  });
    oMenu.find(".gp-menu-nav li > ul").each(function() {
      var $this = $(this);
      $this.find('li').each(function(index){
        var len = $this.find('li').length;
        $(this).css({'animation-delay': (index/len)+'s'});
      })
    });
	  oMenu.find('.gp-menu-nav li .gp-menu-arrow').click(function(){
      if($(this).parent('li').hasClass('on')){
      		$(this).next('ul').slideUp(500)
      		$(this).parent('li').removeClass('on')
      	}else{
      		$(this).next('ul').slideDown(500);
      		$(this).parent().siblings().find('ul').slideUp(500)
      		$(this).parent().siblings().removeClass('on')
      		$(this).parent('li').addClass('on')
      	}
	  })
    oMenu.find('.gp-menu-nav').filter('.gp-menu-dropdown2').find('a.icon-down').click(function(){
      if($(this).parent('li').hasClass('on')){
      		$(this).next('ul').slideUp(500)
      		$(this).parent('li').removeClass('on')
      	}else{
      		$(this).next('ul').slideDown(500);
      		$(this).parent().siblings().find('ul').slideUp(500)
      		$(this).parent().siblings().removeClass('on')
      		$(this).parent('li').addClass('on')
      	}
    })
    		
}



/*
tab切换
例调用:$(".tab").tab({ev : 'mouseover',more : false,auto : false});
*/
;(function($){
    $.fn.extend({
        tab: function (options){
            var defaults = {         //默认参数
                ev : 'mouseover',    //默认事件'mouseover','click'
                delay : 100,         //延迟时间
                auto : true,         //是否自动切换 true,false
                speed : 2000,        //自动切换间隔时间(毫秒)
                more : false         //是否有more,false,true
            };
            var options = $.extend(defaults, options);  //用户设置参数覆盖默认参数
            return this.each(function (){
                var o = options;
                var obj = $(this);
                var oTil = obj.find('.til_tab');
                var oBox = obj.find('.tabListBox');
                var oMore = null;
                var iNum = 0;
                var iLen = oTil.length;
                obj.find('.til_tab').eq(0).addClass('on')
                obj.find('.tabListBox').eq(0).css('display','block')
                obj.find('.more_tab').eq(0).css('display','block')
                //鼠标事件绑定
                oTil.bind(o.ev , function (){
                    var _this = this;
                    if(o.ev == 'mouseover' && o.delay){
                        _this.timer = setTimeout(function (){
                            change(_this);
                        },o.delay);
                    }else{
                        change(_this);
                    }; 
                })

                oTil.bind('mouseout',function (){
                    var _this = this;
                    clearTimeout(_this.timer);
                });

                //自动切换效果
                (function autoPlay(){
                    var timer2 = null;
                    if(o.auto){
                        function play(){
                            iNum++;
                            if(iNum >= iLen){
                                iNum =0;
                            };
                            change(oTil.eq(iNum));
                        };
                        timer2 = setInterval(play,o.speed);

                        obj.on('mouseover',function (){
                            clearInterval(timer2);
                        })

                        obj.on('mouseout',function (){
                            timer2 = setInterval(play,o.speed);
                        })
                    };
                })();

                function change(box){
                    iNum = $(box).index();
                    oTil.removeClass('on');
                    oBox.css('display','none');
                    if(o.more){
                        oMore = obj.find('.more_tab');
                        oMore.css('display','none');
                        oMore.eq(iNum).css('display','block');
                    };
                    oTil.eq(iNum).addClass('on');
                    oBox.eq(iNum).css('display','block');
                }
            });
        }
    })
})(jQuery);

/*
返回顶部
*/
$(window).scroll(function(){
    var docHeight = $(document).height()
    var winHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    if(scrollTop >= 165){
    	$('.gp-goTop').fadeIn(500)
    }else{
    	$('.gp-goTop').fadeOut(500)
    }
    if(scrollTop >= docHeight - winHeight){
      $('.gp-goTop-fixed').addClass('bottom')
    }else{
      $('.gp-goTop-fixed').removeClass('bottom')
    }
  })
$('.gp-goTop').click(function(){
	$('body,html').stop().animate({scrollTop:0});
	return false;
});

/*
奇数偶数不同的样式
例调用:
odd= {"background":"#fff","color":"#666"};//奇数样式
even={"background":"#f7f7f5","color":"#666"};//偶数样式
单个元素: odd_even('.list',odd,even,'tr'); 
多个元素:
odd= {"background":"#fff","color":"#666"};//奇数样式
even={"background":"#f7f7f5","color":"#666"};//偶数样式
$('.list').each(function(){
    odd_even($(this),odd,even,'tr'); 
 })
*/
function odd_even(id,odd,even,className){
	$(id).find(className).each(function(index,element){
	if(index % 2 == 1){
		$(this).css(odd);
		$(this).addClass('odd');
    }	else{
		$(this).css(even);
		$(this).addClass('even');
    }
	});
} 

/*
侧边栏三级
例调用: asideMenu('#gp-subLeft')
*/
function asideMenu(menu){
  //当前状态高亮
  $(menu).find('.active').each(function(){
    if($(this).parents('dl').hasClass('gp-second-nav')){
     $(this).parents('dl').css('display','block');
     $(this).parents('li').addClass('active')
     $(this).parents('li').find('.gp-toggles').addClass('icon-jian').removeClass('icon-jia');
    }
  })
  $(menu).find('.gp-toggles').click(function(){
    if($(this).parents('li').hasClass('active')){
        $(this).addClass('icon-jia').removeClass('icon-jian')
        $(this).next('.gp-second-nav').slideUp(500)
        $(this).parents('li').removeClass('active')
      }else{
        $(this).addClass('icon-jian').removeClass('icon-jia');
        $(this).next('.gp-second-nav').slideDown(500);
        $(this).parents('li').siblings().find('.gp-second-nav').slideUp(500)
        $(this).parents('li').siblings().removeClass('active')
        $(this).parents('li').siblings().find('.gp-toggles').addClass('icon-jia').removeClass('icon-jian')
        $(this).parents('li').addClass('active')
      }
    })
	// 四级
	$(menu).find('.gp-sub-toggles').click(function(){
	  if($(this).parents('dd').hasClass('active')){
	      $(this).addClass('icon-jia').removeClass('icon-jian')
	      $(this).next('.gp-second-nav').slideUp(500)
	      $(this).parents('dd').removeClass('active')
	    }else{
	      $(this).addClass('icon-jian').removeClass('icon-jia');
	      $(this).next('.gp-second-nav').slideDown(500);
	      $(this).parents('dd').siblings().find('.gp-second-nav').slideUp(500)
	      $(this).parents('dd').siblings().removeClass('active')
	      $(this).parents('dd').siblings().find('.gp-toggles').addClass('icon-jia').removeClass('icon-jian')
	      $(this).parents('dd').addClass('active')
	    }
	  })
}


//移动端侧边栏菜单
function mobileAsideMenu(menu,main){
		$(menu).find('.gp-m-inner-header').click(function(){
	  	$(this).toggleClass("gp-m-inner-header-icon-click gp-m-inner-header-icon-out");
	  	$(this).find('.iconfont').toggleClass("icon-jia icon-jian")
	  	$(".gp-subNavm").slideToggle(500);
		
	  });
    $('.gp-subNavm').find('.gp-m-toggle').click(function(){
      if($(this).parents('li').hasClass('active')){
        $(this).addClass('icon-right').removeClass('icon-down')
        $(this).next('dl').slideUp(500)
        $(this).parents('li').removeClass('active')
      }else{
        $(this).addClass('icon-down').removeClass('icon-right');
        $(this).next('dl').slideDown(500);
        $(this).parents('li').siblings().find('dl').slideUp(500)
        $(this).parents('li').siblings().removeClass('active')
        $(this).parents('li').siblings().find('.gp-m-toggle').addClass('icon-right').removeClass('icon-down')
        $(this).parents('li').addClass('active')
      }
    })
	$('.gp-subNavm').find('.gp-sub-m-toggle').click(function(){
	  if($(this).parents('dd').hasClass('active')){
	    $(this).addClass('icon-right').removeClass('icon-down')
	    $(this).next('dl').slideUp(500)
	    $(this).parents('dd').removeClass('active')
	  }else{
	    $(this).addClass('icon-down').removeClass('icon-right');
	    $(this).next('dl').slideDown(500);
	    $(this).parents('dd').siblings().find('dl').slideUp(500)
	    $(this).parents('dd').siblings().removeClass('active')
	    $(this).parents('dd').siblings().find('.gp-m-toggle').addClass('icon-right').removeClass('icon-down')
	    $(this).parents('dd').addClass('active')
	  }
	})
};
//头部置顶固定
function headerFix(){
	var iWSon = document.documentElement.clientWidth;
	var $windowHeight = $(window).height();
	var bodyHeight = $(document.body).height();
	var $headerHeight = $('header').height();
	$(window).scroll(function(){
	  var scrollTop = $(window).scrollTop();
	  if(scrollTop >= $headerHeight && bodyHeight > $windowHeight+$headerHeight*2){
	  	if(iWSon > 1080){
	  		$('header,body').addClass('currents');
	  	}else{
	  		$('header,body').removeClass('currents');
	  	}
	  }else{
	  	$('header,body').removeClass('currents');
	  }
	})
}


 Nav('#nav');//电脑端导航
  mobileMenu('#gp-menu');//移动端导航
  SerMax('#gp-serBtn2','#gp-search2');
  headerFix();