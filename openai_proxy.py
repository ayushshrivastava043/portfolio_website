from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Most permissive: allows all origins and methods

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    print("Received message:", data)
    return jsonify({"reply": f"Hello, you said: {data.get('message', '')}"})

if __name__ == "__main__":
    app.run(port=5000, debug=True) 