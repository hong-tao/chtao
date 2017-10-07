require(['config'],function(){
    require(['jquery','common','xCarousel'],function($){



    //将头部和底部加载进来
       $('header').load('../html/head.html header>div',function(){
            $('header').find('img').each(function(idx,item){
          
                var res ='../'+ $(this).attr('src');
                $(this).attr('src',res);

            });

        });


       $('footer').load('../html/foot.html footer',function(){
           $('footer').find('img').each(function(idx,item){
                
                var res ='../'+ $(this).attr('src');
                $(this).attr('src',res);
                
            });
       });

       $('.toTopRig').load('../html/foot.html .toTopRig',function(){



            //写在外边获取不到元素
            $('#toTop').click(function (){ $('body').animate({ scrollTop: 0 }, 2000) });

        });


    //ajax请求数据
        $.ajax({
            url: '../api/goodslist.php',
            type: 'GET',
            success:function(res){

                // console.log(JSON.parse(res));

                var goodslist = JSON.parse(res);
  
                var html = $.map(goodslist,function(item,idx){


                    return `<li class="disSingle">
                                <a href="../html/goods.html?id=${item.id}"><img src="../${item.imgurl}"></a>
                                <div class="titles">
                                    <span>${item.quantify}</span>
                                    <a href = "#" >${item.name}</a>
                                    <p>
                                    <span><strong>${item.sale_price}</strong></span>
                                        <span><del>${item.price}</del></span>
                                    </p>
                                    <button>立即购买</button>
                                </div>
                            </li>`
                }).join('');

                $('.paperDis').html(html);

                $('.milkDis').html(html);

                $('.healthDis').html(html);

                $('.careDis').html(html);

                $('.toyDis').html(html);

                $('.clothesDis').html(html);

                $('.bedDis').html(html);

                $('.pregnantDis').html(html);


               
            }
        });



    //轮播图插件
        $('.banner').xCarousel({
            imgs:['../img2/moCarousel1.jpg','../img2/moCarousel2.jpg','../img2/moCarousel3.jpg'],
            index:1,
            type:'fade',
            width:1423,
            height:400
        });

    //tab标签切换




    $('.tab').each(function(idx,items){
        $(items).find('li').first().addClass('tabActive');
    });


    $('.tab').on('click','li',function(){

        $(this).addClass('tabActive').siblings().removeClass('tabActive');
    });




    $(window).scroll(function(){

        if($(window)[0].scrollY<360){
            $('.toTopRig').hide();
        }else{
            $('.toTopRig').show();
        };
    });



    });
})