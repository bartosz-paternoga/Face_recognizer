import React from 'react';
import * as faceapi from 'face-api.js';
import Loader from './loader';

const Home = () => {

    const MODEL_URL = '/model';
  
    const a = async () => {
      const a1 = await faceapi.loadFaceDetectionModel(MODEL_URL);
      const a2 = await faceapi.loadFaceRecognitionModel(MODEL_URL);
      const a3 = await faceapi.loadFaceLandmarkModel(MODEL_URL);
      const a4 = await faceapi.loadMtcnnModel(MODEL_URL);

      console.log("MODEL LOADED");
     }

    const l = async () => {
      await a();
    }

    l();


    return (
        <div >
           <br/> 
           <pre id = "mainHome">
            This is a face recognition app. It recognizes person in a webcam using personal face </pre>
           <br/> <pre id = "mainHome">
           landmarks. Person's image needs to be uploaded first, so that face desriptotors along  
           </pre>
           <br/> <pre id = "mainHome">
           with a name are stored in a database. This face recognition app uses face-api.js for 
           </pre>
           <br/><pre id = "mainHome">
           ML algorithm, react UI for a frontend, node.js for a backend and mongoDB database.
           </pre>
           <br/><pre id = "mainHome"></pre>
            <br/><pre id = "mainHome">
           To start face recognition go to the "Data" tab and upload person(s) pics. Then go to
           </pre>
           <br/><pre id = "mainHome">
           'Cam' tab and press 'Start predict', afterwards 'Stop predict'. The AI model needs to
           </pre>
           <br/><pre id = "mainHome">
           get loaded before you can begin.
           </pre>
        </div>
    );
}

export default Home;