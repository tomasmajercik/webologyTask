<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Content-Type: application/json; charset=UTF-8");
    session_start();

    $connection = mysqli_connect("localhost", "root", "", "webologyTask"); 

    if (mysqli_connect_error()) 
    {
        echo mysqli_connect_error();
        die();
    }

    //chenk if the post was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["token"])) 
    {
        $token = mysqli_real_escape_string($connection, $_POST["token"]);

        $query = "SELECT `username` FROM `users` WHERE `token` = '$token'";
        $result = mysqli_query($connection, $query);

        if ($row = mysqli_fetch_assoc($result)) 
        {
            echo json_encode(["success" => true, "username" => ($row["username"]) ]);
        }
        else
        {
            echo json_encode(["success" => false]);
        }
    } 
    else 
    {
        echo json_encode(["success" => false]);
    }
?>
