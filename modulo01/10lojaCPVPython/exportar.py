import openpyxl
from flask import Flask, request, send_file
from flask_cors import CORS
import os

# criar um servidor em python para que haja interação com o front
app = Flask(__name__) ## inicializando servidor
CORS(app)  # adiciona CORS ao Flask

## rota
@app.route('/getFile', methods=['POST']) ##post -> envio de dados para a requisição
def getData():
    data = request.json['vetor']
    name = request.json['type'] # obtendo array enviado
    
    file_path = generateExcel(data, name)
    
    response = send_file(file_path, as_attachment=True)
    return response


def generateExcel(data, name):
    wb = openpyxl.Workbook()
    ws = wb.active

    if name == 'vendedores':
        ws.append(['nome', 'matricula'])
        for item in data:
            ws.append([item['nome'], item['matricula']])
    elif name == 'produtos':
        ws.append(['nome', 'categoria', 'valor'])
        for item in data:
            ws.append([item['nome'], ', '.join(item['categoria']), item['valor']])
    elif name == 'clientes':
        ws.append(['nome', 'cpf', 'dataNascimento', 'origem', 'score'])
        for item in data:
            ws.append([item['nome'], item['cpf'], item['dataNascimento'], item['origem'], item['score']])

    # cria a pasta arquivos se nao existir
    if not os.path.exists('arquivos'):
        os.makedirs('arquivos')

    file_path = os.path.join('arquivos', f"{name}.xlsx")
    wb.save(file_path)
    return file_path


## rodando o servidor semelhante ao express do nodejs
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000) ## escolhendo a porta que usaremos