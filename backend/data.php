<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    
    echo "hello";

    $connection = mysqli_connect("localhost", "root", "", "webologyTaskPHP"); 

    if(mysqli_connect_error())
    {
        echo mysqli_connect_error();
        die();
    }
    


?>
