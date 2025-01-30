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
// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Récupère le token après "Bearer"

  if (!token) return res.status(401).json({ error: 'Token manquant' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalide' });

    console.log('decoded:', decoded); // Log decoded token
    req.user = decoded;
    next();
  });
};


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
  console.log(`Serveur lancé sur \x1b[36m%s\x1b[0m`, `http://10.134.200.135:${PORT}`);
});

//------------------------------------------
// Route test 
app.get('/test', (req, res) => {
  res.send('Hello World!');
});


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

      console.log('Creating token for user:', user); // Log user details

      const token = jwt.sign({ id: user.user_id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

      res.json({ token });
    });
  });
});


//------------------------------------------
// Route pour uploader une image ou vidéo
app.post('/upload', verifyToken, upload.single('file'), (req, res) => {
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
app.get('/media/:user_id', verifyToken, (req, res) => {
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


//------------------------------------------
// Routes posts textuels

// Route pour récupérer tous les posts textuels
app.get('/posts-txt', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Page par défaut : 1
  const limit = parseInt(req.query.limit, 10) || 10; // Limite par défaut : 10 posts par requête
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM POST_TXT';
  const queryParams = [limit, offset];

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des posts:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
    }

    // Vérifie s'il reste encore des posts à charger
    const nextPage = results.length === limit ? page + 1 : null;

    res.json({ posts: results, nextPage });
  });
});

// Route pour récupérer un post textuel par son ID
app.get('/posts-txt/:id', (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).json({ error: 'ID du post requis' });
  }

  const query = 'SELECT * FROM POST_TXT WHERE post_txt_id = ?';
  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du post:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération du post' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Post non trouvé' });
    }

    res.json(results[0]);
  });
});

// Route pour créer un post textuel
app.post('/posts-txt', verifyToken, (req, res) => {
  const { text, description } = req.body;

  if (!text || !description) {
    return res.status(400).json({ error: 'Les champs text et description sont requis' });
  }

  const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir du token JWT
  console.log('userId:', userId); // Log userId

  const getUserQuery = 'SELECT username FROM USERS WHERE user_id = ?';
  db.query(getUserQuery, [userId], (err, userResults) => {
    if (err) {
      console.error('Erreur lors de la récupération du username:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération du username' });
    }

    console.log('userResults:', userResults); // Log userResults

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const username = userResults[0].username;

    const insertPostQuery = 'INSERT INTO POST_TXT (text, description, user_id, username, likes) VALUES (?, ?, ?, ?, 0)';
    db.query(insertPostQuery, [text, description, userId, username], (err, results) => {
      if (err) {
        console.error('Erreur lors de la création du post:', err);
        return res.status(500).json({ error: 'Erreur lors de la création du post' });
      }

      res.status(201).json({
        message: 'Post créé avec succès',
        postId: results.insertId,
      });
    });
  });
});

// Route pour ajouter un like à un post textuel
app.post('/posts-txt/:id/like', verifyToken, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir du token JWT

  // Vérifier si le post existe
  db.query('SELECT * FROM POST_TXT WHERE post_txt_id = ?', [postId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification du post:', err);
      return res.status(500).json({ error: 'Erreur interne' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Post non trouvé' });
    }

    // Ajouter un like au post
    db.query('UPDATE POST_TXT SET likes = likes + 1 WHERE post_txt_id = ?', [postId], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'ajout du like:', err);
        return res.status(500).json({ error: 'Erreur interne' });
      }

      res.status(200).json({ message: 'Like ajouté avec succès' });
    });
  });
});


//------------------------------------------
// Routes articles

// Route pour récupérer tous les articles
app.get('/articles', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Page par défaut : 1
  const limit = parseInt(req.query.limit, 10) || 10; // Limite par défaut : 10 articles par requête
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM ARTICLES';
  const queryParams = [limit, offset];

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des articles:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
    }

    // Vérifie s'il reste encore des articles à charger
    const nextPage = results.length === limit ? page + 1 : null;

    res.json({ articles: results, nextPage });
  });
});

