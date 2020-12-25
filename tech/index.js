
  $(function() {
      $(".banner .flexslider").flexslider({
        animation: 'fade',
        easing: 'swing',
        controlNav: false,
        slideshowSpeed: 5000, //展示时间间隔ms
        animationSpeed: 500, //滚动时间ms
        touch: true, //是否支持触屏滑动
         before: function (slider) { //滑动后是否自动轮播
            slider.pause();
            slider.play();
        }
       });
       $('.banner .flexslider .flex-direction-nav a').each(function(e){
          var $this =$(this);
          $this.addClass('iconfont');
          $this.text('');
          if($this.hasClass('flex-prev')){
            $(this).addClass('icon-zuo')
          }else if($this.hasClass('flex-next')){
            $(this).addClass('icon-you')
          }  
          });
		  // 首页延迟显示
		$(window).scroll(function(){
		    $(".effect").each(function(index, element) {
		        var e=$(this);
		        var fix=parseInt(e.attr("fix"));
		        if(!fix && fix!=0){fix=$(window).height()*9*0.1;}
		        else{fix=$(window).height()*fix*0.1;}
		        //var h=$(window).height()-$(e).height()>0?$(window).height()-$(e).height():0;
		        if($(window).scrollTop()>=$(e).offset().top-fix){
		            if(!$(e).hasClass("isView")){
		                $(e).addClass("isView");
		                
		            }           
		        }
		        else{
		            if($(e).hasClass("isView")){
		                $(e).removeClass("isView");
		                if($(e).hasClass("part1")){
		                    $(".home9 .part1").removeClass("s");
		                }
		            }
		        }
		    });
		});
		
		// 新闻动态767以下变成轮播
		 newsBox()
		  $(window).resize(function() {
		    newsBox()
		  });
		 function newsBox(){
		  var winWidth1 = $(window).width();
		   if(winWidth1 <= 767) {
		      $(".news-box .flexslider").flexslider({
		      		animation: "slide",
		      	 // animationLoop: true,
		      	 itemWidth: 230,
		      	 controlNav: false,
		      	 itemMargin: 5,
		      	 minItems: 1,
		      	// move: 1,
		      	touch:true,
		      	 maxItems: 6
		      });
			  $(".topic-box .flexslider").flexslider({
			  		animation: "slide",
			  	 // animationLoop: true,
			  	 itemWidth: 270,
			  	 controlNav: false,
			  	 directionNav: false,
			  	 itemMargin: 5,
			  	 minItems: 1,
			  	// move: 1,
			  	touch:true,
			  	 maxItems: 4
			  });
			  $(".subject-box .flexslider").flexslider({
			  		animation: "slide",
			  	 // animationLoop: true,
			  	 itemWidth: 311,
			  	 controlNav: false,
			  	 directionNav: false,
			  	 itemMargin: 5,
			  	 minItems: 1,
			  	// move: 1,
			  	touch:true,
			  	 maxItems: 4
			  });
			  $('.news-box .flexslider .flex-direction-nav a').each(function(e){
			     var $this =$(this);
			     $this.addClass('iconfont');
			     $this.text('');
			     if($this.hasClass('flex-prev')){
			       $(this).addClass('icon-zuo')
			     }else if($this.hasClass('flex-next')){
			       $(this).addClass('icon-you')
			     }  
			     });
		   }else {
			
		  }
		}
		
		
		
	
     
  }); 


