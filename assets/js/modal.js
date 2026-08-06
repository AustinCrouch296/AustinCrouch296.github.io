//Controls the opening & closing of modals, and the loading & reseting of 3D models in the '3D Modeling' section
var currentModal = {};
var mv = {};
var mv_btn = {};
const modelviewers = document.getElementsByClassName("modelviewer");
const modelviewer_captions = document.getElementsByClassName("modelviewer-caption");

//Element focus came from, so it can be restored when the modal closes
var modalOpener = null;

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';

function modalIsOpen() {
    return currentModal && currentModal.style && currentModal.style.display === "block";
}

//Keep focus inside the open modal, and let Escape close it
function modalKeydown(event) {
    if (!modalIsOpen()) {
        return;
    }

    if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
    }

    if (event.key !== "Tab") {
        return;
    }

    const focusable = Array.prototype.filter.call(
        currentModal.querySelectorAll(FOCUSABLE),
        function (el) { return el.offsetParent !== null; }
    );

    if (!focusable.length) {
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

document.addEventListener("keydown", modalKeydown);

function openModal(modal_id) {
    // Get the modal element, and set style to display
    modalOpener = document.activeElement;
    currentModal = document.getElementById("myModal" + modal_id);
    currentModal.style.display = "block";
    currentModal.removeAttribute("aria-hidden");

    // Send focus to the close button so keyboard users start inside the dialog
    const closeBtn = currentModal.querySelector(".modalCloseBtn");
    if (closeBtn) {
        closeBtn.focus();
    }
}

//Shared teardown for every close path
function hideCurrentModal() {
    if (!currentModal || !currentModal.style) {
        return;
    }

    currentModal.style.display = "none";
    currentModal.setAttribute("aria-hidden", "true");
    currentModal = {};
    stopModel();

    // Put focus back where the visitor left it
    if (modalOpener && typeof modalOpener.focus === "function") {
        modalOpener.focus();
    }
    modalOpener = null;
}

function closeModal() {
    // Pause any video inside before tearing the modal down
    const video = currentModal && currentModal.querySelector
        ? currentModal.querySelector("video")
        : null;
    if (video) {
        video.pause();
    }

    hideCurrentModal();
}

function closeVideoModal(video_id) {
    const currentVideo = document.getElementById(video_id);
    if (currentVideo) {
        currentVideo.pause();
    }

    hideCurrentModal();
}

function loadModel(ele) {
    //Get modelviewer & model play button
    mv = ele.parentNode;
    mv_btn = ele;

    //Hide button, load model, reset position
    mv_btn.style.display = 'none';
    mv.dismissPoster();
    mv.fieldOfView = mv.getMaximumFieldOfView();

    //Focus the model itself so keyboard users can orbit it straight away
    if (typeof mv.focus === 'function') {
        mv.focus();
    }
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

    const selected_mv = document.getElementById("modelviewer" + mv_id);
    const selected_mv_caption = document.getElementById("modelviewer-caption" + mv_id);
    selected_mv.classList.remove("hidden");
    selected_mv_caption.classList.remove("hidden");

    //Reflect which thumbnail is active for assistive tech
    document.querySelectorAll('[onclick^="selectModelViewer"]').forEach((btn) => {
        const isSelected = btn.getAttribute("onclick").indexOf("(" + mv_id + ")") !== -1;
        btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
}
