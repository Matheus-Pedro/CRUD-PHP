<?php
$host = "db";
$username = "root";
$password = "root";
$db = "test";
header('Content-Type: application/json');

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $username, 
    $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, 
    PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["Error" => $e->getMessage()]);    
}
?>