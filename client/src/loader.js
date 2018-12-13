
const Loader = (modelLoad) =>{
    
            if (modelLoad !=="") {
                const elem1 = document.getElementById('loading-message');
                elem1.style.display = 'none';
                const elem2 = document.getElementById('sk-cube-grid');
                elem2.style.display = 'none';
                const elem3= document.getElementById('video');
                elem3.style.display = 'flex';
                const elem4= document.getElementById('btn1');
                elem4.style.display = 'inline';
                const elem5= document.getElementById('btn2');
                elem5.style.display = 'inline';
                }

    } 


    export default Loader 