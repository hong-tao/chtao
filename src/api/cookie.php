<?php
    include 'connect.php';

     $id = isset($_GET['id']) ? $_GET['id'] : '';
     $qty = isset($_GET['qty']) ? $_GET['qty'] : '';

     // 编写查询sql语句
     $sql = "insert into cookie (id,qty) values('$id','$qty')";




     // 获取查询结果
        $result = $conn->query($sql);

            if ($result) {
                echo "ok";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
       

        // 释放查询内存(销毁)
        //$result->free();

        //关闭连接
        $conn->close();



?>