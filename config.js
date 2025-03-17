const video = document.getElementById('camera-feed');
const canvas = document.getElementById('canvas-output');
const ctx = canvas.getContext('2d');
let currentFilter = 'none';

// Accès à la caméra
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
        updateCanvas();
    })
    .catch(error => {
        console.error('Erreur d\'accès à la caméra :', error);
    });

// Fonction de mise à jour du canvas
function updateCanvas() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    applyFilter();
    requestAnimationFrame(updateCanvas);
}

// Fonction d'application des filtres
function applyFilter() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        if (currentFilter === 'grayscale') {
            const avg = (r + g + b) / 3;
            pixels[i] = pixels[i + 1] = pixels[i + 2] = avg;
        } else if (currentFilter === 'sepia') {
            pixels[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            pixels[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            pixels[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

// Gestion des clics sur les boutons de filtre
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
    });
});