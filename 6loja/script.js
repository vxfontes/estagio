const formCliente = document.getElementById('formCliente');
const mensagens = document.getElementById('mensagens');
const mensagemErroSucess = document.createElement('h3');


const baseClientes = []

function finalizando(event) {
    event.preventDefault();
    const nome = event.target.nome.value;
    const dataNascimento = event.target.dataNascimento.value;
    const cpf = event.target.cpf.value;
    const origem = event.target.origem.value;
    const score = event.target.score.value;

    if (validarCampos(nome, dataNascimento, cpf, origem, score)) {

        mensagemErroSucess.textContent = `Cliente ${nome} cadastrado com sucesso`;
        mensagemErroSucess.style.color = 'blue';

        mensagens.appendChild(mensagemErroSucess);
        
        const cliente = {
            nome: nome,
            dataNascimento : dataNascimento,
            cpf: cpf,
            origem: origem,
            score: score
        }

        baseClientes.push(cliente);
        limparCampos();
    } else {
        mensagemErroSucess.textContent = 'Por favor, preencha todos os campos antes de enviar.';
        mensagemErroSucess.style.color = 'red';

        mensagens.appendChild(mensagemErroSucess);
    }
}


function validarCampos(nome, dataNascimento, cpf, origem, score) {
    if (nome.trim() === '' || dataNascimento.trim() === '' || cpf.trim() === '' || origem === '' || score === '') { // remover espaços
        return false;
    }
    
    return true;
}

function limparCampos() {
    formCliente.nome.value = '';
    formCliente.dataNascimento.value = '';
    formCliente.cpf.value = '';
    formCliente.origem.value = '';
    formCliente.score.value = '';

    console.log(baseClientes);
}

function removerMensagemErro() {
    if (mensagemErroSucess) {
        mensagemErroSucess.remove();
    }
}


formCliente.addEventListener('submit', ((event) => finalizando(event)));
formCliente.addEventListener('input', () => {
    removerMensagemErro();
});