vinhos = [];
valores = [];
branco = 0, rose = 0, tinto = 0

const formulario = document.getElementById('formVinho');
const fimCadastro = document.getElementById('fim');
const tableDiv = document.getElementById('table');
const vinhosTable = document.getElementById('vinhosTable');

function adicionarVinho(vinho) {
    console.log('entrei')
    if (vinho == 'rose') rose++;
    else if (vinho == 'branco') branco++;
    else if (vinho == 'tinto') tinto++;
    vinhos.push(vinho)
}

function verificar(event) {
    event.preventDefault();
    const tipoInput = document.getElementById('tipo');
    const quantidadeInput = document.getElementById('quantidade');
    const tipo = tipoInput.value.toUpperCase();
    const quantidade = parseInt(quantidadeInput.value);

    if (isNaN(quantidade) || quantidade <= 0) {
        document.getElementById("info").innerHTML = 'Quantidade inválida';
        document.getElementById("info").style.color = 'red';
        return;
    }

    if (tipo === 'T' || tipo === 'B' || tipo === 'R') {
        if (tipo === 'T') tinto += quantidade;
        if (tipo === 'B') branco += quantidade;
        if (tipo === 'R') rose += quantidade;
        vinhos.push(tipo);
        valores.push(quantidade);

        mostrandoVinhos();

        tipoInput.value = '';
        quantidadeInput.value = '';
        tipoInput.focus();
    } else {
        document.getElementById("info").innerHTML = 'Vinho inválido. Informe T, B ou R.';
        document.getElementById("info").style.color = 'red';
        tipoInput.value = '';
        tipoInput.focus();
    }
}

function mostrandoVinhos() {
    // limpando tabela
    while (vinhosTable.rows.length > 1) {
        vinhosTable.deleteRow(1);
    }

    for (let i = 0; i < vinhos.length; i++) {
        const row = vinhosTable.insertRow(i + 1);

        const posCell = row.insertCell(0);
        posCell.textContent = vinhos[i];

        const tipoCell = row.insertCell(1);
        tipoCell.textContent = valores[i];
    }
}

function calculoPorcentagem(total) {
    if (total !== 0) {
        porcRose = Math.round((rose / total * 100));
        porcBranco = Math.round((branco / total * 100))
        porcTinto = Math.round((tinto / total * 100));

        texto = `${porcRose}% são roses, ${porcBranco}% são brancos, ${porcTinto}% são tintos`;
        document.getElementById("porcentagem").innerHTML = texto;
    }
}

function finalizando() {
    let total = rose + branco + tinto;

    if (total !== 0) {
        tableDiv.removeAttribute('hidden')
        calculoPorcentagem(total);
    } else {
        document.getElementById("info").innerHTML = 'Nenhuma opção selecionada';
        document.getElementById("info").style.color = 'red';
    }
}

// ativado quando clicamos no botão de adicionar
formulario.addEventListener('submit', ((event) => verificar(event)));

// define o atributo "hidden" para falso, tornando a div visível
fimCadastro.addEventListener('click', (() => finalizando()));

