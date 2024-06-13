<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
session_start();

$connection = mysqli_connect("localhost", "root", "", "webologyTask");

if (mysqli_connect_error()) {
    echo json_encode(["success" => false, "message" => mysqli_connect_error()]);
    die();
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["file"])) {
    $username = mysqli_real_escape_string($connection, $_POST["username"]);
    $file = $_FILES["file"];
    $fileName = basename($file["name"]);
    $filePath = "storage/" . $fileName;

    // Check if the file has been uploaded correctly
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(["success" => false, "message" => "File upload error: " . $file['error']]);
        exit;
    }

    if (!is_dir("storage")) {
        mkdir("storage");
    }

    // Check if the file path is writable
    if (!is_writable("storage")) {
        echo json_encode(["success" => false, "message" => "Storage directory is not writable"]);
        exit;
    }

    if (move_uploaded_file($file["tmp_name"], $filePath)) 
    {
        $query = "INSERT INTO `user_files` (username, file_name, file_path) VALUES ('$username', '$fileName', '$filePath')";
        if (mysqli_query($connection, $query)) {
            echo json_encode(["success" => true, "message" => "File uploaded successfully!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to save file information to the database"]);
        }
    } else {
        // Additional debugging information
        $tmpFile = $file["tmp_name"];
        echo json_encode(["success" => false, "message" => "Failed to move uploaded file", "tmpFile" => $tmpFile, "filePath" => $filePath, "fileError" => $file['error']]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
?>
