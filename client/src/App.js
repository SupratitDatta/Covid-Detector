import React from "react";
import "./css/app.css";
import Prediction from "./components/Prediction";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";

function App() {
    return (
        <>
            <Navbar />
            <Prediction />
            {/* <SignIn/> */}
        </>
    );
}

export default App;