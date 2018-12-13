const StopCam = () => {
    // window.location.reload();
    function stopStreamedVideo(videoElem) {
        if (videoElem !==null){  
            let stream = videoElem.srcObject;
            let tracks = stream.getTracks();
            
            tracks.forEach(function(track) {
                track.stop();
            });
            
            videoElem.srcObject = null;
        }
    }

    const video = document.getElementById('video'); 
    stopStreamedVideo(video);

  }


export default StopCam;