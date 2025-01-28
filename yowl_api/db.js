const mysql = require('mysql2');
 
// Configurer les détails de la base de données
const db = mysql.createConnection({
  host: '10.134.200.135', // Ou l'adresse IP du serveur de la base de données
  port : 3306, 
  user: 'root',
  password: 'yowl',
  database: 'yowl_database'
});
 
// Vérifier la connexion
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL !');
  }
});
 
module.exports = db;