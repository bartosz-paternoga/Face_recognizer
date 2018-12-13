import React, { Component } from 'react';
import Comp from './component1';
import Webcam from './webcam';
import Loader from './loader';
import './App.css';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import StopCam from './StopWebcam';


class faceDetector extends Component {

    componentDidMount() {
      
    console.log("componentDidMount");

    const MODEL_URL = '/model';

    const a = async () => {
      const a1 = await faceapi.loadFaceDetectionModel(MODEL_URL);
      const a2 = await faceapi.loadFaceRecognitionModel(MODEL_URL);
      const a3 = await faceapi.loadFaceLandmarkModel(MODEL_URL);
      const a4 = await faceapi.loadMtcnnModel(MODEL_URL);

      console.log("MODEL LOADED");
      const modelLoad = "LOADED";
      Loader(modelLoad);
        }

    const l = async () => {
      await a();
        }

    l();

    }


    main = async () => {    

        const MODEL_URL = '/model';
        await faceapi.loadFaceDetectionModel(MODEL_URL)
        await faceapi.loadFaceRecognitionModel(MODEL_URL)
        await faceapi.loadFaceLandmarkModel(MODEL_URL)
        await faceapi.loadMtcnnModel(MODEL_URL)
        console.log("MODEL LOADED");
        Webcam();
                 

        const imgEl = document.getElementById('video');
      
        let dataURL;
    
        let labels = [];
        let values = [];
     
        const getData0 = async () => {
          try {
               const response = await axios.get('/api/data');           
               // this.setState({a:response.data});
                const a = (JSON.stringify(response.data)).replace(/[|]|:|Name|Bucket|"|},|}]/g,'');
                const b = a.split("{");
                b.shift(); 
                            
                for (let i = 0; i < b.length; i++) {
                    const c = b[i].split(",");
                    console.log(`c ${i}:`,c );
                     labels.push(c[0])
                     c.shift();
                     const d = c
                     console.log(`d ${i}:`,d );
                     const x = new Float32Array(d);
                     values.push(x)
                }

                console.log("bbbb:",b);
                // console.log("x:",x);
                console.log("labesl:",labels);
                console.log("values:",values);

                       
            
              } catch (error) {
                  console.error(error);
                    }
                  }
                  
              const getD0 = await getData0()




        async function onPlay(imgEl) {

            const { width, height } = faceapi.getMediaDimensions(imgEl);

            const canvas =  document.getElementById('overlay');

            if (canvas === null) { window.location.reload()}

            canvas.width = width;
            canvas.height = height;


            const canvas2 =  document.getElementById('canvas');
            canvas2.width = width;
            canvas2.height = height;

            const video = document.getElementById('video');   
            let img = document.getElementById('1');
            img.style.visibility = "hidden";
            

            function draw( video, canvas2, image ){
              const context = canvas2.getContext('2d');
              context.drawImage( video, 0, 0, canvas2.width, canvas2.height);

              dataURL = canvas2.toDataURL('image/jpeg', 1.0);         
              
              image.src= dataURL;
              // img1.src= "";
              canvas2.style.display='none'
              }
                     
            const ts = Date.now();

            const mtcnnForwardParams = {
              // limiting the search space to larger faces for webcam detection
              minFaceSize: 100
            };

            const fullFaceDescriptions = (await faceapi.allFacesMtcnn(imgEl, mtcnnForwardParams))
            .map(fd => fd.forSize(width, height));
            console.log("fullFaceDescriptions",fullFaceDescriptions);

            fullFaceDescriptions.forEach((fd) => {
              faceapi.drawDetection(canvas, fd.detection, { withScore: true, color: 'blue' })
            });

            fullFaceDescriptions.forEach((fd) => {
             faceapi.drawLandmarks(canvas, fd.landmarks, { drawLines: false, color: 'red',lineWidth: 4 })
            });

            console.log("Detection done in: ", (Date.now() - ts));

            draw( video, canvas2, img);         
            
            let descriptor1;
            let fullFaceDescription1;    
            let euc;
                    
            if (img !== undefined){
              fullFaceDescription1 = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
              if (fullFaceDescription1 !== undefined){
                  descriptor1 = fullFaceDescription1.descriptor



              let results = [];
              const getData1 = async () => {
                try {
                                       
                      for (let i = 0; i < values.length; i++) {
                           let u =values[i]
                           const euc = faceapi.euclideanDistance(descriptor1, u)
                           console.log(`EUC DIST ${i}:`, euc, `name ${i}:`, labels[i]) 
                           results.push(euc);
                          }
                      console.log("results",results)
                      const indexOfMinValue = results.indexOf(Math.min(...results));
                  
                        
                      console.log("indexOfMinValue",indexOfMinValue)
                      console.log("name min val",labels[indexOfMinValue])
                      console.log("min value ",results[indexOfMinValue])
                       
                      let pred = document.getElementById("predictions");
                      pred.style.display = 'inline';
                      pred.innerHTML = ( `Recognized ${labels[indexOfMinValue]} w. eucl. dist ${Math.round((results[indexOfMinValue])* 100) / 100}`);
                  
                    } catch (error) {
                        console.error(error);
                          }
                        }
                        
                    const getD1 = await getData1()

                  

                }
            } else { console.log("no face")}

            

        
     }  //end onplay


        setInterval(
          () =>   onPlay(imgEl),
          4000
        );
            
      }

      reset = () => {
        StopCam();
        let pred = document.getElementById("predictions");
        pred.innerHTML = '';

      }


    render() {
        
        return (
                 <Comp
                 main = {this.main}
                 reset = {this.reset}              
                 />
      
       );
    }
};


export default faceDetector;