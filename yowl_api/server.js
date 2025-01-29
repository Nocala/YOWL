require('dotenv').config();
const express = require('express');
const db = require('./db');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cors()); 


//------------------------------------------
// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://10.134.200.135:${PORT}`);
});


//------------------------------------------
// Route test 
app.get('/test', (req, res) => {
  res.send('Hello World!');
});


//------------------------------------------
// Fonction pour vérifier le rôle
const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    // Vérification du token dans l'en-tête Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    // Vérification du token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token invalide' });
      }

      // Vérification si le rôle dans le token correspond à celui requis
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Accès interdit, rôle insuffisant' });
      }

      // Ajoute les informations de l'utilisateur à la requête pour pouvoir y accéder dans les autres routes
      req.user = decoded;

      // Passer au prochain middleware ou à la route
      next();
    });
  };
};


//------------------------------------------
// Route pour créer un utilisateur (register)
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Validation des données
  if (!username || !password || !email) {
      res.status(400).json({ error: 'Les champs username, password et email sont requis.' });
      return;
  }

  // Vérification si le username existe déjà
  const checkUsernameQuery = 'SELECT * FROM USERS WHERE username = ?';
  db.query(checkUsernameQuery, [username], (err, results) => {
      if (err) {
          console.error('Erreur lors de la vérification du username :', err);
          res.status(500).json({ error: 'Erreur interne du serveur.' });
          return;
      }

      if (results.length > 0) {
          res.status(409).json({ error: 'Le username est déjà utilisé.' });
          return;
      }

      // Vérification si l'email existe déjà
      const checkEmailQuery = 'SELECT * FROM USERS WHERE email = ?';
      db.query(checkEmailQuery, [email], (err, results) => {
          if (err) {
              console.error('Erreur lors de la vérification de l\'email :', err);
              res.status(500).json({ error: 'Erreur interne du serveur.' });
              return;
          }

          if (results.length > 0) {
              res.status(409).json({ error: 'L\'email est déjà utilisé.' });
              return;
          }

          // Si le username et l'email sont uniques, on continue avec l'insertion
          const bcrypt = require('bcryptjs');
          const saltRounds = 10;

          bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
              if (err) {
                  console.error('Erreur lors du hachage du mot de passe :', err);
                  res.status(500).json({ error: 'Erreur interne du serveur.' });
                  return;
              }

              // Requête SQL pour insérer un utilisateur
              const query = 'INSERT INTO USERS (username, password, email) VALUES (?, ?, ?)';
              db.query(query, [username, hashedPassword, email], (err, results) => {
                  if (err) {
                      console.error('Erreur lors de la création de l\'utilisateur :', err);
                      res.status(500).json({ error: 'Erreur interne du serveur.' });
                      return;
                  }

                  res.status(201).json({
                      message: 'Utilisateur créé avec succès.',
                      userId: results.insertId, // ID de l'utilisateur créé
                  });
              });
          });
      });
  });
});


//------------------------------------------
// Route pour se connecter
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM USERS WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const user = results[0];

    // Vérifie le mot de passe
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur de vérification du mot de passe' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }

      // Ajoute le rôle de l'utilisateur dans le payload
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,  // Ajoute le rôle ici
      };

      // Génère le token
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

      // Envoie le token au client
      res.json({ token });
    });
  });
});