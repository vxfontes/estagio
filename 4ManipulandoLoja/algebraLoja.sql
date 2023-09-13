-- Selecionar a quantidade de clientes cadastrados, data de nascimento do cliente
-- mais novo e mais velho
select 
	count(*) as quantidadeClientes,
	max(datanascimento) as maisVelho,
	min(datanascimento) as maisNovo
from cliente c 


-- Selecionar o código do produto, menor valor, maior valor, média dos valores e
-- valor total de cada produto vendido. Ordenar do menor para o maior código de produto
select 
	p.id as codigo, 
	min(p.valor) as menorValor,
	max(p.valor) as maiorValor,
	avg(p.valor) as mediaValor,
	sum(pp.valortotal) as valorTotal
from produto p 
inner join produtopedido pp on p.id = pp.pedidoid 
group by p.id 


--Selecionar o código dos pedidos e o total de cada ordenando do pedido mais
--recente para o mais antigo
select 
	p.pedidoid, sum(valortotal) as total, pp.datacriacao
from produtopedido p 
inner join pedido pp on pp.id = p.pedidoID
group by pedidoid, pp.datacriacao 
order by pp.datacriacao desc


--Selecionar o código dos clientes e quantidade de pedidos, ordenando pela
--quantidade de pedidos da maior para menor
select  p.clienteid, count(*) as quantidade from pedido p 
group by p.clienteid 
order by quantidade desc