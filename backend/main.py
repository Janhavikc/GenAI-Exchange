import json
from six.moves.urllib.request import urlopen # type: ignore
from functools import wraps

from flask import Flask, request, jsonify, g

from flask_cors import cross_origin # type: ignore
from jose import jwt # type: ignore
import vertexai
from vertexai.preview.vision_models import Image, ImageGenerationModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import random
from flask import send_from_directory
from google.cloud import aiplatform

AUTH0_DOMAIN = 'dev-zhqru81kwfzddklq.jp.auth0.com'
API_AUDIENCE = 'https://dev-zhqru81kwfzddklq.jp.auth0.com/api/v2/'
ALGORITHMS = ["RS256"]

APP = Flask(__name__)

# Error handler
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

@APP.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

# /server.py

# Format error response and append status code
def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with"
                            " Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be"
                            " Bearer token"}, 401)

    token = parts[1]
    return token

def requires_auth(f):
    """Determines if the Access Token is valid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://"+AUTH0_DOMAIN+"/"
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    "please check the audience and issuer"}, 401)
            except Exception:
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 401)

            g.custom_user_info = payload
            return f(*args, **kwargs)
        raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 401)
    return decorated

def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("scope"):
            token_scopes = unverified_claims["scope"].split()
            for token_scope in token_scopes:
                if token_scope == required_scope:
                    return True
    return False


# Load environment variables from .env file
load_dotenv()

service_account_json = './service-account.json'

def initialize_vertex_ai_client(service_account_json):
    # Initialize the Vertex AI client
    aiplatform.init(credentials=service_account_json)
    
    # Optionally, you can specify the project and location
    # aiplatform.init(project='your-project-id', location='us-central1', credentials=service_account_json)
    
    print("Vertex AI client initialized successfully.")

@APP.route("/imagen", methods=["POST"])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def imagen():

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=service_account_json

    gcp_project_id = os.getenv('PROJECT_ID') # @param {type: "string"}   
    vertexai.init(project=gcp_project_id)
    
    #Access your Gemini API key

    gemini_api_secret_name = os.getenv('API_KEY')  # @param {type: "string"}

    try:
        GOOGLE_API_KEY=gemini_api_secret_name
        genai.configure(api_key=GOOGLE_API_KEY)
    
    except Exception as e:
        # unknown error
        print(f"There was an unknown error. Ensure you have a secret {gemini_api_secret_name} stored and it's a valid key from https://makersuite.google.com/app/apikey")
        raise e

    
    obj = request.get_json()
    item_selling = obj['search']
    pixelWidth = obj['width']
    pixelHeight = obj['height']
    # discount = request.json['discount']
    # theme = request.json['theme']
    count = 5

    # model = genai.GenerativeModel('gemini-pro')
    # chat = model.start_chat(history=[])

    prompt_text = f"Generate a images of {item_selling} with width {pixelWidth}px and height {pixelHeight}px. Make it creative and attractive so that more Indian people can buy it. Select colors to maintain brand consistency"
    if 'discount' in obj and obj['discount'] !='':
        discount = obj['discount']
        prompt_text = prompt_text + f" Mention the discount of {discount}% in the image."
    
    if 'theme' in obj and obj['theme']!='':
        theme = obj['theme']
        prompt_text = prompt_text + f" and set image theme as {theme}"
    
    # response = chat.send_message(prompt_text)
    print(prompt_text)

    model = ImageGenerationModel.from_pretrained("imagegeneration@005")
    images = model.generate_images(prompt=prompt_text)


    num = random.random()
    image_path = []
    for image in images:
        image.save(location=f"./img-{num}.png", include_generation_parameters=True)
        image_path.append(f'img-{num}.png')


    # data = {prompt:response.text}
    return send_from_directory(
        ".", image_path[0], as_attachment=True
    )



@APP.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == "__main__":
    APP.run(debug=True)