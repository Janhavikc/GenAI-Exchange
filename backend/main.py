from flask import Flask
from routes import main_routes  # Import the routes module


app = Flask(__name__)

# Register the blueprint
app.register_blueprint(main_routes)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run(debug=True)