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