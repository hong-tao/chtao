require(['config'],function(){
    require(['jquery','common'],function(){

        //请求头部和底部
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



        //写入cookie带入的商品
        var write = $.map(carlist,function(item,idx){
                    var sum = Number(`${item.qty}`)* Number(`${item.price}`);
                    var tax = (sum*0.17).toFixed(2);

            return `<li class="detailCar">
                        <div>
                            <input type="checkbox" />
                            <p class= 'liId' style="text-indent:-1000px">${item.id}</p>
                        </div>
                        <div>
                            <a href="../html/goods.html?id=${item.id}"><img src="../${item.imgurl}" style="width:80px;height:80px" alt="" /></a>
                        </div>
                        <div>
                            <p class="carName">
                            <a href="../html/goods.html?id=${item.id}">${item.name}</a>
                            </p>
                            <p>不支持7天无理由退货</p>
                            <span>特价</span>
                        </div>
                        <div>
                            <p class="sale_price">${item.sale_price}</p>
                            <p class="price">${item.price}</p>
                        </div>
                        <div>
                            <p class="numb">
                                <span class="less">-</span>
                                <input type="text" value="${item.qty}" />
                                <span class="add">+</span>
                            </p>
                        </div>
                        <div>
                            <p class="sum">${sum}</p>
                            <p>预估税费:￥<span class="tax">${tax}</span></p>

                        </div>
                        <div>
                            <p class="remove">删除</p>
                            <p>移入我的收藏</p>
                        </div>
                    </li>`
        }).join('');

        $('.list').html(write);






        //事件委托实现购物车的加减
        var qty;
        $('.list').on('click','.add',function(item,idx){

            qty = $(this).prev().val();
            qty = Number(qty)+1;
            $(this).prev().val(qty);


            //更改商品总价
            var price =  $(this).parents('.detailCar').find('.price').text();
            sums = qty * Number(price);
            $(this).parents('.detailCar').find('.sum').text(sums);

            //更改税率
            taxs = (sums * 0.17).toFixed(2);
            $(this).parents('.detailCar').find('.tax').text(taxs);

            $('.alreadyqty').text(carlist.length);

            other();

        });


        $('.list').on('click','.less',function(item,idx){


            qty = $(this).next().val();
             if(Number(qty)===1){
                return false;
            }
            qty=Number(qty)-1;
            $(this).next().val(qty);


            //更改商品总价
            var price =  $(this).parents('.detailCar').find('.price').text();
            sums=qty*Number(price);
            $(this).parents('.detailCar').find('.sum').text(sums);

            //更改税率
            taxs = (sums * 0.17).toFixed(2);
            $(this).parents('.detailCar').find('.tax').text(taxs);

            $('.alreadyqty').text(carlist.length);

            other();
  
        });

        var arr = [];
        //小小封装,求商品的价格总和,有bug
        $('.sum').each(function(idx,item){
            var res = Number($(item).text());
            arr.push(res);

        });
        var allSum = arr.reduce((prev,curr)=>{

            return prev+curr;
         });



        function other(){
             //求出全部商品总价
            $('.sum').each(function(idx,item){
                var res = Number($(item).text());
                allSum += res;
            });

            $('.already').html(carlist.length);
            
            $('.payReds').text(allSum);
        }







         // 写入总价列表,底部统计栏
        var allsums = 
        `<ul>
            <li>
                <input type="checkbox" id="all" />
                <label for="all"></label>
                <span class=delSel>删除选中商品</span>
            </li>
            <li>
                <p>
                    <span>己选商品<a href="#" class="payRed already">${carlist.length}</a>件</span>
                    <span>总价(不含运费):<span class="payRed payReds">${allSum}</span></span>
                </p>
                <p>
                    <span>活动优惠:<span>-￥34.00</span></span>
                    <span>商品应付总计:<span>￥1241.00</span></span>
                    <span>商品税费(不含运费税):<span>￥147.68</span></span>
                </p>
            </li>
            <li>
                <span>去结算</span>
            </li>
        </ul>`;
        $('.pay').html(allsums);



        //全选按钮
        $('#selectAll').click(function(){
            //跟随全选框的状态,this.checked,没有选中即为false
            $(':checkbox').prop('checked',this.checked);
        });
        $('#all').click(function(){
            //跟随全选框的状态,this.checked,没有选中即为false
            $(':checkbox').prop('checked',this.checked);
        });



        //删除单件商品
        $('.list').on('click','.remove',function(){

            //移除DOM节点
            $(this).parents('.detailCar').remove();
            //删除cookie
            for(var i=0;i<carlist.length;i++){
                var guid = Number($(this).parents('.detailCar').find('.liId').text());
                if(Number(carlist[i].id) === guid){
                    carlist.splice(i,1);
                    break;
                }
            }

            var date = new Date();
            date.setDate(date.getDate()+7);
            document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() + ';path=/';

        }).on('click','.add',function(){
            //添加input改变后的cookie
             for(var i=0;i<carlist.length;i++){

                var guid = Number($(this).parents('.detailCar').find('.liId').text());
                var value = Number($(this).parents('.detailCar').find(':text').val());

                if(Number(carlist[i].id) === guid){
                    carlist[i].qty = value;
                    break;
                }
            }

            var date = new Date();
            date.setDate(date.getDate()+7);
            document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() + ';path=/';

        }).on('click','.less',function(){
            //添加input改变后的cookie
             for(var i=0;i<carlist.length;i++){

                var guid = Number($(this).parents('.detailCar').find('.liId').text());
                var value = Number($(this).parents('.detailCar').find(':text').val());

                if(Number(carlist[i].id) === guid){
                    carlist[i].qty = value;
                    break;
                }
            }

            var date = new Date();
            date.setDate(date.getDate()+7);
            document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() + ';path=/';

        });




        //删除选中的商品
        $('.delSel').click(function(){
         var $res = $('.list').find(':checkbox').filter(':checked');

       

        $.each($res,function(idx,item){

            var del = Number($(item).parents('.detailCar').find('.liId').text());

            for(var i=0;i<carlist.length;i++){

                var id = Number(carlist[i].id);
                
                
                
                if(id === del){
                   
                    carlist.splice(i,1);

                }
            } 
        });
        var date = new Date();
        date.setDate(date.getDate()+7);
        document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() + ';path=/';


         $res.parents('.detailCar').remove();

        });











    });
});