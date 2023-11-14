CREATE DATABASE dindin;

create table usuarios (
		id serial primary key,
  	nome text not null,
  	email text not null unique,
  	senha text not null
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao text
);

CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao text,
    valor NUMERIC(10, 2) not null,
    data DATE,
    categoria_id INT REFERENCES categorias(id),
    usuario_id INT REFERENCES usuarios(id),
    tipo text not null
);

INSERT INTO categorias (descricao) VALUES
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas');s