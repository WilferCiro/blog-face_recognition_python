from flask import Flask, request, jsonify
from flask_cors import CORS
import service

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    image_file = request.files['image']
    found_id = service.login(image_file)

    if found_id is not None:
        splitted = found_id.split("-")
        return jsonify({'message': f'Inicio de sesión exitoso', "id": splitted[0], "user": splitted[1]})
    return jsonify({'error': 'La cara no coincide con ninguna persona conocida'})

