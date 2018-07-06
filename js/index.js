$(function(){
    
    $('.banner-list>li').eq(0).css('display','block');
    $('.selector>li').eq(0).css('backgroundColor','red');
    $('.banner-title>li').eq(0).stop().show();
 //    alert($('.banner').children().length);
    autoPlay();
    navEvent();
    whenLoad();
});


// 图片轮播
var i = 1;
var temp = 0;
function bannerEvent(event,isSelector){
    var bannerList =  $('.banner-list>li');
    if(event=='prev'){
        if(!isSelector){
            if(i == 1){
                i = bannerList.length - 1;
            }else if(i == 0){
                i = bannerList.length - 2;
            }else{
                i-=2;
            }
        }
        bannerList.eq(temp).stop().animate({'left':'100%'},500);
        bannerList.eq(i).css('left','-100%');
    }else{
        bannerList.eq(temp).stop().animate({'left':'-100%'},500);
        bannerList.eq(i).css('left','100%');
    }
    bannerList.eq(i).css('display','block');
    bannerList.eq(i).stop().animate({'left':'0%'},500);
    $('.selector>li').eq(i).css('backgroundColor','#CF0410');
    $('.selector>li').eq(i).siblings().css('backgroundColor','#BCBCBC');
    $('.banner-title>li').stop().hide();
    $('.banner-title>li').eq(i).stop().show();
    temp=i;
    if(i==(bannerList.length-1)){
        i=0;
    }else{
        i++;
    }
}
function autoPlay(){
    var timer = setInterval('bannerEvent()',4000);
    $('.banner').hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval('bannerEvent()',4000);
    });
    $('.selector>li').on('click',function(){
        var index = $(this).index();
        if(index<temp){
            i = index;
            bannerEvent('prev',true);
        }else if(index>temp){
            i = index;
            bannerEvent('next');
        }
    });
    $('.next').on('click',function(){
        bannerEvent('next');
    });
    $('.prev').on('click',function(){
        bannerEvent('prev');
    });
}





// 监听窗口改变大小
$(window).resize(function() {
    whenLoad();
});

// 加载事件
function whenLoad(){
    var imgHeight = $('.banner-list img').height();
    $('.banner-list').css('height',imgHeight);
    $('.banner').css('height',imgHeight);
    var windowWidth = $(window).width();
    $('body').css('width',windowWidth);
    if(windowWidth<=768){
        $('.panel').append($('.menu'));
    }else{
        $('.nav').append($('.menu'));        
    }
}



function navEvent(){
var menu = $('.menu>ul>li');
menu.hover(function(){
    $(this).children('ul').stop().slideDown(200);
},function(){
    $(this).children('ul').stop().slideUp(200);
});
}