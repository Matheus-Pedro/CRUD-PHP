<?php

require 'database.php';

// Buscar todos os produtos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->query('SELECT * FROM Products');
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($products);
    } catch (PDOException $e){
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Adicionar um novo produto
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['title']) || empty($data['url_image']) || empty($data['price'])) {
        echo json_encode(['error' => 'O título, url da imagem e preço do produto são informações obrigatórias']);
        exit;
    }

    $title = $data['title'];
    $description = $data['description'];
    $url_image = $data['url_image'];
    $price = $data['price'];

    try {
        $stmt = $conn->prepare('INSERT INTO Products (title, description, url_image, price) VALUES (:title, :description, :url_image, :price);');
        
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':url_image', $url_image);
        $stmt->bindParam(':price', $price);

        $stmt->execute();
        
        $productId = $conn->lastInsertId();

        $stmt = $conn->prepare('SELECT * FROM Products WHERE id = :id');
        $stmt->bindParam(':id', $productId);
        $stmt->execute();

        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode($product);

    } catch(PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Editar um produto
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id'])) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'ID do produto é obrigatório']);
        exit;
    }

    $id = $data['id'];
    $title = isset($data['title']) ? $data['title'] : null;
    $description = isset($data['description']) ? $data['description'] : null;
    $url_image = isset($data['url_image']) ? $data['url_image'] : null;
    $price = isset($data['price']) ? $data['price'] : null;
    $discount = isset($data['discount']) ? $data['discount'] : null;
    $stock = isset($data['stock']) ? $data['stock'] : null;

    try {
        $stmt = $conn->prepare('UPDATE Products 
            SET title = COALESCE(:title, title), 
                description = COALESCE(:description, description), 
                url_image = COALESCE(:url_image, url_image), 
                price = COALESCE(:price, price), 
                discount = COALESCE(:discount, discount), 
                stock = COALESCE(:stock, stock)
            WHERE id = :id');

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':url_image', $url_image);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':discount', $discount);
        $stmt->bindParam(':stock', $stock);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            header('Content-Type: application/json');
            echo json_encode(['message' => 'Produto atualizado com sucesso']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['message' => 'Nenhuma alteração feita no produto ou produto não encontrado']);
        }
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Deletar uma produto
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id'])) {
        echo json_encode(['error' => 'O ID do produto é obrigatório']);
        exit;
    }

    $productId = $data['id'];

    try {
        $stmt = $conn->prepare('DELETE FROM Products WHERE id = :id');
        $stmt->bindParam(':id', $productId);
        $stmt->execute();
        echo json_encode(['sucess' => true]);
    } catch(PDOException $e){
        echo json_encode(['error'=>$e->getMessage()]);
    }
}