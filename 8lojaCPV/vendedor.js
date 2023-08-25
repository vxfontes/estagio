const formVendedor = document.getElementById('formVendedor');
const mensagens = document.getElementById('mensagens');
const mensagemErroSucess = document.createElement('h5');
const search = document.getElementById('search');
const reset = document.createElement('reset');
const vendedorContainer = document.getElementById('vendedorContainer');

const vendedores = JSON.parse(localStorage.getItem("vendedores")) || [];
function salvandoVendedor(event) {
    const { nome, matricula } = event.target;

    if (validarCampos(nome.value, matricula.value)) {
        mensagemErroSucess.textContent = `Vendedor ${nome.value} cadastrado com sucesso!`;
        mensagemErroSucess.style.color = '#634d91';
        mensagens.appendChild(mensagemErroSucess);

        const vendedor = {
            nome: nome.value,
            matricula: matricula.value,
        }
        vendedores.push(vendedor);
        localStorage.setItem('vendedores', JSON.stringify(vendedores));
        formVendedor.reset()
    } else {
        mensagemErroSucess.textContent = 'Por favor, preencha todos os campos antes de enviar.';
        mensagemErroSucess.style.color = 'red';
        mensagens.appendChild(mensagemErroSucess);
    }
}

function exibindoVendedor(vendedor) {

    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
        <div class='col mx-4 mt-3'>
            <div class="card" style="width: 100%; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);">
                <div class="row no-gutters">
                <div class="col-md-2"><img
                    src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-gris.png"
                    class="card-img rounded-circle m-4" alt="foto do vendedor"></div>
                        <div class="col-md-8 mt-1 m-3">
                            <div class="card-body text-start">
                            <div>
                                <h5 class="card-title">${vendedor.nome}</h5>
                                <p class="card-text">Matrícula: ${vendedor.matricula}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;

    vendedorContainer.appendChild(cardDiv);
}

function renderizarVendedores(filtro) {
    vendedorContainer.innerHTML = '';

    if (filtro === 'none') {
        vendedores.forEach(vendedor => exibindoVendedor(vendedor))
    } else {
        vendedores.filter(vendedor => {
            if(vendedor.nome.includes(filtro) || vendedor.matricula.includes(filtro)) {
                exibindoVendedor(vendedor)
                return true
            }
            return false
        })
    }
}

function validarCampos(nome, matricula) {
    if (nome.trim() === '' || matricula === '') return false;
    return true;
}

formVendedor.addEventListener('submit', ((event) => {
    event.preventDefault();
    salvandoVendedor(event);
    renderizarVendedores('none');
}));
document.addEventListener('DOMContentLoaded', () => {
    renderizarVendedores('none');
    console.log(vendedores);
});
search.addEventListener('input', () => {
    renderizarVendedores(search.value);
});