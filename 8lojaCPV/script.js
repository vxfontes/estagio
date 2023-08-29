const getFile = document.getElementById('getFile');
const vendedoresArray = JSON.parse(localStorage.getItem("vendedores")) || [];

function getType() {
    const valor = getFile.value

    if(valor == 'vendedores') {
        enviandoValores({ vetor: vendedoresArray, type: valor })
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