const video = document.getElementById('video');
const switchCameraButton = document.getElementById('switchCameraButton');
let currentStream; // Variable pour stocker le flux vidéo actuel

// Fonction pour obtenir le flux vidéo
async function getVideoStream(deviceId) {
  const constraints = {
    video: { deviceId: deviceId ? { exact: deviceId } : undefined },
    audio: false,
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
}

// Fonction pour démarrer la vidéo
async function startVideo() {
  currentStream = await getVideoStream();
  video.srcObject = currentStream;
  video.onloadedmetadata = () => {
    video.play();
  };
}

// Fonction pour basculer entre les caméras
async function switchCamera() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((device) => device.kind === 'videoinput');

  // Inverser l'ordre des caméras (pour passer de la frontale à la dorsale et vice-versa)
  const nextCameraIndex = (videoDevices.indexOf(currentStream.getVideoTracks()[0].getSettings().deviceId) + 1) % videoDevices.length;
  const nextDeviceId = videoDevices[nextCameraIndex].deviceId;

  // Obtenir le nouveau flux vidéo et l'affecter à la vidéo
  const newStream = await getVideoStream(nextDeviceId);
  video.srcObject = newStream;
  currentStream.getTracks().forEach((track) => track.stop()); // Arrêter l'ancien flux

  // Appliquer l'effet miroir si la caméra frontale est активна
  const isFrontCamera = videoDevices[nextCameraIndex].label.toLowerCase().includes('front');
  video.style.transform = isFrontCamera ? 'scaleX(-1)' : 'scaleX(1)';
}

// Écouteur d'événements pour le bouton "switch caméra"
switchCameraButton.addEventListener('click', switchCamera);

// Démarrer la vidéo au chargement de la page
startVideo();