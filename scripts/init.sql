USE test;

-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(55) NOT NULL,
    description TEXT,
    url_image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2) NOT NULL DEFAULT 0,
    sales_count INT NOT NULL DEFAULT 0,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stock INT NOT NULL DEFAULT 0
);


CREATE TABLE IF NOT EXISTS Sellers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fone_number VARCHAR(20) DEFAULT NULL,
    cpf_cnpj VARCHAR(20) DEFAULT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fone_number VARCHAR(20) DEFAULT NULL,
    cpf_cnpj VARCHAR(20) DEFAULT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Criação da tabela de avaliações dos produtos
CREATE TABLE IF NOT EXISTS AvaliationsProduct (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    comment TEXT,
    product_id INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);
