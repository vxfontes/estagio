import openpyxl
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

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
    response.headers["Content-Disposition"] = f"attachment; filename={name}.xlsx"
    return response


def generateExcel(data, name):
    wb = openpyxl.Workbook()
    ws = wb.active

    for item in data:
        row_data = []

        if name == 'vendedores':
            row_data = [item['matricula'], item['nome']]
        elif name == 'produtos':
            row_data = [', '.join(item['categoria']), item['nome'], item['valor']]
        elif name == 'clientes':
            row_data = [item['cpf'], item['dataNascimento'], item['nome'], item['origem'], item['score']]
        
        ws.append(row_data)

    file_path = f"{name}.xlsx"
    wb.save(file_path)
    return file_path


## rodando o servidor semelhante ao express do nodejs
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000) ## escolhendo a porta que usaremos