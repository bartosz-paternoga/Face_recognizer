import React from 'react';
import './App.css';


const Comp = (props) => (

	<div>

	    {/* <div className="App">
	      <header className="App-header" >
	      <h4 className="App-title">Face recognition with face-api.js</h4>
	      </header>     
	    </div> <br/> */}
		

		<br/>
		<div id="loading-message">
	       <p>Face-api.js model is loading. This will take a few moments ...</p>
	       {/* <p>All good things come for those who wait</p> */}
	    </div>
	    
		<div className="sk-cube-grid" id="sk-cube-grid">
		  <div className="sk-cube sk-cube1"></div>
		  <div className="sk-cube sk-cube2"></div>
		  <div className="sk-cube sk-cube3"></div>
		  <div className="sk-cube sk-cube4"></div>
		  <div className="sk-cube sk-cube5"></div>
		  <div className="sk-cube sk-cube6"></div>
		  <div className="sk-cube sk-cube7"></div>
		  <div className="sk-cube sk-cube8"></div>
		  <div className="sk-cube sk-cube9"></div>
		</div>

		{/* <button id="btn1" onClick={props.main}>Start prediction</button> */}
		{/* <button  id="btn2" onClick= {props.reset}> Stop prediction </button>  */}
		<p id = "btn1" type="submit"  onClick = {props.main} >Start prediction</p>
		<p id = "btn2" type="submit"  onClick = {props.reset} >Stop prediction</p>
		

		<pre id="predictions"></pre>

		<div id="container" >
            <video className="img" id="video"  width="640" height="480" controls autoPlay ></video>
            <canvas id="overlay" />
        </div>	

		<canvas id="canvas" />
         <img  id = "1" src="" alt="" ></img>
		 <img  id = "2" src=""  alt="" ></img>
    </div>


);

export default Comp;