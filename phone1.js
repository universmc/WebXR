const video = document.getElementById('video');
const switchCameraButton = document.getElementById('switchCameraButton');
let currentStream; // Variable pour stocker le flux vidéo actuel
let currentCameraId; // Variable pour stocker l'ID de la caméra actuelle

// Fonction pour obtenir le flux vidéo
async function getVideoStream(deviceId) {
  const constraints = {
    video: deviceId ? { exact: deviceId } : true, // Simplifié
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
  try {
    currentStream = await getVideoStream();
    video.srcObject = currentStream;
    video.onloadedmetadata = () => {
      video.play();
    };
    // Mettre à jour l'ID de la caméra actuelle
    currentCameraId = currentStream.getVideoTracks()[0].getSettings().deviceId;
  } catch (error) {
    console.error('Error starting video:', error);
  }
}

// Fonction pour identifier la caméra frontale
function getFrontCameraId(videoDevices) {
  for (const device of videoDevices) {
    if (device.label.toLowerCase().includes('front')) {
      return device.deviceId;
    }
  }
  return null; // Aucune caméra frontale trouvée
}

// Fonction pour basculer entre les caméras
async function switchCamera() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === 'videoinput');
    const frontCameraId = getFrontCameraId(videoDevices);

    if (frontCameraId) {
      if (currentCameraId === frontCameraId) {
        // Basculer vers la caméra arrière (ou une autre caméra disponible)
        const nextCameraIndex = (videoDevices.findIndex(device => device.deviceId === currentCameraId) + 1) % videoDevices.length;
        const nextDeviceId = videoDevices[nextCameraIndex].deviceId;
        const newStream = await getVideoStream(nextDeviceId);
        video.srcObject = newStream;
        currentStream.getTracks().forEach((track) => track.stop());
        currentStream = newStream;
        currentCameraId = nextDeviceId;
        video.style.transform = 'scaleX(1)'; // Désactiver l'effet miroir pour la caméra arrière
      } else {
        // Basculer vers la caméra frontale
        const newStream = await getVideoStream(frontCameraId);
        video.srcObject = newStream;
        currentStream.getTracks().forEach((track) => track.stop());
        currentStream = newStream;
        currentCameraId = frontCameraId;
        video.style.transform = 'scaleX(-1)'; // Activer l'effet miroir pour la caméra frontale
      }
    } else {
      console.error('No front camera found.');
    }
  } catch (error) {
    console.error('Error switching camera:', error);
  }
}

// Écouteur d'événements pour le bouton "switch caméra"
switchCameraButton.addEventListener('click', switchCamera);

// Démarrer la vidéo au chargement de la page
startVideo();