require('dotenv').config();
const express = require('express');
const db = require('./db');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Rendre les fichiers accessibles publiquement

//------------------------------------------
// Configuration de Multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Format de fichier non supporté'), false);
    }
  }
});

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
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token manquant' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token invalide' });

      if (decoded.role !== requiredRole) return res.status(403).json({ error: 'Accès interdit' });

      req.user = decoded;
      next();
    });
  };
};

//------------------------------------------
// Route pour créer un utilisateur (register)
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  db.query('SELECT * FROM USERS WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne.' });

    if (results.length > 0) return res.status(409).json({ error: 'Le username est déjà utilisé.' });

    db.query('SELECT * FROM USERS WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ error: 'Erreur interne.' });

      if (results.length > 0) return res.status(409).json({ error: 'L\'email est déjà utilisé.' });

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Erreur interne.' });

        db.query('INSERT INTO USERS (username, password, email) VALUES (?, ?, ?)',
          [username, hashedPassword, email], (err, results) => {
            if (err) return res.status(500).json({ error: 'Erreur interne.' });

            res.status(201).json({ message: 'Utilisateur créé avec succès.', userId: results.insertId });
        });
      });
    });
  });
});

//------------------------------------------
// Route pour se connecter (login)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM USERS WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne' });

    if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Erreur de vérification' });

      if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

      res.json({ token });
    });
  });
});

//------------------------------------------
// Route pour uploader une image ou vidéo
app.post('/upload', upload.single('file'), (req, res) => {
  const { user_id } = req.body;

  // Vérifier que user_id est présent
  if (!user_id) return res.status(400).json({ error: 'user_id requis' });

  // Vérifier si l'utilisateur existe dans la base de données
  db.query('SELECT user_id FROM USERS WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche de l\'utilisateur :', err);
      return res.status(500).json({ error: 'Erreur interne' });
    }
    if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  
    // Si l'utilisateur existe, on continue avec l'upload
    const filename = req.file.filename;
    const filetype = req.file.mimetype;
    const filepath = `/uploads/${filename}`;
  
    console.log('Données à insérer dans MEDIAS :', { user_id, filename, filetype, filepath });
  
    // Insertion des données dans la table MEDIAS
    db.query('INSERT INTO MEDIAS (user_id, filename, filetype, filepath) VALUES (?, ?, ?, ?)',
      [user_id, filename, filetype, filepath], (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'insertion dans la base de données :', err);
          return res.status(500).json({ error: 'Erreur lors de l\'upload' });
        }
  
        res.status(201).json({ message: 'Fichier uploadé avec succès', mediaId: results.insertId, filepath });
    });
  });
});

//------------------------------------------
// Route pour récupérer les médias d'un utilisateur
app.get('/media/:user_id', (req, res) => {
  const { user_id } = req.params;

  console.log('Requête pour récupérer les médias de l\'utilisateur avec user_id:', user_id);

  db.query('SELECT * FROM MEDIAS WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des médias :', err);
      return res.status(500).json({ error: 'Erreur interne' });
    }

    console.log('Résultats de la requête:', results);

    if (results.length === 0) return res.status(404).json({ error: 'Aucun média trouvé pour cet utilisateur' });

    res.status(200).json(results);
  });
});

//------------------------------------------
// Route pour récupérer un fichier média par son nom de fichier
app.get('/media/file/:filename', (req, res) => {
  const { filename } = req.params;
  const filepath = path.join(__dirname, 'uploads', filename);
  
  res.sendFile(filepath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Fichier introuvable' });
    }
  });
});