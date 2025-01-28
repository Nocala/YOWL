const express = require('express');
const db = require('./db');
 
const app = express();
 
// Middleware pour parser les requêtes JSON
app.use(express.json());
 
// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://10.134.200.135:${PORT}`);
});


//Je fais ma route Téo
//je fais ma route Loan
//Je fais ma route alexandre
