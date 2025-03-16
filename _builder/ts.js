import * as tf from '@tensorflow/tfjs';

// Créer un modèle
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Compiler le modèle
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Préparer des données synthétiques
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Entraîner le modèle
model.fit(xs, ys).then(() => {
  // Prédire une nouvelle valeur
  model.predict(tf.tensor2d([5], [1, 1])).print();
});