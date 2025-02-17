// Importation des bibliothèques nécessaires
const fs = require("fs");
const { Telegraf } = require('telegraf');
const axios = require('axios');
const tf = require('@tensorflow/tfjs');
// Importation hypothétique pour Groq SDK
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const deepSeek = process.argv[2] || 'Tensoflow'; // Obtenir le sujet via l'argument de ligne de commande

function generateMarkdown(deepSeek) {
    return `## Comment ${deepSeek} - Un guide étape par étape\n\n**Introduction**:\n\nCe guide vous aidera à comprendre et à réaliser ${deepSeek}. Il est conçu pour les débutants et les utilisateurs intermédiaires qui souhaitent apprendre les bases de ${deepSeek}.\n\n${deepSeek.description}\n\n**Prérequis**:\n\n* [Liste des prérequis nécessaires pour suivre ce guide, par exemple: une connexion internet, un compte sur une plateforme spécifique, etc.]\n\n**Étapes**:\n\n1. **[Étape 1]:**\n   * Décrivez en détail l'étape 1, incluant les instructions claires et concises.\n   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.\n   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.\n\n2. **[Étape 2]:**\n   * Décrivez en détail l'étape 2, incluant les instructions claires et concises.\n   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.\n   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.\n\n3. **[Étape 3]:**\n   * Décrivez en détail l'étape 3, incluant les instructions claires et concises.\n   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.\n   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.\n\n**Conseils:**\n\n* [Ajoutez des conseils utiles pour réaliser ${deepSeek} avec succès.]\n\n**Ressources supplémentaires:**\n\n* [Listez des liens vers des ressources supplémentaires, telles que des tutoriels, des articles de blog ou des forums, qui peuvent être utiles aux utilisateurs.]`;
}

const events = ["Tensorflow,","tensorflowPixel"];

async function main() {
    for (const deepSeek of events) {
        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "Phase 0: initialisation" },
                    { role: "user", content: `${events}` },
                    { role: "assistant", content: `Bonjour et bienvenue, nous développons le sujet de conversation dans la deepSeek ${deepSeek}` },
                    { role: "system", content: "Imaginez un machine à prompt pour créer un Model de Machine_learning avec groq-sdk. Les prompts pour la gestion du code groq-sdk seront transformés pour le projet \"groq-sdk\". Voici ## le contexte, ## Le dataset, HTML, SCSS, JS, JSX, JSON ++ ... ## les deepSeeks, ## les paramètres ## Les events, ## boucle éventuelle ## vos tâches, ## votre processus, et ## les caractéristiques, inférence recherchées: ## Actions Immédiates ## le prompt ultime pour générer le code source ## le code source attendu" },
                    { role: "user", content: deepSeek },
                    { role: "system", content: "Phase 2: Conceptualisation" },
                    { role: "assistant", content: "Définition des concepts clés..." },
                    { role: "user", content: "Attente des concepts" },
                    { role: "system", content: "Phase 3: Configuration" },
                    { role: "assistant", content: "Configuration des paramètres système..." },
                    { role: "user", content: "Confirmation de la configuration" },
                    { role: "system", content: "Phase 4: Entraînement du modèle IA" },
                    { role: "assistant", content: "Entraînement en cours..." },
                    { role: "user", content: "Suivi de l'entraînement" },
                    { role: "system", content: "Phase 5: Itération & Scripts Frontend" },
                    { role: "assistant", content: "Itération sur les scripts Frontend..." },
                    { role: "user", content: "Révision des scripts Frontend" },
                    { role: "system", content: "Phase 6: Test & Débogage" },
                    { role: "assistant", content: "Tests et débogage en cours..." },
                    { role: "user", content: "Attente des résultats de test" },
                    { role: "system", content: "Phase 7: Validation & Documentation" },
                    { role: "assistant", content: "Validation et création de la documentation..." },
                    { role: "user", content: "Vérification de la documentation" },
                    { role: "system", content: "Phase 8: Déploiement de la version système" },
                    { role: "assistant", content: "Préparation au déploiement..." },
                    { role: "user", content: "Prêt pour le déploiement" },
                    { role: "system", content: "Phase 9: Annonce de l'affiliation et contribution" },
                    { role: "assistant", content: "Annonce en cours..." },
                    { role: "user", content: "Participation à l'annonce" },
                ],
                model: "deepseek-r1-distill-llama-70b",
                temperature: 0.5,
                max_tokens: 4096,
            });

            const mdContent = completion.choices[0]?.message?.content;
            const outputFilePath = `devops_${deepSeek}_${new Date().toISOString().replace(/\[-:TZ\]/g, "")}.md`;
            fs.writeFileSync(outputFilePath, mdContent);
            console.log(`Le How-To sur ${deepSeek} a été enregistré dans ${outputFilePath}`);
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    }
}

main();