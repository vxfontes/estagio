#include <iostream>
using namespace std;

int main() {
    double salario;
    int quantMeses;

    // valor do salario
    cout << "Informe o valor do salario: ";
    cin >> salario;
    
    bool verifica = true;
    while(verifica) {
        cout << "Informe a quantidade de meses de trabalho: ";
        cin >> quantMeses;
        if(quantMeses < 12) {
            cout << "O funcionario deve possuir mais de 12 meses de trabalho" << endl << endl;
        } else {
            verifica = false;
        }
    }

    // calculos solicitados
    double salarioFerias = (salario * quantMeses) / 12;
    salarioFerias += salarioFerias / 3;

    cout << endl << "o valor a ser recebido nas férias é: " << salarioFerias << endl;

    return 0;
}
