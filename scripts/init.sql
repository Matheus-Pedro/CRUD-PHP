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


-- Criação da tabela de avaliações dos produtos
CREATE TABLE IF NOT EXISTS AvaliationsProduct (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    comment TEXT,
    product_id INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


INSERT INTO Products (title, description, url_image, price)
VALUES ('Fitness Tracker', 'A high-quality fitness tracker with multiple sensors.', 'https://example.com/fitness-tracker.jpg', 99.99);