import React, { useState, useEffect } from "react";
import "../css/prediction.css";

function Prediction() {
    const [previewImage, setPreviewImage] = useState("");
    const [prediction, setPrediction] = useState({ probability: "", class: "", predictedImage: "" });

    useEffect(() => {
        const handleImageChange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
            else {
                setPreviewImage("");
            }
        };

        const input = document.getElementById("inputImage");
        input.addEventListener("change", handleImageChange);

        return () => {
            input.removeEventListener("change", handleImageChange);
        };
    }, []);

    const predict = async (event) => {
        event.preventDefault();

        const input = document.getElementById("inputImage");

        if (!input.files || input.files.length === 0) {
            setPrediction({ probability: "", class: "Please select an image." });
            return;
        }

        const file = input.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/predict", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            setPrediction({
                probability: data.probability,
                class: data.class,
                predictedImage: data.image_url || data.image_base64 || "",
            });
        }
        catch (error) {
            console.error("Error predicting the image:", error);
            setPrediction({ probability: "", class: "Error predicting the image.", predictedImage: "" });
        }
    };

    return (
        <div className="container">
            <h1 className="title">X-ray Image Scanner</h1>
            <form className="inputform" onSubmit={predict} method="POST">

                <div className="file-section">
                    <input type="file" accept="image/*" id="inputImage" />
                </div>

                <div className="preview-section">
                    {previewImage && <img src={previewImage} alt="Preview Image" />}
                </div>

                <button type="submit" className="predict-button">PREDICT</button>

                <div className="result-section">
                    <h2>Prediction Result:</h2>

                    {prediction.probability && (
                        <p id="result1" className="good">
                            Probability - {prediction.probability}
                        </p>
                    )}
                    {prediction.class && (
                        <p id="result2" className="good">
                            Output - {prediction.class}
                        </p>
                    )}
                    {!prediction.probability && !prediction.class && (
                        <h4 className="error">
                            {prediction.class || "{ No prediction available }"}
                        </h4>
                    )}

                    {prediction.predictedImage && (
                        <div className="predicted-image-section">
                            <h3>Predicted Image:</h3>
                            <img
                                src={prediction.predictedImage}
                                alt="Predicted Image"
                                className="predicted-image"
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Prediction;