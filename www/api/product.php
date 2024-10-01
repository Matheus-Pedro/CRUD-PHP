<?php

require 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];

    try {
        $stmt = $conn->prepare('SELECT * FROM Products WHERE id = :id;');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode($product);

    } catch(PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
