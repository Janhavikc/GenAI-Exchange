

from flask import Flask
from api import users_bp, imagen_bp


APP = Flask(__name__)

# Register blueprints
APP.register_blueprint(users_bp, url_prefix='/api')
APP.register_blueprint(imagen_bp, url_prefix='/api')


@APP.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == "__main__":
    APP.run(host='0.0.0.0')