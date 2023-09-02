-- Tabela Cliente
CREATE TABLE Cliente (
    id INT PRIMARY KEY,
    nome_completo VARCHAR(255),
    data_nascimento DATE,
    cpf VARCHAR(11),
    origem VARCHAR(50),
    score INT
);

-- Tabela Categoria
CREATE TABLE Categoria (
    id INT PRIMARY KEY,
    nome VARCHAR(50)
);

-- Tabela Produto
CREATE TABLE Produto (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    valor DECIMAL(10, 2),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
);

-- Tabela Vendedor
CREATE TABLE Vendedor (
    id INT PRIMARY KEY,
    nome VARCHAR(255),
    matricula VARCHAR(20)
);

-- Tabela Pedido
CREATE TABLE Pedido (
    id INT PRIMARY KEY,
    cliente_id INT,
    data_criacao DATE,
    vendedor_id INT,
    produto_id INT,
    valor_produto DECIMAL(10, 2),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id),
    FOREIGN KEY (vendedor_id) REFERENCES Vendedor(id),
    FOREIGN KEY (produto_id) REFERENCES Produto(id)
);
