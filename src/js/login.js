require(['config','allNeed'],function(){
    require(['jquery','common'],function($){

            //强行覆盖
            $('header').load('regist.html header>div',function(){
            });
           
            $('footer').load('regist.html footer>div',function(){
            });



            $('button').click(function(){
                var username = $('#user').val();
                var check = $('#check').val();



                $.ajax({
                    url:'../api/login.php',
                    type:'GET',
                    data:{username:username,password:check},
                    success:function(res){
                        if(res === 'ok'){
                            $('.tip2').html('登录成功');
                            open('../html/buycar.html');
                        }
                        if(res === 'fail'){
                            $('.tip2').html('帐号密码不匹配');
                        }
                        $('.tip2').css({'color':"#f00"});

                    }
                });


            });


            function cookie(username,check){


                var people = [];
                var cookies = document.cookie;
                if(cookies.length>0){
                    cookies = cookies.split('; ');
                    cookies.forEach(function(cookie){
                        var temp = cookie.split('=');
                        if(temp[0] === 'people'){
                            people = JSON.parse(temp[1]);
                        }
                    })
                }

                if($('#noNeed').prop('checked')){
                    console.log(66);
                   


                    var has = false;
                    for(var i=0;i<people.length;i++){
                        // 已经存在
                        if(people[i].name === username){

                           has = true;
                           break;
                        }
                    }
                    // 不存在
                    if(!has){
                        var person = {
                            name:name,
                            password:check
                        }


                    people.push(person);
                    }
                    // 写入cookie
                    var date = new Date();
                    date.setDate(date.getDate()+15);
                    document.cookie = 'people=' + JSON.stringify(people) + ';expires=' + date.toUTCString() +';path=/';

                    }

            }
           






    
    });
});




