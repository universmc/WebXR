const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto'); // Pour la cryptographie RSA
const QRCode = require('qrcode'); // Pour la génération de QR codes

const app = express();
app.use(bodyParser.json());

// Clés RSA (à générer et stocker de manière sécurisée)
const publicKey = '...'; // Clé publique
const privateKey = '...'; // Clé privée (NE JAMAIS DIVULGUER)

app.post('/generate-qr', (req, res) => {
    const message = req.body.message;

    // Chiffrement du message avec RSA
    const encryptedMessage = crypto.publicEncrypt(publicKey, Buffer.from(message),);

    // Génération du QR code (version texte)
    QRCode.toString(encryptedMessage.toString('base64'), { type: 'terminal' }, function (err, url) {
        console.log(url)
    })
    // Génération du QR code (image)
    QRCode.toDataURL(encryptedMessage.toString('base64'), function (err, url) {
        if (err) {
            console.log(err)
        }
        console.log(url)
        const metadata = {
            name: "NFT avec message chiffré",
            description: "Ce NFT contient un message secret chiffré avec RSA.",
            image: url, // URL de l'image du QR code
            attributes: [{ "trait_type": "Secret", "value": encryptedMessage.toString('base64') }]
        };
    
        res.json({ qrCode: url, metadata: metadata });
    })
});

app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});