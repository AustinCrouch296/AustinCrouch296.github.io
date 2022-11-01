//Controls the opening & closing of modals, and the loading & reseting of 3D models in the '3D Modeling' section
var currentModal = {};
var mv = {};
var mv_btn = {};

function openModal(modal_id) {
    // Get the modal element, and set style to display
    currentModal = document.getElementById("myModal" + modal_id);
    currentModal.style.display = "block";
}

function closeModal() {
    currentModal.style.display = "none";
    currentModal = {};
    stopModel();
}

function closeVideoModal(video_id) {
    currentVideo = document.getElementById(video_id + "_html5_api");
    currentVideo.pause();
    currentModal.style.display = "none";
    stopModel();
}

function loadModel(ele) {
    //Get modelviewer & model play button
    mv = ele.parentNode;
    mv_btn = ele;

    //Hide button, load model, reset position
    mv_btn.style.display = 'none';
    mv.dismissPoster();
    mv.fieldOfView = mv.getMaximumFieldOfView();
}

function stopModel() {
    //If no modal is open, do nothing
    // else hide & reset 3D Model
    const isEmpty = Object.keys(mv).length === 0;
    if (!isEmpty) {
        mv_btn.style.display = 'inline-block';
        mv.showPoster();
        mv.cameraOrbit = '0deg 75deg 100%';
    }
}