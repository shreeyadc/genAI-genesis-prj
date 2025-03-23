from gradio_client import Client

# Initialize the Gradio client to connect to MusicGen
client = Client("https://facebook-musicgen.hf.space/")
# Provide a text description for the music you want
result = client.predict(
    "A calm and peaceful sunset at the beach.",  # Text description
    "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/audio_sample.wav",  # Audio file URL (for context)
    fn_index=0  # Indicate which function to use (0 corresponds to text-to-music)
)

# Output the result (it will be a generated audio file or a link to it)
print(result)
