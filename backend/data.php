<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    // header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    // header("Access-Control-Allow-Headers: Content-Type");


    
    $connection = mysqli_connect("localhost", "root", "", "webologyTask"); 
    
    if(mysqli_connect_error())
    {
        echo mysqli_connect_error();
        die();
    }
        

    //chenk if the post was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        //variables
        $name = mysqli_real_escape_string($connection, $_POST["name"]);
        $password = mysqli_real_escape_string($connection, $_POST["password"]);


        //select username and password from database
        $query = "SELECT * FROM `users` WHERE `username` = '$name' AND `password` = '$password'";
        // $query = "SELECT * FROM `users`";
        $result = mysqli_query($connection, $query);

        // Check if there is a match in the database
        if (mysqli_num_rows($result) > 0) // User exists, you can set a session or return a success response
        {
            echo "User exists!";
        } 
        else // User does not exist, you can return an error message
        {
            echo "User does not exist!";
        }
    }
    else
    {
        echo "some error occured";
    }




?>
