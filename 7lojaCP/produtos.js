const categorias = ["Decoração", "Utilidades", "Brinquedos", "Papelaria", "Cuidados Pessoais", "Eletrônicos", "Acessórios", "Roupas", "Calçados", "Alimentos", "Bebidas", "Jardinagem", "Ferramentas", "Artesanato", "Pet Shop", "Esportes", "Beleza", "Saúde", "Livros", "Festas e Eventos"]

const select = document.getElementById('categoria');
const adicionando = document.getElementById('adicionando');
const selectFiltro = document.getElementById('filtroCategoria');
const cadastro = document.getElementById('cadastro');
const formProduto = document.getElementById('formProduto');
const mensagens = document.getElementById('mensagens');
const mensagemErroSucess = document.createElement('h5');
const produtosContainer = document.getElementById('produtosContainer');

const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
const categoriasEscolhidas = []

function renderizarCategorias(theID) {
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        theID.appendChild(option);
    });
}

function salvandoProduto(event) {
    const { nome, valor } = event.target;

    if (validarCampos(nome.value, valor.value)) {
        mensagemErroSucess.textContent = `Produto ${nome.value} cadastrado com sucesso!`;
        mensagemErroSucess.style.color = '#634d91';
        mensagens.appendChild(mensagemErroSucess);

        const produto = {
            nome: nome.value,
            valor: valor.value,
            categoria: categoriasEscolhidas,
        }
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        formProduto.reset();
        categoriasEscolhidas.slice(0, 0)
    } else {
        mensagemErroSucess.textContent = 'Por favor, preencha todos os campos e adicione categorias antes de enviar.';
        mensagemErroSucess.style.color = 'red';
        mensagens.appendChild(mensagemErroSucess);
    }
}

function validarCampos(nome, valor) {
    if (nome.trim() === '' || valor === '' || categoriasEscolhidas.length === 0) return false;
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
                <div class="col-md-4"><img src="${imagemSrc}" class="card-img rounded-circle m-4" alt="foto do produto"></div>
                <div class="col-md-1"></div>
                <div class="col-md-7 mt-1">
                    <div class="card-body">
                        <div>
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">Valor: R$${produto.valor}</p>
                        </div>
                        <hr>
                        <div class="align-self-end">
                            <div style="display: block">
                                ${produto.categoria.map(cat => `<div style="display: flex; padding-bottom:3px"><p class="chip">${cat}</p></div>`).join('')}
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
        if (filtroCategoria === 'all' || produto.categoria.includes(filtroCategoria)) {
            exibindoProduto(produto);
        }
    });
}

function adicionarCategorias() {
    let categoriaSelect = document.getElementById("categoria").value;
    categoriasEscolhidas.push(categoriaSelect)
    mensagemErroSucess.textContent = `Categoria ${categoriaSelect} adicionada com sucesso!`;
    mensagemErroSucess.style.color = '#634d91';
    mensagens.appendChild(mensagemErroSucess);
}

cadastro.addEventListener('click', (() => renderizarCategorias()));
adicionando.addEventListener('click', (() => adicionarCategorias()));
formProduto.addEventListener('submit', ((event) => {
    event.preventDefault();
    salvandoProduto(event);
    renderizarProdutos(`all`);
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