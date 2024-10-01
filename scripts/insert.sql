USE test;

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Combo Gamer", "", "/images/product-4.png", 149.99, 0.00, 40, 5);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Msi geFORE Gtx 1650", "", "/images/product-5.png", 1300.00, 0.00, 1000, 2000);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("controle PS5", "", "/images/product-6.png", 400.00, 0.00, 333, 284);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Cadeira gamer", "", "/images/product-7.png", 1500.00, 0.00, 103, 430);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Iphone 14 Pro Max 512gb", "", "/images/product-8.png", 7750.00, 0.00, 103, 230);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Samsung Galaxy S23 Ultra 1TB", "", "/images/product-9.png", 6300.00, 0.00, 2210, 130);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Asus Rog Phone 3 Gamer", "", "/images/product-10.png", 4000.00, 0.00, 10, 30);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Xiaome 13 Ultra 1TB", "", "/images/product-11.png", 3500.00, 0.00, 410, 330);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Xbox series x", "", "/images/product-12.png", 3400.00, 0.00, 2210, 130);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Volante GT480 Ferrari", "", "/images/product-13.png", 1300.00, 0.00, 2410, 530);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Playstation 5", "", "/images/product-14.png", 4400.00, 0.00, 210, 430);

INSERT INTO Products (title, description, url_image, price, discount, sales_count, stock)
VALUES ("Pc Gamer Ryzen 9 7950x3d 4090 ti super", "", "/images/product-15.png", 8200.00, 0.00, 3, 1);

INSERT INTO Sellers (name, email, fone_number, cpf_cnpj) 
VALUES 
('João Silva', 'joao.silva@example.com', '11987654321', '123.456.789-00'),
('Maria Oliveira', 'maria.oliveira@example.com', '21976543210', '987.654.321-00'),
('Carlos Souza', 'carlos.souza@example.com', '31987651234', '123.456.789-11'),
('Fernanda Costa', 'fernanda.costa@example.com', '41987654321', '987.654.321-22'),
('Lucas Pereira', 'lucas.pereira@example.com', '51987654321', '111.222.333-44');

INSERT INTO Users (name, email, fone_number, cpf_cnpj) 
VALUES 
('Ana Silva', 'ana.silva@example.com', '11981234567', '123.456.789-55'),
('Rafael Almeida', 'rafael.almeida@example.com', '21987654322', '987.654.321-33'),
('Paula Ramos', 'paula.ramos@example.com', '31981234568', '123.456.789-66'),
('Roberto Fernandes', 'roberto.fernandes@example.com', '41987651234', '987.654.321-44'),
('Carolina Lima', 'carolina.lima@example.com', '51987654322', '111.222.333-77');
