
const Loader = (modelLoad) =>{
    
            if (modelLoad !=="") {
                const elem1 = document.getElementById('loading-message');
                
                const elem2 = document.getElementById('sk-cube-grid');
                
                const elem3= document.getElementById('video');
               
                const elem4= document.getElementById('btn1');
                
                const elem5= document.getElementById('btn2');


                if (elem1 && elem2 && elem3 && elem4 && elem5 !==null) {

                    elem1.style.display = 'none';
                    elem2.style.display = 'none';
                    elem3.style.display = 'flex';
                    elem4.style.display = 'inline';
                    elem5.style.display = 'inline';
                }
        }

    } 


    export default Loader 