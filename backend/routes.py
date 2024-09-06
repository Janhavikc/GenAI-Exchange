from flask import Blueprint, request, jsonify
import vertexai
# from vertexai.preview.vision_models import Image, ImageGenerationModel
# import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create a blueprint for routes
main_routes = Blueprint('main', __name__)

@main_routes.route("/imagen", methods=["POST"])
def imagen():
    # gcp_project_id = '' # @param {type: "string"}   
    # auth.authenticate_user(project_id=gcp_project_id)

    # vertexai.init(project=gcp_project_id)
    #Access your Gemini API key

    gemini_api_secret_name = os.getenv('API_KEY')  # @param {type: "string"}
    data = {
        "api_key":gemini_api_secret_name
    }

    return jsonify(data)

    # try:
    # GOOGLE_API_KEY=userdata.get(gemini_api_secret_name)
    # genai.configure(api_key=GOOGLE_API_KEY)
    # except userdata.SecretNotFoundError as e:
    # print(f'Secret not found\n\nThis expects you to create a secret named {gemini_api_secret_name} in Colab\n\nVisit https://makersuite.google.com/app/apikey to create an API key\n\nStore that in the secrets section on the left side of the notebook (key icon)\n\nName the secret {gemini_api_secret_name}')
    # raise e
    # except userdata.NotebookAccessError as e:
    # print(f'You need to grant this notebook access to the {gemini_api_secret_name} secret in order for the notebook to access Gemini on your behalf.')
    # raise e
    # except Exception as e:
    # # unknown error
    # print(f"There was an unknown error. Ensure you have a secret {gemini_api_secret_name} stored in Colab and it's a valid key from https://makersuite.google.com/app/apikey")
    # raise e

    # model = genai.GenerativeModel('gemini-pro')
