from flask import Flask, request, jsonify
from flask_cors import CORS
from gradio_client import Client
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/greet', methods=['GET'])
def greet():
    result = "it is working"
    return result

@app.route("/input", methods=["GET"])
def read_chat():
    return jsonify({"message": "GET request received"})

@app.route("/input", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'message' in request body"}), 400
    message = data.get('text')
    response = transcribe(message)
    return jsonify({"text": response})

def transcribe(user_input):
    return user_input+" test"

# Define the function
def get_mood_words(journal_entry):

    prompt = f"""
    Below is a journal entry. Your job is to read it and return **only the top 3 mood or emotional words** that best match the tone and content of the entry.

    Please choose from this exact list of words only:
    joyful, happy, cheerful, chipper, amused, upbeat, delighted, thrilled, excited, bubbly, content, satisfied, optimistic, grateful, playful, lively, blissful, exuberant, giddy, jubilant, merry, zestful, sunny, vivacious, laughing, grinning, chuffed, relaxed, calm, peaceful, serene, composed, zen, unruffled, chill, easygoing, comfortable, meditative, mellow, carefree, contented, unperturbed, safe, settled, angry, annoyed, irritated, infuriated, frustrated, enraged, outraged, agitated, hostile, resentful, cross, grumpy, touchy, temperamental, impatient, snappy, sad, melancholy, gloomy, depressed, blue, mournful, heartbroken, morose, sorrowful, wistful, crying, glum, unhappy, hopeless, lonely, low, dejected, anxious, nervous, afraid, scared, fearful, insecure, uneasy, petrified, alarmed, jumpy, tense, jittery, worried, distressed, threatened, panicked, curious, interested, engaged, enthusiastic, inspired, thoughtful, introspective, contemplative, philosophical, fascinated, absorbed, studious, reflective

    Only reply with the 3 best-fitting words from this list, separated by commas.

    Journal Entry:
    {journal_entry}
    """

    try:
        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        response = model.generate_content(prompt)
        text = response.text.strip()
        print("Top 3 Moods:", text)
    except Exception as e:
        print("Gemini API Error:", str(e))


@app.route('/music', methods=['GET'])
def music():
    # Get the input text from the GET request (e.g., /greet?text=YourTextHere)
    text_description = request.args.get('text', default='A calm and peaceful sunset at the beach.', type=str)
    print(text_description)
    # Initialize the Gradio client to connect to MusicGen
    client = Client("https://facebook-musicgen.hf.space/")
    
    # Provide the text description (from the GET request) for the music you want
    result = client.predict(
        text_description,  # Use the input text description
        None,  # Audio file URL (for context)
        fn_index=0  # Indicate which function to use (0 corresponds to text-to-music)
    )
    
    # Return the result (it will be a generated audio file or a link to it)
    return result
if __name__ == '__main__':
    app.run(debug=True)
