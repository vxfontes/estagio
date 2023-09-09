
const nota2 = document.getElementById('nota2');
const nota3 = document.getElementById('nota3');
const nota4 = document.getElementById('nota4');
const formNota = document.getElementById('formNota');

const aparecerNota3 = document.getElementById('atenota3');
const aparecerNota4 = document.getElementById('atenota4');

const valueNota1 = parseInputValue(document.getElementById('valornota1').value)
const valueNota2 = parseInputValue(document.getElementById('valornota2').value)
const valueNota3 = parseInputValue(document.getElementById('valornota3').value)
const valueNota4 = parseInputValue(document.getElementById('valornota4').value)


function recebendoNota(e) {
    if (e.target.id == 'nota2') {
        formNota.removeAttribute('hidden');
    } else if (e.target.id == 'nota3') {
        formNota.removeAttribute('hidden');
        aparecerNota3.removeAttribute('hidden');
    } else if (e.target.id == 'nota4') {
        formNota.removeAttribute('hidden');
        aparecerNota3.removeAttribute('hidden');
        aparecerNota4.removeAttribute('hidden');
    }
}

function parseInputValue(value) {
    return parseFloat(value.replace(',', '.'));
}

function verificar(event) {
    event.preventDefault();
    console.log(`entrei`);
    const valorNota1 = isNaN(valueNota1) ? 0 : valueNota1;
    const valorNota2 = isNaN(valueNota2) ? 0 : valueNota2;
    const valorNota3 = isNaN(valueNota3) ? 0 : valueNota3;
    const valorNota4 = isNaN(valueNota4) ? 0 : valueNota4;

    const valoresObtidos = [valorNota1, valorNota2, valorNota3, valorNota4];
    const zeros = valoresZero(valoresObtidos)

    mediaFinal(valorNota1, valorNota2, valorNota3, valorNota4, zeros)
}

function mediaFinal(val1, val2, val3, val4, zeros) {
    const somaValores = val1 + val2 + val3 + val4;
    const resultadoMedia = (somaValores / (4 - zeros));

    document.getElementById("media").innerHTML = `A media final das ${4 - zeros} notas é: ${resultadoMedia}`;
    document.getElementById("media").style.color = 'red';
}

function valoresZero(valores) {
    let valoresComZero = []
    for (let i = 0; i < valores.length; i++) {
        if (valores[i] === 0) {
            valoresComZero.push(i)
        }
    }

    return valoresComZero.length
}


// ativado quando clicamos no botão de adicionar
formNota.addEventListener('submit', ((event) => verificar(event)));
nota2.addEventListener('click', ((e) => recebendoNota(e)));
nota3.addEventListener('click', ((e) => recebendoNota(e)));
nota4.addEventListener('click', ((e) => recebendoNota(e)));