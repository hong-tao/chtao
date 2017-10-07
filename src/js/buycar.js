require(['config'],function(){
    require(['jquery','common'],function(){

        $('header').load('../html/head.html .topNav',function(){

        });
        $('footer').load('../html/foot.html .lastFoot',function(){


        });


        // $.ajax({
        //     url:'../api/write.php',
        //     type:'GET',
        //     success:function(res){
        //         // console.log(JSON.parse(res));
        //     }
        // });


        //写入cookie
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

 
        var write = $.map(carlist,function(item,idx){

            return `<li class="detailCar">
                        <div><input type="checkbox" /></div>
                        <div><img src="../${item.imgurl}" alt="" /></div>
                        <div>
                            <p class="carName">${item.name}</p>
                            <p>不支持7天无理由退货</p>
                            <span>特价</span>
                        </div>
                        <div>
                            <p class="sale_price">${item.sale_price}</p>
                            <p class="price">${item.price}</p>
                        </div>
                        <div>
                            <p class="numb">
                                <span id="less">-</span>
                                <input type="text" value="1" />
                                <span id="add">+</span>
                            </p>
                        </div>
                        <div>
                            <p class="sum">${item.price}*${item.qty}</p>
                            <p class="tax">预估税费: ￥${item.price}*0.17</p>
                        </div>
                        <div>
                            <p class="remove">删除</p>
                            <p>移入我的收藏</p>
                        </div>
                    </li>`
        }).join('');

        console.log(write);
        $('.list').html(write);









    });
});