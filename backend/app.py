from flask import Flask, request
from gradio_client import Client

app = Flask(__name__)

@app.route('/greet', methods=['GET'])
def greet():
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
