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
        const text = document.getElementById('text1').value;
        const file    = document.querySelector('input[type=file]').files[0];
        const reader  = new FileReader();
      
        reader.onload =  (e) => {
             preview.src= e.target.result;
             console.log("text",text);
             const pred = document.getElementById("action")
             pred.innerHTML =  ""
             const y= document.getElementById("myUl");
             y.innerHTML =  "";
             const inpt = document.getElementById('input');
             inpt.value ="";
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
            add();

         }
           
        l();
           
        const preview = document.getElementById('uploadPreview');
        const text = document.getElementById('text1').value;
        const y= document.getElementById("myUl");
        y.innerHTML =  "";
        const yy = document.getElementById('action');
        yy.innerHTML =  "";

        let singleDescriptor = [];     
                        
        const descr = async () => {  
           
        const fullFaceDescription1 = await faceapi.detectSingleFace(preview).withFaceLandmarks().withFaceDescriptor()
               
        if (fullFaceDescription1 !== undefined) {
            const descriptor1 = fullFaceDescription1.descriptor;
            singleDescriptor.push(text, descriptor1);
            console.log("singleDescriptor",singleDescriptor);  
              
            descriptors.push(singleDescriptor);

           }
        }


        const add = () => {
           
            let str=descriptors.toString();
                           
            axios.post('/api/datapost', str
                  
                )
                  .then((result) => {
        
                        let z = result.data;
        
                        console.log("RE-post: ", z);
                        console.log("POSTED!!!");
                        const pred = document.getElementById("action")
                        pred.innerHTML =  "Added"
                        const preview = document.getElementById('uploadPreview');
                        preview.src ='';
                        const y= document.getElementById("myUl");
                        y.innerHTML =  "";
                        const inpt = document.getElementById('input');
                        inpt.value ="";
                        const text = document.getElementById('text1');
                        text.value ="";
                                        
                    });    
                }
            


           
           }
           

           remove = () => {

            
            const text = document.getElementById('text1').value;
              
            axios.post('/api/dataremove', text
                  
                )
                  .then((result) => {
        
                        let zrem = result.data;
        
                        console.log("RE-removed: ", zrem);
                        console.log("removed!!!");
                        const pred = document.getElementById("action")
                        pred.innerHTML =  "Deleted"   
                        const y= document.getElementById("myUl");
                        y.innerHTML =  "";

                    });  
                    
                    document.getElementById('text1').value =''


                }


                removeAll = () => {
                                         
                    axios.post('/api/dataRemoveAll', 
                          
                        )
                          .then((result) => {
                
                                let zrem = result.data;
                
                                console.log("RE-removed: ", zrem);
                                console.log("removed!!!");
                                const pred = document.getElementById("action")
                                pred.innerHTML =  "All removed"
                                const y= document.getElementById("myUl");
                                y.innerHTML =  "";
                                                
                            });  
                            
                           
                        }



           getData0 = async () => {
            try {
                let labels = [];
                 const response = await axios.get('/api/data');           
                 // this.setState({a:response.data});
                  const a = (JSON.stringify(response.data)).replace(/[|]|:|Name|Bucket|"|},|}]/g,'');
                  const b = a.split("{");
                  b.shift(); 
                              
                  for (let i = 0; i < b.length; i++) {
                       const c = b[i].split(",");                  
                       labels.push(c[0]);

                  }
  

                console.log("labels:",labels);

                         
                const y= document.getElementById("myUl");
                y.innerHTML =  "";
                const yy = document.getElementById('action');
                yy.innerHTML =  "";
                const preview = document.getElementById('uploadPreview');
                preview.src ='';

                labels.forEach(function(item) {
                    var li = document.createElement("li");
                    var br = document.createElement("br");
                    var text = document.createTextNode(item);
                    li.appendChild(text);
                    document.getElementById("myUl").appendChild(li);
                    document.getElementById("myUl").appendChild(br);
                
                });

                
              
                } catch (error) {
                    console.error(error);
                      }
                    }
                    
         

   
    render() {
        return (
        <div>
             <p></p>
                 <input id="text1" type="text" placeholder="Enter person's name"/>
                 <input id = "input" 
                   type="file"
                   name="selectedFile"
                   onChange={this.previewFile}
                 />
                 <br/>
                <button id = "submitBtn1" type="submit" onClick={this.main}>Submit new entry</button>                
                <button id = "submitBtn1" type="submit" onClick={this.getData0}>List all entries </button>
                <button id = "submitBtn1" type="submit" onClick={this.remove}>Delete one entry </button><br/><p></p>
                <button id = "submitBtn1" type="submit" onClick={this.removeAll} >Delete all </button>
               <br/> 
               <pre id="action"></pre>
               <ol id="myUl"></ol>

                <img src="" id="uploadPreview"  alt =""/>
                                              
        </div>
        )
    }
}

export default Data;