// Route pour récupérer un article par son ID
app.get('/articles/:id', (req, res) => {
  const articleId = req.params.id;

  if (!articleId) {
    return res.status(400).json({ error: 'ID de l\'article requis' });
  }

  const query = 'SELECT * FROM ARTICLES WHERE id_article = ?';
  db.query(query, [articleId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'article:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'article' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    res.json(results[0]);
  });
});

// Route pour créer un article
app.post('/articles', verifyToken, upload.single('file'), (req, res) => {
  const { titre, description, corps, sport, date } = req.body;

  if (!titre || !description || !corps || !sport || !date) {
    return res.status(400).json({ error: 'Les champs titre, description, corps, sport et date sont requis' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Un fichier est requis' });
  }

  const userId = req.user.id; // Récupération automatique via le token JWT

  // Récupérer le username de l'utilisateur
  const getUserQuery = 'SELECT username FROM USERS WHERE user_id = ?';
  db.query(getUserQuery, [userId], (err, userResults) => {
    if (err) {
      console.error('Erreur lors de la récupération du username:', err);
      return res.status(500).json({ error: 'Erreur interne' });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const username = userResults[0].username;
    const filename = req.file.filename;
    const filetype = req.file.mimetype;
    const filepath = `/uploads/${filename}`;

    console.log('Données à insérer dans MEDIAS :', { userId, filename, filetype, filepath });

    // Insérer le fichier dans la table MEDIAS
    db.query('INSERT INTO MEDIAS (user_id, filename, filetype, filepath) VALUES (?, ?, ?, ?)',
      [userId, filename, filetype, filepath], (err, mediaResult) => {
        if (err) {
          console.error('Erreur lors de l\'insertion du média:', err);
          return res.status(500).json({ error: 'Erreur lors de l\'upload du média' });
        }

        const id_media = mediaResult.insertId;

        // Insérer l'article dans ARTICLES
        db.query('INSERT INTO ARTICLES (titre, description, corps, sport, date, id_media, auteur) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [titre, description, corps, sport, date, id_media, username], (err, articleResult) => {
            if (err) {
              console.error('Erreur lors de la création de l\'article:', err);
              return res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
            }

            res.status(201).json({
              message: 'Article et média créés avec succès',
              articleId: articleResult.insertId,
              mediaId: id_media
            });
          });
      });
  });
});


//------------------------------------------
// Routes posts medias

// Route pour créer un post media
app.post('/posts-media', verifyToken, upload.single('file'), (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Le champ description est requis' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Un fichier est requis' });
  }

  const userId = req.user.id; // Récupération automatique via le token JWT
  console.log('userId:', userId);

  const getUserQuery = 'SELECT username FROM USERS WHERE user_id = ?';
  db.query(getUserQuery, [userId], (err, userResults) => {
    if (err) {
      console.error('Erreur lors de la récupération du username:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération du username' });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const username = userResults[0].username;

    const filename = req.file.filename;
    const filetype = req.file.mimetype;
    const filepath = `/uploads/${filename}`;

    console.log('Données à insérer dans MEDIAS :', { userId, filename, filetype, filepath });

    // Insérer le fichier dans la table MEDIAS
    db.query('INSERT INTO MEDIAS (user_id, filename, filetype, filepath) VALUES (?, ?, ?, ?)',
      [userId, filename, filetype, filepath], (err, mediaResult) => {
        if (err) {
          console.error('Erreur lors de l\'insertion du média:', err);
          return res.status(500).json({ error: 'Erreur lors de l\'upload' });
        }

        const id_media = mediaResult.insertId;

        // Insérer le post média dans POST_MEDIA
        db.query('INSERT INTO POST_MEDIA (id_media, description, username, user_id) VALUES (?, ?, ?, ?)',
          [id_media, description, username, userId], (err, postResult) => {
            if (err) {
              console.error('Erreur lors de la création du post média:', err);
              return res.status(500).json({ error: 'Erreur lors de la création du post' });
            }

            res.status(201).json({
              message: 'Post média créé avec succès',
              postMediaId: postResult.insertId,
            });
          });
      });
  });
});

