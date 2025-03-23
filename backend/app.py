from flask import Flask, request, jsonify
from flask_cors import CORS
from gradio_client import Client

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/greet', methods=['GET'])
def greet():
    result = "it is working"
    return result

# @app.get("/input")
# def read_chat():
#     return {"message": "GET request received"}

# @app.post("/input")
# async def chat(message: str):
#     # For now, just echo back the received message
#     response = transcribe(message)
#     return {"message": f"{response}"}

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

# @app.route('/transcribe', methods=['POST'])
# def transcribe():
#     try:
#         data = request.get_json()
#         transcribed_text = data.get('transcribedText')
        
#         if not transcribed_text:
#             return jsonify({'error': 'Transcribed text is required'}), 400
            
#         # Process the transcribed text
#         processed_text = f"{transcribed_text} backend check"
        
#         return jsonify({
#             'originalText': transcribed_text,
#             'processedText': processed_text
#         }), 200
        
#     except Exception as e:
#         print(f"Error processing transcription: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
