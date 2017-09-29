require(['config'],function(){
    require(['jquery','common'],function(){


        //加载头部和底部
        $('header').load('../html/head.html header',function(){

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

        var params = window.location.search;
        console.log(params);
        var id = params.slice(4);


        $.ajax({
            url:'../api/goods.php',
            type:'GET',
            data:{id:id},
            success:function(res){
                var item = JSON.parse(res);
            



            }
        })






    });
})