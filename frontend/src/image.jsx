
// defining react component
export default () => {
    // navigator.mediaDevices
    // .getUserMedia({ video: true, audio: false })
    // .then((stream) => {
    //   video.srcObject = stream;
    //   video.play();
    // })
    // .catch((err) => {
    //   console.error(`An error occurred: ${err}`);
    // });
    () => {
        const width = 320;    // We will scale the photo width to this
        const height = 0;     // This will be computed based on the input stream
      
        const streaming = false;
      
        let video = null;
        let canvas = null;
        let photo = null;
        let startbutton = null;
    }
    return (
        <div>
            <div class="camera">
                <video id="video">Video stream not available.</video>
                <button id="startbutton">Take photo</button>
            </div>
            <canvas id="canvas"> </canvas>
            <div class="output">
                <img id="photo" alt="The screen capture will appear in this box." />
            </div>
        </div>
    )
} 

