from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load the trained model
model = load_model('x_ray_model.h5')

@app.route("/")
def index1():
    return jsonify({"message": "Welcome"})

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file Found'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'File is empty'})

    # Read and preprocess the test image
    test_img = cv2.imdecode(np.fromstring(
        file.read(), np.uint8), cv2.IMREAD_COLOR)
    test_img = test_img / 255.0  # Normalize
    test_img = cv2.resize(test_img, (100, 100))  # Resize
    test_img = np.expand_dims(test_img, axis=0)  # Add batch dimension

    # Make a prediction
    prediction = model.predict(test_img)

    # The prediction will be a probability, you can threshold it to get a binary prediction
    binary_prediction = 1 if prediction > 0.5 else 0

    # Return the result as JSON
    return jsonify({
        'probability': float(prediction[0][0]),
        'class': 'COVID-19' if binary_prediction == 1 else 'Normal'
    })

if __name__ == '__main__':
    app.run(debug=True)
