const QRCode = require('qrcode');

const data = {
    name: "OpenAI Token NFT #1",
    description: "Ce NFT contient un message secret.",
    // ... autres données
};

const dataString = JSON.stringify(data); // Convertir l'objet en chaîne JSON

QRCode.toFile('qr.png', dataString, {
    color: {
        dark: '#000', // Couleur des modules noirs
        light: '#FFF' // Couleur de fond
    }
}, function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('QR code enregistré dans qr.png');
});