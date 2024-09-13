from flask import Flask, jsonify, request
from routes import main_routes  # Import the routes module
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, decode_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_pymongo import PyMongo


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/GenAI-Hackathon"

mongo = PyMongo(app)

# Configuration for Flask-JWT-Extended
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_TOKEN')  # Change this to a random secret key
jwt = JWTManager(app)

# Register the blueprint
app.register_blueprint(main_routes)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# In-memory user storage (replace with database in production)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    users = mongo.db.users.find().distinct(key="email")
    if email in users:
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    # users[username] = hashed_password
    mongo.db.users.insert_one({
        "firstName":firstName,
        "lastName":lastName,
        "email":email,
        "password":hashed_password
    })
    access_token = create_access_token(identity=email)

    return jsonify({"msg": "User created successfully", 
    "token": access_token, 
    "name": firstName+" "+ lastName, 
    "email": email}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')

    users = mongo.db.users.find_one(filter={"email":email})

    print(users)

    if email not in users["email"] or not check_password_hash(users["password"], password):
        return jsonify({"msg": "Invalid username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"access_token":access_token,
    "email": email, "name":users["firstName"]+" "+ users["lastName"]}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200



if __name__ == "__main__":
    app.run(debug=True)