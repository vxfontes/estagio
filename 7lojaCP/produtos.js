const categorias = ["Decoração", "Utilidades Domésticas", "Brinquedos", "Papelaria", "Cuidados Pessoais", "Eletrônicos", "Acessórios", "Roupas", "Calçados", "Alimentos", "Bebidas", "Jardinagem", "Ferramentas", "Artesanato", "Pet Shop", "Esportes", "Beleza", "Saúde", "Livros", "Festas e Eventos"]

const select = document.getElementById('categoria');
const selectFiltro = document.getElementById('filtroCategoria');
const cadastro = document.getElementById('cadastro');
const filtro = document.getElementById('btnFiltro');
const formProduto = document.getElementById('formProduto');
const mensagens = document.getElementById('mensagens');
const mensagemErroSucess = document.createElement('h5');
const produtosContainer = document.getElementById('produtosContainer');

const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function renderizarCategorias(theID) {
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        theID.appendChild(option);
    });
}

function salvandoProduto(event) {
    const { nome, valor, categoria } = event.target;

    if (validarCampos(nome.value, valor.value, categoria.value)) {
        mensagemErroSucess.textContent = `Produto ${nome.value} cadastrado com sucesso!`;
        mensagemErroSucess.style.color = '#634d91';
        mensagens.appendChild(mensagemErroSucess);

        const produto = {
            nome: nome.value,
            valor: valor.value,
            categoria: categoria.value,
        }
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        formProduto.reset();
    } else {
        mensagemErroSucess.textContent = 'Por favor, preencha todos os campos antes de enviar.';
        mensagemErroSucess.style.color = 'red';
        mensagens.appendChild(mensagemErroSucess);
    }
}

function validarCampos(nome, valor, categoria) {
    if (nome.trim() === '' || valor === '' || categoria === '') {
        return false;
    }
    return true;
}

function exibindoProduto(produto) {
    let valorPrimeiroDigito = parseInt(produto.valor.toString()[0]);

    let imagemSrc = "";
    if (valorPrimeiroDigito % 2 === 0) imagemSrc = "./assets/produto1.png";
    else imagemSrc = "./assets/produto2.png";

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');
    cardDiv.innerHTML = `
        <div class="card" style="width: 100%; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${imagemSrc}" class="card-img rounded-circle m-4" alt="foto do produto">
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-7 mt-1">
                    <div class="card-body">
                        <div>
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">Valor: R$${produto.valor}</p>
                        </div>
                        <hr>
                        <div class="align-self-end">
                            <div style="display: flex">
                                <p class="chip">${produto.categoria}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    produtosContainer.appendChild(cardDiv);
}

function renderizarProdutos(filtroCategoria) {
    produtosContainer.innerHTML = '';

    produtos.forEach(produto => {
        if (filtroCategoria === 'all') {
            exibindoProduto(produto)
        } else if (filtroCategoria === '' || produto.categoria === filtroCategoria) {
            exibindoProduto(produto)
        }
    });
}

cadastro.addEventListener('click', (() => renderizarCategorias()));
formProduto.addEventListener('submit', ((event) => {
    event.preventDefault();
    salvandoProduto(event);
}));
document.addEventListener('DOMContentLoaded', () => {
    renderizarCategorias(select);
    renderizarCategorias(selectFiltro);
    renderizarProdutos(`all`);
});
selectFiltro.addEventListener('change', () => {
    const filtroCategoria = selectFiltro.value;
    renderizarProdutos(filtroCategoria);
});