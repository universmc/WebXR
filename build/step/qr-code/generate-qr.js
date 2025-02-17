const QRCode = require('qrcode');

const data = {
    name: "OpenAI Token NFT #1",
    description: "Ce NFT contient un message secret.",
    // ... autres données
};

const dataString = JSON.stringify(data); // Convertir l'objet en chaîne JSON

QRCode.toString(dataString, { type: 'terminal' }, function (err, url) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(url); // Afficher l'URL du QR code dans la console
});