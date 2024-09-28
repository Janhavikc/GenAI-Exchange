from flask import Blueprint, current_app
from flask_pymongo import pymongo


# Create a blueprint for each API
users_bp = Blueprint('users', __name__)
imagen_bp = Blueprint('imagen', __name__)

# current_app.config["MONGO_URI"] = "mongodb://localhost:27017/GenAI-Hackathon"
CONNECTION_STRING = "mongodb://mongo:27017/"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('GenAI-Hackathon')
from . import users, imagen