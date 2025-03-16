// Vérification de la compatibilité de l'API getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Accès à la caméra
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        // Afficher le flux vidéo
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
  
        // Capturer une photo
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const captureButton = document.getElementById('captureButton');
  
        captureButton.addEventListener('click', function() {
          // Dessiner le cadre vidéo sur le canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
          // Optionnel : convertir le canvas en une image DataURL pour téléchargement ou autre usage
          const dataURL = canvas.toDataURL('image/png');
          console.log("DataURL de l'image :", dataURL); // Afficher la DataURL dans la console
  
  
          // Optionnel : Créer un lien de téléchargement
          const downloadLink = document.createElement('a');
          downloadLink.href = dataURL;
          downloadLink.download = 'photo.png'; // Nom du fichier téléchargé
          downloadLink.click();
        });
      })
      .catch(function(err) {
        console.error('Erreur d\'accès à la caméra :', err);
        // Afficher un message d'erreur à l'utilisateur
        alert('Impossible d\'accéder à la caméra. Veuillez vérifier les autorisations.');
      });
  } else {
    console.error('L\'API getUserMedia n\'est pas prise en charge par votre navigateur.');
    // Afficher un message d'erreur à l'utilisateur
    alert('Votre navigateur ne prend pas en charge cette fonctionnalité.');
  }