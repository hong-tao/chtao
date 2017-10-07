require(['config'],function(){
    require(['jquery','common'],function($){


        $('button').click(function(){
            var username = $('#phone').val();
            var password = $('#pass').val();




             $.ajax({
                url:'../api/reg.php',
                type:'GET',
                data:{username:username,password:password},
                success:function(res){
                    // var data = JSON.parse(res);
                    // console.log(data);
                    if(res==='ok'){
                        $('.tip').text('你的帐号注册成功!');
                    }
                    if(res==='fail'){
                        $('.tip').text('你的用户名太受欢迎,需要重换一个!');
                        $('.tip').css({'color':'#f00'})
                    }

                }
            });

        });

        
       





    });
});