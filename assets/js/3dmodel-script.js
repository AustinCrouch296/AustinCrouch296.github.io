// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
  } else {
    progressBar.classList.remove('hide');
    if (event.detail.totalProgress === 0) {
      if (event.target.querySelector('.center-pre-prompt') != null) {
        event.target.querySelector('.center-pre-prompt').classList.add('hide');
      }
    }
  }
};

// Bind every model-viewer on the page, not just the first.
// Pages without one are a no-op rather than a TypeError.
document.querySelectorAll('model-viewer').forEach((viewer) => {
  viewer.addEventListener('progress', onProgress);
});
