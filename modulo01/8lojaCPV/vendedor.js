const formVendedor = document.getElementById('formVendedor');
const mensagens = document.getElementById('mensagens');
const mensagemErroSucess = document.createElement('h5');
const search = document.getElementById('search');
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

function exibindoVendedor(vendedor, index) {

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
                            <div class='mb-0'>
                                <button class='btn btn-outline-danger mt-3' onclick='removerVendedor(${index})'>Excluir</button>
                                <button class='btn btn-outline-primary mt-3' onclick='editarVendedor(${index})'>Editar</button>
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
        vendedores.forEach((vendedor, index) => exibindoVendedor(vendedor, index))
    } else {
        vendedores.filter((vendedor, index) => {
            if (vendedor.nome.includes(filtro) || vendedor.matricula.includes(filtro)) {
                exibindoVendedor(vendedor, index)
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

function editarVendedor(index) {
    const vendedor = vendedores[index];
    const editForm = document.createElement('form');

    editForm.innerHTML = `
    <div class="mt-3">
        <div class="card" style="width: 90%; margin-left:5%; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);">
            <div class="m-3">
                <input type='text' id='editNome' value='${vendedor.nome}' class='form-control my-2'>
                <input type='number' id='editMatricula' value='${vendedor.matricula}' class='form-control' min='0'>
                <div>
                    <button class='btn btn-sucess mt-2' onclick='salvarEdicao(${index})'>Salvar</button>
                    <button class='btn btn-secondary mt-2' onclick='cancelarEdicao()'>Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    vendedorContainer.replaceChild(editForm, vendedorContainer.children[index]);
}

function salvarEdicao(index) {
    const nomeInput = document.getElementById("editNome").value;
    const matriculaInput = document.getElementById("editMatricula").value;

    if (validarCampos(nomeInput, matriculaInput)) {
        vendedores[index].matricula = matriculaInput;
        vendedores[index].nome = nomeInput;
        localStorage.setItem('vendedores', JSON.stringify(vendedores));
        renderizarVendedores('none');
    } else {
        alert('Preencha todos os campos corretamente!');
    }
}

function removerVendedor(index) {
    vendedores.splice(index, 1); // metodo para remover 1 elemento a partir da posição index
    localStorage.setItem('vendedores', JSON.stringify(vendedores));
    renderizarVendedores('none');
}


const cancelarEdicao = () => renderizarVendedores('none');
formVendedor.addEventListener('submit', ((event) => {
    event.preventDefault();
    salvandoVendedor(event);
    renderizarVendedores('none');
}));
document.addEventListener('DOMContentLoaded', () => renderizarVendedores('none'));
search.addEventListener('input', () => {
    renderizarVendedores(search.value);
});