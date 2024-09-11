from flask import Blueprint, request, jsonify
import vertexai
from vertexai.preview.vision_models import Image, ImageGenerationModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import random
from flask import send_from_directory


# Load environment variables from .env file
load_dotenv()

upload = './'
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

    
    obj = request.get_json()
    item_selling = obj['search']
    # discount = request.json['discount']
    # theme = request.json['theme']
    count = 5

    # model = genai.GenerativeModel('gemini-pro')
    # chat = model.start_chat(history=[])

    prompt_text = f"Generate creative a images of {item_selling}. Make it attractive so that more Indian people can buy it. Select colors to maintain brand consistency"
    if 'discount' in obj:
        discount = obj['discount']
        prompt_text = prompt_text + f" in the image also show discount of {discount}%"
    
    if 'theme' in obj:
        theme = obj['theme']
        prompt_text = prompt_text + f" and set image theme as {theme}"
    
    # response = chat.send_message(prompt_text)
    # print(response.text)

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
