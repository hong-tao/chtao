require(['config'],function(){
    require(['jquery','common','lxzoom'],function(){


        //加载头部和底部
        $('header').load('../html/head.html header>div',function(){
        });
        $('footer').load('../html/foot.html footer',function(){
        });
        $('.to').load('../html/foot.html .toTopRig',function(){




            // 读取cookie
            // 得到添加到购物车所有商品信息carlist
            var cookies = document.cookie;


            var carlist = [];
            if(cookies.length>0){
                cookies = cookies.split('; ');
                cookies.forEach(function(cookie){
                    var temp = cookie.split('=');

                    if(temp[0] === 'carlist'){
                        // 把json字符串转成数组
                        carlist = JSON.parse(temp[1]);
                    }
                });
            }



            //写在外边获取不到元素
            $('#toTop').click(function (){ $('body').animate({ scrollTop: 0 }, 2000) });

            //添加商品的动画
         
            var res = $('#toTop').prev().prev().append('<span class="anim"></span>');

            var res =1;
            $('#toCar').click(function(){
                res++;
                $('.anim').css({'display':'block'}).html(res);



             var qqty = $('#numb input').val();
             console.log(qqty);

     
             //利用ajax把cookie写入数据库
            $.ajax({
                url:'../api/cookie.php',
                type:'GET',
                data:{id:id,qty:qqty},
                success:function(res){
                    console.log(res);
     
                }
            });





            });
        });



        //页面传参和写入
        var params = window.location.search;

        var id = params.slice(4);
        
        $.ajax({
            url:'../api/goods.php',
            type:'GET',
            data:{id:id},
            success:function(res){
                var item = JSON.parse(res)[0];


                $('.idName').html(item.name);
                $('.price').html(item.price);
                $('.sale_price').html(item.sale_price);

                $('.idImg').find('img').attr({'src':'../'+item.imgurl});

                $.each($('.smaPic'),function(){
                    $(this).html('<img src="../imgs/a'+randomNumber(1,24)+'.jpg"/>')
                });


                cook(item);








            }
        });


        //小图的切换
        //事件委托
        $('.slide').on('click','img',function(){
            //图片是传过来的,所以只能由他的父级去获取
            $('.show').children('img').attr('src',this.src);
        });

        //放大镜效果
        // new LxZoom({width:400,position:'right'}).init();
        


        //数量的加和减 
        var qty;
        $('#add').click(function(){
        
            qty = $('#numb input').val();
            qty =Number(qty)+1;
            $('#numb input').val(qty);
        });

        $('#less').click(function(){
           
            if(Number(qty)===1){
                return false;
            }
            qty=Number(qty)-1;
            $('#numb input').val(qty);

        });



       


        $('#toTop').click(function (){ $('body').animate({ scrollTop: 0 }, 2000) });

        $(window).scroll(function(){
    
            if($(window)[0].scrollY<260){
                $('.toTopRig').hide();
            }else{
                $('.toTopRig').show();
            };
        });



        function cook(item){
            console.log(item);
            //cookie的写入和读取
            var carlist = [];
            var cookies = document.cookie;
            if(cookies.length>0){
                cookies = cookies.split('; ');
                cookies.forEach(function(cookie){
                    var temp = cookie.split('=');
                    if(temp[0] === 'carlist'){
                        carlist = JSON.parse(temp[1]);
                    }
                })
            }
             $('#toCar').click(function(){
                var has = false;
                for(var i=0;i<carlist.length;i++){
                    // 已经存在
                    if(carlist[i].id === id){
                        carlist[i].qty++;
                        has=true;
                        break;
                    }
                }
                // 不存在
                if(!has){
                    var goods = {
                        id:id,
                        name:item.name,
                        price:item.price,
                        imgurl:item.imgurl,
                        sale_price:item.sale_price,
                        add_time:item.add_time,
                        qty:1
                    }


                carlist.push(goods);
                }
                // 写入cookie
                var date = new Date();
                date.setDate(date.getDate()+15);
                document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() +';path=/';
            });


        }






          





    });
})