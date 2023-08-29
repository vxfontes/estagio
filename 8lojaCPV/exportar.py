import openpyxl
from flask import Flask, request, jsonify
from flask_cors import CORS

# criar um servidor em python para que haja interação com o front
app = Flask(__name__) ## inicializando servidor
CORS(app)  # adiciona CORS ao Flask

## rota
@app.route('/getFile', methods=['POST']) ##post -> envio de dados para a requisição
def getData():
    dados = request.get_json()  # obtendo array enviado
    
    response = jsonify({'dados': dados})
    response.headers.add('Access-Control-Allow-Origin', '*')  # Permitir acesso de qualquer origem
    return response

## rodando o servidor semelhante ao express do nodejs
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000) ## escolhendo a porta que usaremos