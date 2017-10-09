require(['config'],function(){
    require(['jquery','common','xCarousel','allNeed'],function($){




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
            imgs:['../img/moCarousel1.jpg','../img/moCarousel2.jpg','../img/moCarousel3.jpg'],
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



    //添加入购物车

    $('main').on('click','button',function(){
        console.log(this);

    });



    });
})