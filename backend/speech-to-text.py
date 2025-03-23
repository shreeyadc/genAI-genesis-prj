import os
import pyaudio
import threading
from google.cloud import speech
import signal
import sys

# Set the environment variable for authentication
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "speech-credentials.json"

# Initialize the Google Cloud Speech client
client = speech.SpeechClient()

# Audio format parameters
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
CHUNK = 1024
DEVICE_INDEX = None  # Set None to use the default device

# File path to save transcription
output_file_path = "transcription_output.txt"

# Transcription flag to start and stop
is_recording = False
full_transcription = ""  # Variable to store transcription

# Function to handle graceful exit on Ctrl+C
def signal_handler(sig, frame):
    print("\nStopping transcription...")
    global is_recording
    is_recording = False
    save_transcription_to_file()  # Save the transcription to file
    sys.exit(0)

# Register signal handler for graceful stop (Ctrl+C)
signal.signal(signal.SIGINT, signal_handler)

# Function to handle real-time transcription
def transcribe_streaming():
    global is_recording, full_transcription
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
    
    # Start streaming audio to Google Cloud Speech API
    requests = (speech.StreamingRecognizeRequest(audio_content=chunk) for chunk in iter(lambda: stream.read(CHUNK), b""))
    streaming_config = speech.StreamingRecognitionConfig(
        config=speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=RATE,
            language_code="en-US"
        ),
        interim_results=True
    )
    responses = client.streaming_recognize(streaming_config, requests)

    # Process the audio response and save the transcription
    for response in responses:
        for result in response.results:
            if result.is_final:
                transcript = result.alternatives[0].transcript
                full_transcription += " " + transcript  # Append to transcription variable

                # Stop recording when 'stop' is pressed
                if not is_recording:
                    break

    # Save transcription to file once stopped
    save_transcription_to_file()
    print("Recording stopped.")

def save_transcription_to_file():
    """Save the full transcription to a text file."""
    with open(output_file_path, "w") as f:
        f.write(full_transcription)
    print(f"Transcription saved to {os.path.abspath(output_file_path)}")

# Start/Stop control function
def toggle_recording():
    global is_recording

    if is_recording:
        print("Stopping transcription...")
        is_recording = False
    else:
        print("Starting transcription...")
        is_recording = True
        threading.Thread(target=transcribe_streaming, daemon=True).start()

# Command-line interface simulation for start/stop
if __name__ == "__main__":
    print("Type 'start' to begin or 'stop' to end transcription.")
    while True:
        user_input = input().strip().lower()

        if user_input == "start":
            toggle_recording()  # Start recording and transcription
        elif user_input == "stop":
            toggle_recording()  # Stop recording and save transcription
            print(f"Transcription:\n{full_transcription}")  # Display variable contents
            break  # Exit after stopping transcription
