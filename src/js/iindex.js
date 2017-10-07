require(['config'],function(){
    require(['jquery','common','xCarousel','allNeed'],function($){

        
        
        //轮播图插件
        $('.banner').xCarousel({
            imgs:['../img/carousel1.jpg','../img/carousel2.jpg','../img/carousel3.jpg','../img/carousel4.jpg','../img/carousel5.jpg','../img/carousel6.jpg'],
            index:1,
            type:'fade',
            width:1423,
            height:400
        });
        



        $('#toTop').click(function (){ $('body').animate({ scrollTop: 0 }, 2000) });

        $(window).scroll(function(){
    
            if($(window)[0].scrollY<560){
                $('.toTopLeft').hide();
                $('.toTopRig').hide();
            }else{
                $('.toTopLeft').show();
                $('.toTopRig').show();
            };
        });


    });
});