require(['config'],function(){
    require(['jquery','common'],function($){

        $('header').load('../iindex.html header',function(){

        });
        $('footer').load('../iindex.html footer',function(){
            
        })

        $.ajax({
            url: '../api/goodslist.php',
            type: 'GET',
            success:function(res){
                console.log(JSON.parse(res));
            }
        })

    });
})