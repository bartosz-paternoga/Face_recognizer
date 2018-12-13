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
            This is a face recognition app. It recognizes person in a webcam or a phone  using  </pre>
           <br/> <pre id = "mainHome">
           personal face landmarks. Person's image needs to be uploaded first, so that face   
           </pre>
           <br/> <pre id = "mainHome">
           desriptotors along with a name are stored in a database. This face recognition app 
           </pre>
           <br/><pre id = "mainHome">
           uses face-api.js for ML algorithm, react UI for a frontend, node.js for a backend 
           </pre>
           <br/><pre id = "mainHome">
           and mongoDB database.
           </pre>
           <br/>
            <br/><pre id = "mainHome">
            To start face recognition go to the "Data" tab and upload person(s) pics. Then go 
           </pre>
           <br/><pre id = "mainHome">
           to 'Cam' tab and press 'Start predict', afterwards 'Stop predict'. The AI model  
           </pre>
           <br/><pre id = "mainHome">
           needs to get loaded before you can begin.
           </pre>
        </div>
    );
}

export default Home;