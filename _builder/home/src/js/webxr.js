// Initialisation de WebXR
navigator.xr.isSessionSupported('immersive-ar').then((isSupported) => {
    if (isSupported) {
        // ... (Créer une session WebXR)
    }
});