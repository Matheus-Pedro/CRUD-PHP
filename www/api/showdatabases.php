<?php

require 'database.php';

// Buscar todos os produtos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->query('SHOW DATABASES;');
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($products);
    } catch (PDOException $e){
        echo json_encode(['error' => $e->getMessage()]);
    }
}