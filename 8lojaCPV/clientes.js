const formCliente = document.getElementById('formCliente');
const mensagens = document.getElementById('mensagens');
const mensagemErroSucess = document.createElement('h3');
const search = document.getElementById('search');
const clienteContainer = document.getElementById('clienteContainer');

const baseClientes = JSON.parse(localStorage.getItem("clientes")) || []

function finalizando(event) {
    event.preventDefault();
    const { nome, dataNascimento, cpf, origem, score } = event.target;

    if (validarCampos(nome.value, dataNascimento.value, cpf.value, origem.value, score.value)) {

        mensagemErroSucess.textContent = `Cliente ${nome.value} cadastrado com sucesso`;
        mensagemErroSucess.style.color = '#634d91';
        mensagens.appendChild(mensagemErroSucess);

        const cliente = {
            nome: nome.value,
            dataNascimento: dataNascimento.value,
            cpf: cpf.value,
            origem: origem.value,
            score: score.value
        }

        baseClientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(baseClientes));
        formCliente.reset();
    } else {
        mensagemErroSucess.textContent = 'Por favor, preencha todos os campos antes de enviar.';
        mensagemErroSucess.style.color = 'red';
        mensagens.appendChild(mensagemErroSucess);
    }
}

function exibindoCliente(cliente) {
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
        <div class='col mx-4 mt-3'>
            <div class="card" style="width: 100%; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);">
                <div class="row no-gutters">
                <div class="col-md-2"><img
                    src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-gris.png"
                    class="card-img rounded-circle m-4" alt="foto do cliente"></div>
                        <div class="col-md-8 mt-1 mb-0">
                            <div class="card-body text-start">
                            <div>
                                <h5 class="card-title">${cliente.nome}</h5>
                                Data de nascimento: ${cliente.dataNascimento}<br>
                                Score: ${cliente.score}<br>
                                CPF: ${cliente.cpf}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    clienteContainer.appendChild(cardDiv);
}

function renderizarClientes(filtro) {
    clienteContainer.innerHTML = '';

    if (filtro === 'none') baseClientes.forEach(Cliente => exibindoCliente(Cliente))
    else {
        baseClientes.filter(Cliente => {
            if(Cliente.nome.includes(filtro) || Cliente.dataNascimento.includes(filtro) || Cliente.cpf.includes(filtro) || Cliente.score.includes(filtro)) {
                exibindoCliente(Cliente)
                return true
            }
            return false
        })
    }
}

function validarCampos(nome, dataNascimento, cpf, origem, score) {
    if (nome.trim() === '' || dataNascimento.trim() === '' || cpf.trim() === '' || origem === '' || score === '') return false;
    return true;
}


formCliente.addEventListener('submit', ((event) => {
    finalizando(event);
    renderizarClientes('none');
}));
formCliente.addEventListener('input', () => mensagemErroSucess.remove());
document.addEventListener('DOMContentLoaded', () => renderizarClientes('none'));
search.addEventListener('input', () => renderizarClientes(search.value));