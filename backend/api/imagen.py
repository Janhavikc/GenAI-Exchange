from flask import request, jsonify, current_app
import vertexai
from vertexai.preview.vision_models import Image, ImageGenerationModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import random
from flask import send_from_directory
from google.cloud import aiplatform
from flask_pymongo import PyMongo
from flask_cors import cross_origin # type: ignore
from . import imagen_bp, mongo
from api.users import requires_auth, get_user_info


# Load environment variables from .env file
load_dotenv()

service_account_json = './service-account.json'

def initialize_vertex_ai_client(service_account_json):
    # Initialize the Vertex AI client
    aiplatform.init(credentials=service_account_json)
    
    # Optionally, you can specify the project and location
    # aiplatform.init(project='your-project-id', location='us-central1', credentials=service_account_json)
    
    print("Vertex AI client initialized successfully.")

@imagen_bp.route("/imagen", methods=["POST"])
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


@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
@imagen_bp.route("/update-image-banner", methods=["PUT"])
def updateImageBanner():

    obj = request.get_json()
    # print(g.user_info)
    user_email = get_user_info()
    mongo.db.imagebanner.update_one(filter={"email": user_email, "canvas_id":obj["canvas_id"]}, update={"$set":{"canvas":obj["canvas"]}})
    return jsonify({"user mail":user_email})


# @cross_origin(headers=["Content-Type", "Authorization"])
# @requires_auth
# @imagen_bp.route("/create-image-banner", methods=["POST"])
# def createImageBanner():

#     obj = request.get_json()
#     # print(g.user_info)
#     user_email = get_user_info()
#     mongo.db.imagebanner.insert_one(document=obj)
#     return jsonify({"user mail":user_email})