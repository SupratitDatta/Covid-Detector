import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

# Function to load images and labels
def loadImages(path, urls, target):
    images = []
    labels = []
    for i in range(len(urls)):
        img_path = os.path.join(path, urls[i])
        img = cv2.imread(img_path)
        img = img / 255.0
        img = cv2.resize(img, (100, 100))
        images.append(img)
        labels.append(target)
    images = np.asarray(images)
    return images, labels

# Load COVID-19 images
covid_path = "E:\\codes\\Flask\\FLASKPLUS\\FLASKPLUS\\COVID-19_Radiography_Dataset\\Covid\\images"
covidUrl = os.listdir(covid_path)
covidImages, covidTargets = loadImages(covid_path, covidUrl, 1)

# Load Normal images
normal_path = "E:\\codes\\Flask\\FLASKPLUS\\FLASKPLUS\\COVID-19_Radiography_Dataset\\Normal\\images"
normal_urls = os.listdir(normal_path)
normalImages, normalTargets = loadImages(normal_path, normal_urls, 0)

# Concatenate data and targets
data = np.concatenate([covidImages, normalImages], axis=0)
targets = np.concatenate([covidTargets, normalTargets], axis=0)

# Split data into train and test sets
x_train, x_test, y_train, y_test = train_test_split(data, targets, test_size=0.25)

# Define and compile the model
model = Sequential([
    Conv2D(32, 3, input_shape=(100,100,3), activation='relu'),
    MaxPooling2D(),
    Conv2D(16, 3, activation='relu'),
    MaxPooling2D(),
    Conv2D(16, 3, activation='relu'),
    MaxPooling2D(),
    Flatten(),
    Dense(512, activation='relu'),
    Dense(256, activation='relu'),
    Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss=tf.keras.losses.BinaryCrossentropy(), metrics=['accuracy'])

# Train the model
model.fit(x_train, y_train, batch_size=32, epochs=5, validation_data=(x_test, y_test))

# Save the model
model.save('x_ray_model.h5')
