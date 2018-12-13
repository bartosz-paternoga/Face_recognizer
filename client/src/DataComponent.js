import React, { Component } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

class Data extends Component {

    componentDidMount() {
      
        console.log("componentWillMount");

        const MODEL_URL = '/model';            
        const a = async () => {
          const a1 = await faceapi.loadFaceDetectionModel(MODEL_URL);
          const a2 = await faceapi.loadFaceRecognitionModel(MODEL_URL);
          const a3 = await faceapi.loadFaceLandmarkModel(MODEL_URL);
          const a4 = await faceapi.loadMtcnnModel(MODEL_URL);
    
          console.log("MODEL LOADED");
         }
      
        a();

    }


    previewFile = () =>{

        const preview = document.getElementById('uploadPreview');
        const text = document.getElementById('text').value;
        const file    = document.querySelector('input[type=file]').files[0];
        const reader  = new FileReader();
      
        reader.onload =  (e) => {
             preview.src= e.target.result;
             console.log("text",text)
            };
   
        if (file) {
          reader.readAsDataURL(file);
       }
    }




    main = () => {

        let descriptors = [];
            
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
            await descr();      
            ax();

         }
           
        l();
           
        const preview = document.getElementById('uploadPreview');
        const text = document.getElementById('text').value;

        let singleDescriptor = [];     
                        
        const descr = async () => {  
           
        const fullFaceDescription1 = await faceapi.detectSingleFace(preview).withFaceLandmarks().withFaceDescriptor()
               
        if (fullFaceDescription1 !== undefined) {
            const descriptor1 = fullFaceDescription1.descriptor
            console.log("descriptor1",descriptor1)
            singleDescriptor.push(text, descriptor1);
            console.log("singleDescriptor",singleDescriptor)     
              
            descriptors.push(singleDescriptor);

           }
        }


        const ax = () => {
            let dataa=  ""
            let str=descriptors.toString();
            console.log("str",str)
            let post_data={data:str}
              
            axios.post('/api/datapost', str
                  
                )
                  .then((result) => {
        
                        let z = result.data;
        
                        console.log("RE-post: ", z);
                        console.log("POSTED!!!");
                                        
                    });    
                }
            


           
           }
           


   
    render() {
        return (
        <div>
        <br/>
                 <input id="text" type="text" placeholder="wtf"/>
                 <input id = "input" 
                   type="file"
                   name="selectedFile"
                   onChange={this.previewFile}
                 />
                <button id = "submitBtn" type="submit" onClick={this.main}>Submit</button>
               <br/> <br/>
                <img src="" id="uploadPreview"  alt =""/>
  
               <pre id="predictions"></pre>

                
        </div>
        )
    }
}

export default Data;
