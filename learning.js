// const constraints = {
//     'video': true,
//     'audio': true
// };
// navigator.mediaDevices.getUserMedia(constraints)
// .then(stream => {
//     console.log('Got Media stream: ');
//     console.table(stream);
// })
// .catch(error => {
//     console.log('error access media stream'. error);
// });

function openCamera(deviceId, rangeHeight, rangeWidth){
    const constraints = {
        'audio' : true,
        'video': {
            'deviceId': deviceId,
            'height': rangeHeight,
            'width': rangeWidth
            // 'height': { 'min': minHeight },
            // 'width': { 'min': minWidth }
        }
    };
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        console.log(stream);
        const videoElement = document.querySelector('video.local');
        videoElement.srcObject = stream;
        const audioElement = document.querySelector('audio.local');
        audioElement.srcObject = stream;
    });
}

// list of cameras
async function updateCamerasList(cameras) {
    console.log(cameras);
    const listElement = document.querySelector('select#cameras');
    console.log(listElement);
    listElement.innerHTML = 'list';
    console.log(listElement);
    cameras.map(camera => {
        const cameraOption = document.createElement('option');
        cameraOption.label = camera.label;
        cameraOption.value = camera.deviceId;
        return cameraOption;
    }).forEach(cameraOption => listElement.add(cameraOption));
}


// query media devices

async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type);
    // .then(devices => {
    //     console.table(devices);
    //     const cameras = devices.filter(device => device.kind === type);
    //     console.table(cameras);
    //     updateCamerasList(cameras);
    // });

}
function getCameras() {
    getConnectedDevices('videoinput').then(cameras => {
        console.table(cameras);
        updateCamerasList(cameras);
        console.log(cameras[0].deviceId);
        const rangeHeight = {
            'min': 320,
            'max':  1024
        };
        const rangeWidth = {
            'min': 240,
            'max': 768
        };
        openCamera(cameras[0].deviceId, rangeHeight, rangeWidth);
    });
}
getCameras();

// listen for change for media devices and upate the list accordingly
navigator.mediaDevices.addEventListener('devicechange', event => {
   getCameras();
});

// display media for capturing & recording
const displayMediaConstraints = {
    video: {
        cursor: 'always' | 'motion' | 'never',
        displaySurface: 'application' | 'browser' | 'moniter' | 'window'
    }
};
navigator.mediaDevices.getDisplayMedia(displayMediaConstraints);

// stream & tracks
// mediaStream
// mediaStreamTrack - mediaStream.getTracks()
// 