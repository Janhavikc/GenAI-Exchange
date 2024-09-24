

from flask import Flask
from api import users_bp, imagen_bp
from flask_pymongo import PyMongo


APP = Flask(__name__)

# Register blueprints
APP.register_blueprint(users_bp, url_prefix='/api')
APP.register_blueprint(imagen_bp, url_prefix='/api')

APP.config["MONGO_URI"] = "mongodb://localhost:27017/GenAI-Hackathon"
mongo = PyMongo(APP)

@APP.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == "__main__":
    APP.run(debug=True)