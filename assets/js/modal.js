//Controls the opening & closing of modals, and the loading & reseting of 3D models in the '3D Modeling' section
var currentModal = {};
var mv = {};
var mv_btn = {};
const modelviewers = document.getElementsByClassName("modelviewer");
const modelviewer_captions = document.getElementsByClassName("modelviewer-caption");

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
    currentVideo = document.getElementById(video_id);
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

        if (mv.id == "modelviewer1") {
            mv.cameraOrbit = '-65deg 75deg 100%';
        } 
        else if (mv.id == "modelviewer2") {
            mv.cameraOrbit = '35deg 70deg 100%';
        }
        else {
            mv.cameraOrbit = '0deg 75deg 100%';
        }
    }
}

function selectModelViewer(mv_id) {
    stopModel();
    for (let i = 0; i < modelviewers.length; i++) {
        modelviewers[i].classList.add("hidden");
        modelviewer_captions[i].classList.add("hidden");
    }

    selected_mv = document.getElementById("modelviewer" + mv_id);
    selected_mv_caption = document.getElementById("modelviewer-caption" + mv_id);
    selected_mv.classList.remove("hidden");
    selected_mv_caption.classList.remove("hidden");
}