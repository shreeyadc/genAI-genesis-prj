import os
from google.cloud import speech

# ------------------------------------------------------------------------
# Option 1: Let Python read your JSON credentials directly in code
#           (For hackathon only, not recommended for production).
#
#   os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/path/to/speech-credentials.json"
#
# Option 2: Set the environment variable in your terminal or OS environment:
#   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/speech-credentials.json"
# ------------------------------------------------------------------------

def transcribe_audio():
    # Create a client (will automatically use the GOOGLE_APPLICATION_CREDENTIALS env var)
    client = speech.SpeechClient()

    # Specify the path to your local audio file
    audio_file_path = "test.wav"

    # Read the WAV file into memory
    with open(audio_file_path, "rb") as f:
        audio_content = f.read()
    
    # Convert to base64 string
    audio = speech.RecognitionAudio(content=audio_content)

    # Configure the request:
    # - encoding: 'LINEAR16' for raw PCM in a standard WAV file
    # - sampleRateHertz: match your file's actual sample rate (commonly 16000 for speech)
    # - languageCode: your language code (e.g., 'en-US')
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=48000,
        language_code="en-US"
    )

    # Send the request to Google Cloud
    response = client.recognize(config=config, audio=audio)

    # Process the results
    for result in response.results:
        print("Transcript:", result.alternatives[0].transcript)


if __name__ == "__main__":
    transcribe_audio()
