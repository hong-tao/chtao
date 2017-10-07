<?php
    include 'connect.php';

     // 编写查询sql语句
    $sql = "select * from cookie";

    // 利用sql语句查询数据库
    // 查询结果集
    $result = $conn->query($sql);


    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);

    $res = $row->id;
    $res.forEach







    echo json_encode($row,JSON_UNESCAPED_UNICODE);


      // 编写查询sql语句
    $sql2 = "select * from goods where";


    









?>