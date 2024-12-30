const video = document.getElementById('video');
const volumeControl = document.getElementById('volume');


volumeControl.addEventListener('input', () => {
    video.volume = volumeControl.value;
});