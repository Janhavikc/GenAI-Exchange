from flask import Blueprint, request, jsonify
import vertexai
from vertexai.preview.vision_models import Image, ImageGenerationModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import random

# Load environment variables from .env file
load_dotenv()

# Create a blueprint for routes
main_routes = Blueprint('main', __name__)

@main_routes.route("/imagen", methods=["POST"])
def imagen():
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

    item_selling = request.json['search']
    discount = request.json['discount']
    theme = request.json['theme']
    count = 5

    prompt_text = f"Generate creative images banner of {item_selling} restricted to {count} images. Make it appealing so that people will be interested to buy it. Choose background colour palette to maintain brand consistency"
    if discount!=0:
        prompt_text = prompt_text + f" Show image along with discount of {discount}%"
    
    if theme:
        prompt_text = prompt_text + f" and theme of{theme}"
    

    print(prompt_text)

    model = ImageGenerationModel.from_pretrained("imagegeneration@005")
    images = model.generate_images(prompt=prompt_text)


    num = random.random()
    image_path = []
    for image in images:
        image.save(location=f"./img-{num}.png", include_generation_parameters=True)
        image_path.append(f'./img-{num}.png')


    # data = {prompt:response.text}
    return prompt_text
