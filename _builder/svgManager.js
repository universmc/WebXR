// Module de gestion du SVG
const svgManager = {
    createRect: (x, y, width, height) => {
      // Code pour créer un rectangle SVG
    },
    // Autres fonctions pour manipuler le SVG
  };
  
  // Module de gestion des événements
  const eventManager = {
    onClick: (element, callback) => {
      // Code pour gérer les clics sur un élément
    },
    // Autres fonctions pour gérer les événements
  };
  
  // Module de communication avec le serveur (si nécessaire)
  const serverManager = {
    loadTemplate: (templateId) => {
      // Code pour charger un modèle de maquette depuis le serveur
    },
    // Autres fonctions pour communiquer avec le serveur
  };
  
  // Initialisation de l'application
  function init() {
    // Initialisation des modules
    svgManager.init();
    eventManager.init();
    serverManager.init();
  
    // Création d'un rectangle de test
    const rect = svgManager.createRect(10, 10, 100, 50);
  
    // Gestion du clic sur le rectangle
    eventManager.onClick(rect, () => {
      console.log("Rectangle cliqué !");
    });
  }
  
  // Lancement de l'application
  init();