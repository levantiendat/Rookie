from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav
    
def audio_gen(text_prompt,history_prompt, output_path):
    # Download and load all models
    preload_models()
    audio_array = generate_audio(text_prompt,history_prompt=history_prompt)
    # Save audio to disk
    write_wav("bark_generation.wav", SAMPLE_RATE, audio_array)


# just 4 testing :D
if __name__ == '__main__':
    text_prompt = """
        Hello, my name is Suno. And, uh — and I like pizza.
        But I also have other interests such as playing tic tac toe.
    """
    history_prompt = "v2/en_speaker_6"  # update this as needed
    output_path = "bark_generation.wav"
    audio_gen(text_prompt, history_prompt, output_path)