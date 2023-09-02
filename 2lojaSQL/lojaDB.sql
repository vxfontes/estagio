-- Tabela Cliente
CREATE TABLE Cliente (
    id SERIAL PRIMARY KEY,
    nomeCompleto VARCHAR(255),
    dataCascimento DATE,
    cpf VARCHAR(11),
    origem VARCHAR(50),
    score INT
);

-- Tabela Categoria
CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50)
);

-- Tabela CategoriaProduto
CREATE TABLE CategoriaProduto (
    categoriaID INT,
    produtoID INT,
    PRIMARY KEY (categoriaID, produtoID),
    FOREIGN KEY (categoriaID) REFERENCES Categoria(id),
    FOREIGN KEY (produtoID) REFERENCES Produto(id)
);

-- Tabela Produto
CREATE TABLE Produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    valor DECIMAL(10, 2),
    categoriaID INT,
    FOREIGN KEY (categoriaID) REFERENCES Categoria(id)
);

-- Tabela Vendedor
CREATE TABLE Vendedor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    matricula VARCHAR(20)
);

-- Tabela Pedido
CREATE TABLE Pedido (
    id SERIAL PRIMARY KEY,
    clienteID INT,
    dataCriacao DATE,
    vendedorID INT,
    produtoID INT,
    valorProduto DECIMAL(10, 2),
    FOREIGN KEY (clienteID) REFERENCES Cliente(id),
    FOREIGN KEY (vendedorID) REFERENCES Vendedor(id),
);

-- Tabela ProdutoPedido
CREATE TABLE ProdutoPedido (
    pedidoID INT,
    produtoID INT,
    PRIMARY KEY (pedidoID, produtoID),
    FOREIGN KEY (pedidoID) REFERENCES Pedido(id),
    FOREIGN KEY (produtoID) REFERENCES Produto(id)
);
