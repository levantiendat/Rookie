from flask import Flask, jsonify, request
# from voice_clone import audio_gen
from recommend_hashtag.recommend_hashta_chatgpt import recommend_hashtag_chatgpt
from recommend_hashtag.recommend_hashtag import get_non_subset_frequent_itemsets

app = Flask(__name__)

@app.route('/', methods=["POST"])
def test():
    received_msg = request.json
    print(received_msg)
    return jsonify(received_msg)

@app.route('/rookie_api/hashtag/recommend-hashtag', methods=['POST'])
def RecommendHashtag():
    received_id_song = request.json
    #TODO: Call get_non_subset_frequent_itemsets(id) to get list of sets of hashtag
    print("RECEIVED: " + received_id_song['id_song'])
    response = get_non_subset_frequent_itemsets(received_id_song['id_song'])
    return jsonify(response)

@app.route('/rookie_api/hashtag/ai-requested', methods=["POST"])
def AIRequestedHashtag():
    received_text = request.json
    print("RECEIVED: " + received_text['text'])
    #TODO: Call recommend_hashtag_chatgpt(text) to generate hashtag using genAI
    response = recommend_hashtag_chatgpt(received_text['text'])
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)


