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
            This webapp is a face detector. Every new face wth euclidean distance > 0.4 is recorded, </pre>
           <br/> <pre id = "mainHome">
           with a snapshot sent to ibm cloud storage. Information about date & time, as well as a 
           </pre>
           <br/> <pre id = "mainHome">
           link to the pic in cloud storage is recorded in database. Face detector uses face-api.js  
           </pre>
           <br/><pre id = "mainHome">
           for ML algorithm, react UI for a frontend, node.js for a backend and mongoDB database.
           </pre>
           <br/><pre id = "mainHome"></pre>
            <br/><pre id = "mainHome">
           To start the face detector go to the 'Cam' tab and press 'Start predict', afterwards 'Stop
           </pre>
           <br/><pre id = "mainHome">
            predict'. The AI model needs to get loaded before you can begin. The logs with the links
           </pre>
           <br/><pre id = "mainHome">
            to the snapshots of new faces detected can be retrived from dsatabase (tab 'Data'). 
           </pre>
        </div>
    );
}

export default Home;