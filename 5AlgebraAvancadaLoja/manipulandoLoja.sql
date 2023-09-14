--Selecionar o código do pedido, valor total dos pedidos que tem dois ou mais
--produtos, ordenado pelo código do pedido de forma crescente.
select 
	p.pedidoid, 
	sum(p.valortotal) as valorTotal, 
	count(p.produtoid) as contagemProdutos
from produtopedido p 
group by p.pedidoid 
having count(p.produtoid) > 1
order by p.pedidoid asc 


--Selecionar o código dos vendedores e quantidade de pedidos realizados, mas
--apenas aqueles que tiveram mais de uma venda. Ordenar pela quantidade de
--pedidos de forma decrescente e código do vendedor
select 
	p.vendedorid, 
	sum(p.vendedorid) as pedidos 
from pedido p 
group by p.vendedorid 
having sum(p.vendedorid)>1
order by pedidos desc 


-- Selecionar o código dos pedidos, seu valor total, dos pedidos que o valor total
-- ultrapasse R$ 8000,00 e que tenha mais de três produto, ordenando pelo valor
-- total do maior pedido para o menor
select 
	p.pedidoid, 
	sum(p.valortotal) as valorTotal, 
	count(p.produtoid) as contagemProdutos
from produtopedido p 
group by p.pedidoid 
having sum(p.valortotal) > 8000 and count(p.produtoid) > 3
order by valortotal desc


--Selecionar o nome, cpf, score e medalha, a medalha é baseada no valor do
--score, assim para medalha ouro o score deve ser acima de 80, prata entre 60 à
--79 e bronze 0 a 59. Ordenar os clientes por medalha de bronze para ouro e nome
select c.nomecompleto, c.cpf, c.score,
case
	when c.score > 80 then 'ouro'
	when c.score between 60 and 79 then 'prata'
	else 'bronze'
end as medalha
from cliente c 
order by medalha asc, c.nomeCompleto;


-- FALTA A 5
-- FALTA A 5
-- FALTA A 5
-- FALTA A 5
-- FALTA A 5
-- FALTA A 5
-- FALTA A 5
-- FALTA A 5
-- FALTA A 5


--Selecionar o código do pedido, data dele, se teve vendedor (sim ou não) e
--nome de seus produtos. Ordenar por código do pedido
select 
	p.id, p.datacriacao,
	case 
		when p.vendedorid > 0 then 'sim'
		else 'não'
	end as teveVendedor,
	p3.nome 
from pedido p 
inner join produtopedido p2 on p.id = p2.pedidoid 
inner join produto p3 on p2.produtoid = p3.id 
order by p.id 


--Selecionar o código dos pedidos, quantidade de produtos, dos pedidos
--realizados em 2020
select
	p.pedidoid, count(p.produtoid), p2.datacriacao 
from produtopedido p 
inner join pedido p2 on p.pedidoid = p2.id
group by p.pedidoid, p2.datacriacao 
having extract(year from p2.datacriacao) = 2020
order by p.pedidoid asc


-- Selecionar o nome, score e mês de aniversário dos clientes com score acima de 60
select 
	c.nomecompleto, c.score, extract(month from c.datanascimento) as mesAniversario
from cliente c 
group by c.nomecompleto, c.score, c.datanascimento 
having c.score > 60

-- falta a ultima
-- falta a ultima
-- falta a ultima
-- falta a ultima
-- falta a ultima
-- falta a ultima
-- falta a ultima
-- falta a ultima
-- falta a ultima
-- falta a ultima