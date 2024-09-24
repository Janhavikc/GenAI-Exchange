from flask import Blueprint
from flask_pymongo import PyMongo

# Create a blueprint for each API
users_bp = Blueprint('users', __name__)
imagen_bp = Blueprint('imagen', __name__)

# current_app.config["MONGO_URI"] = "mongodb://localhost:27017/GenAI-Hackathon"
mongo = PyMongo()
from . import users, imagen