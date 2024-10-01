<?php

require 'database.php';

// Buscar todos os vendedores
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->query('SELECT * FROM Sellers');
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($products);
    } catch (PDOException $e){
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Adicionar um novo vendedor
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['name']) || empty($data['email'])) {
        echo json_encode(['error' => 'O name e email do vendedor são informações obrigatórias']);
        exit;
    }

    $name = $data['name'];
    $email = $data['email'];

    try {
        $stmt = $conn->prepare('INSERT INTO Sellers (name, email) VALUES (:name, :email);');
        
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        $productId = $conn->lastInsertId();

        $stmt = $conn->prepare('SELECT * FROM Sellers WHERE id = :id');
        $stmt->bindParam(':id', $productId);
        $stmt->execute();

        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode($product);

    } catch(PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Editar um vendedor
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id'])) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'ID do produto é obrigatório']);
        exit;
    }

    $id = $data['id'];
    $name = isset($data['name']) ? $data['name'] : null;
    $email = isset($data['email']) ? $data['email'] : null;
    $fone_number = isset($data['fone_number']) ? $data['fone_number'] : null;
    $cpf_cnpj = isset($data['cpf_cnpj']) ? $data['cpf_cnpj'] : null;

    try {
        $stmt = $conn->prepare('UPDATE Sellers 
            SET name = COALESCE(:name, name), 
                email = COALESCE(:email, email), 
                fone_number = COALESCE(:fone_number, fone_number), 
                cpf_cnpj = COALESCE(:cpf_cnpj, cpf_cnpj)
            WHERE id = :id');

        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':fone_number', $fone_number);
        $stmt->bindParam(':cpf_cnpj', $cpf_cnpj);

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
        $stmt = $conn->prepare('DELETE FROM Sellers WHERE id = :id');
        $stmt->bindParam(':id', $productId);
        $stmt->execute();
        echo json_encode(['sucess' => true]);
    } catch(PDOException $e){
        echo json_encode(['error'=>$e->getMessage()]);
    }
}
