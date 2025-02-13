"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

# NUEVO: Importar lo necesario para JWT
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend."
    }
    return jsonify(response_body), 200


# RUTA PARA REGISTRAR USUARIO
@api.route('/signup', methods=['POST'])
def signup():
    # Obtenemos el email y password del body
    data = request.get_json()
    if not data:
        return jsonify({"msg": "No body request provided"}), 400

    email = data.get("email", None)
    password = data.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    # Verificamos si ya existe un usuario con ese email
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 400

    # Creamos el nuevo usuario
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201


# RUTA PARA INICIAR SESIÓN Y OBTENER TOKEN
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "No body request provided"}), 400

    email = data.get("email", None)
    password = data.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    # Buscamos al usuario en la BD
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    # Convertimos user.id a string para evitar el error
    access_token = create_access_token(identity=str(user.id))
    return jsonify({ 
        "msg": "Login successful",
        "token": access_token,
        "user_id": user.id
    }), 200



# RUTA PROTEGIDA DE EJEMPLO
@api.route('/private', methods=['GET'])
@jwt_required()  # Decorador que obliga a incluir el token en el Authorization Header
def private():
    # Obtenemos el id del usuario a partir del token
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "msg": "This is a private route",
        "user": user.serialize()
    }), 200
