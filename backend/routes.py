from flask import Blueprint, request, jsonify
import vertexai
from vertexai.preview.vision_models import Image, ImageGenerationModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import random
from flask import send_from_directory
from google.cloud import aiplatform
from flask_jwt_extended import jwt_required, get_jwt_identity


# Load environment variables from .env file
load_dotenv()

# Create a blueprint for routes
main_routes = Blueprint('imagen', __name__)
service_account_json = './service-account.json'

def initialize_vertex_ai_client(service_account_json):
    # Initialize the Vertex AI client
    aiplatform.init(credentials=service_account_json)
    
    # Optionally, you can specify the project and location
    # aiplatform.init(project='your-project-id', location='us-central1', credentials=service_account_json)
    
    print("Vertex AI client initialized successfully.")

@main_routes.route("/imagen", methods=["POST"])
@jwt_required()
def imagen():
    current_user = get_jwt_identity()
    print(current_user)
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
    # discount = request.json['discount']
    # theme = request.json['theme']
    count = 5

    # model = genai.GenerativeModel('gemini-pro')
    # chat = model.start_chat(history=[])

    prompt_text = f"Generate a images of {item_selling}. Make it creative and attractive so that more Indian people can buy it. Select colors to maintain brand consistency"
    if 'discount' in obj:
        discount = obj['discount']
        prompt_text = prompt_text + f"Mention the discount of {discount}% in the image."
    
    if 'theme' in obj:
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
