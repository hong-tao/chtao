require(['config'],function(){
    require(['jquery'],function(){


           var cookies = document.cookie;

            var people = [];
            if(cookies.length>0){
                cookies = cookies.split('; ');
                cookies.forEach(function(cookie){
                    var temp = cookie.split('=');

                    if(temp[0] === 'people'){
                        // 把json字符串转成数组
                        people = JSON.parse(temp[1]);
                    }
                });
            }



        //将头部和底部加载进来
           $('header').load('../html/head.html header>div',function(){
                $('header').find('img').each(function(idx,item){
                   $('.userLogin').html('1580');
                    
              
                });
            });


           $('footer').load('../html/foot.html footer>div',function(){
               $('footer').find('img').each(function(idx,item){
                    
                });
           });



        //-------------------------------------------------------------------------
        
        
           $('.toTopRig').load('../html/foot.html .toTopRig',function(){


              //写在外边获取不到元素
            $('#toTop').click(function (){ $('body').animate({ scrollTop: 0 }, 2000) });

            //添加商品的动画
         
            var res = $('#toTop').prev().prev().append('<span class="anim"></span>');

            var res =1;
            $('#toCar').click(function(){
                res++;
                $('.anim').css({'display':'block'}).html(res);

            });   
        });

    // --------------------------------------------------------------------------------


    });

});  
    



   

