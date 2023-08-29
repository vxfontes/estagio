const getFile = document.getElementById('getFile');
const vendedoresArray = JSON.parse(localStorage.getItem("vendedores")) || [];
const produtosArray = JSON.parse(localStorage.getItem("produtos")) || [];
const clientesArray = JSON.parse(localStorage.getItem("clientes")) || [];

function getType() {
    const valor = getFile.value

    if(valor == 'vendedores') {
        enviandoValores({ vetor: vendedoresArray, type: valor })
    } else if(valor == 'produtos') {
        enviandoValores({ vetor: produtosArray, type: valor })
    } else if(valor == 'clientes') {
        enviandoValores({ vetor: clientesArray, type: valor })
    }
}

function enviandoValores(value) {
    const host = 'http://10.130.171.129:3000';

    axios.post(`${host}/getFile`, value)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

getFile.addEventListener('click', () => getType());